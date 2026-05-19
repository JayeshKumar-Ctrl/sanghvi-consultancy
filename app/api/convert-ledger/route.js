import connectDB from "@/lib/mongodb";

import Conversion from "@/models/Conversion";

import Document from "@/models/Document";

import User from "@/models/User";

import jwt from "jsonwebtoken";

import {
  GoogleGenerativeAI,
} from "@google/generative-ai";

import * as XLSX from "xlsx";

import fs from "fs";

import path from "path";

import cloudinary from "@/lib/cloudinary";

import { generateExcel }
from "@/lib/generateExcel";

const genAI =
  new GoogleGenerativeAI(

    process.env.GEMINI_API_KEY
  );

export async function POST(req) {

  try {

    await connectDB();

    // AUTH

    const authHeader =
      req.headers.get(
        "authorization"
      );

    if (!authHeader) {

      return Response.json(
        {
          message:
            "Unauthorized",
        },
        {
          status: 401,
        }
      );

    }

    const token =
      authHeader.split(" ")[1];

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    // GET USER

    const user =
      await User.findById(
        decoded.id
      );

    // BODY

    const body =
      await req.json();

    const {
      fileUrl,
      language,
      fileName,
      mimeType,
    } = body;

    console.log("ORIGINAL FILE:", {
      fileUrl,
      fileName,
    });

    // SAVE ORIGINAL FILE ALSO

    await Document.create({

      userId:
        decoded.id,

      uploadedBy:
        user?.fullName ||
        "Unknown User",

      userEmail:
        user?.email ||
        "N/A",

      fileName:
        fileName,

      fileUrl:
        fileUrl,

      category:
        "Ledger Upload",

      status:
        "Uploaded",

    });

    // GEMINI MODEL
    
    console.log(
      "KEY:",
      process.env.GEMINI_API_KEY
    );

    const model =
      genAI.getGenerativeModel({

        model:
          "gemini-2.5-flash",

      });

    // PROMPT

    const prompt = `

You are an expert OCR AI for Indian handwritten accounting ledgers (Rozmel / Bahi-Khata).

Analyze this handwritten ledger image carefully.

IMPORTANT:

- LEFT side = CREDIT / JAMA
- RIGHT side = DEBIT / UDHAAR

Extract all visible ledger entries.

For each entry extract:

1. Hindi account name
2. English translation/transliteration
3. Main final amount
4. Small sub-calculations below the entry
5. Additional notes if visible

RULES:

- Preserve original Hindi text.
- Amount must contain only the final transaction amount.
- Do NOT mix calculations into names.
- Breakdown numbers should go into "breakdown".
- If translation is difficult, use transliteration.
- Ignore page decorations and borders.
- Extract maximum possible readable data.
- Do not leave arrays empty if entries are visible.

Return ONLY valid JSON.

FORMAT:

{
  "creditSide": [
    {
      "nameHindi": "",
      "nameEnglish": "",
      "amount": "",
      "breakdown": "",
      "notes": ""
    }
  ],

  "debitSide": [
    {
      "nameHindi": "",
      "nameEnglish": "",
      "amount": "",
      "breakdown": "",
      "notes": ""
    }
  ],

  "totalCredit": "",
  "totalDebit": ""
}

`;

    // GEMINI RESPONSE

    const imageResponse =
      await fetch(fileUrl);

    const arrayBuffer =
      await imageResponse.arrayBuffer();

    const base64Image =
      Buffer.from(arrayBuffer)
        .toString("base64");

    let result;

    let retries = 2;

    while (retries > 0) {

      try {

        result =
          await model.generateContent([

            prompt,

            {
              inlineData: {

                mimeType:
                  mimeType || "image/jpeg",

                data:
                  base64Image,

              },
            },

          ]);

        break;

      } catch (error) {

        console.log(
          "Gemini retrying..."
        );

        retries--;

        if (retries === 0) {

          throw error;

        }

        await new Promise(
          (resolve) =>
            setTimeout(
              resolve,
              20000
            )
        );

      }

    }

    const response =
      await result.response;

    const text =
      response.text();

    console.log(
      "GEMINI RAW RESPONSE:",
      text
    );

    // CLEAN JSON

    const cleaned =
      text
        .replace(
          /```json/g,
          ""
        )
        .replace(
          /```/g,
          ""
        )
        .trim();

    const firstBrace =
      cleaned.indexOf("{");

    const lastBrace =
      cleaned.lastIndexOf("}");

    const safeJson =
      cleaned.substring(
        firstBrace,
        lastBrace + 1
      );

    let ledgerData = {};

    const convertHindiNumbers = (text) => {

      if (!text) return "";

      const hindiNums = {
        "०": "0",
        "१": "1",
        "२": "2",
        "३": "3",
        "४": "4",
        "५": "5",
        "६": "6",
        "७": "7",
        "८": "8",
        "९": "9",
      };

      return String(text)
        .split("")
        .map(char =>
          hindiNums[char] || char
        )
        .join("");

    };

    try {

      ledgerData =
        JSON.parse(safeJson);

    } catch (jsonError) {

      console.log(
        "JSON PARSE ERROR:",
        jsonError
      );

      return Response.json(
        {
          message:
            "AI returned invalid JSON",
        },
        {
          status: 500,
        }
      );

    }

    // CLEAN CREDIT SIDE

    ledgerData.creditSide =
      (ledgerData.creditSide || [])
        .map((item) => ({

          ...item,

          amount:
            convertHindiNumbers(
              item.amount
            )
            .replace(/[^\d.]/g, ""),

        }));

    // CLEAN DEBIT SIDE

    ledgerData.debitSide =
      (ledgerData.debitSide || [])
        .map((item) => ({

          ...item,

          amount:
            convertHindiNumbers(
              item.amount
            )
            .replace(/[^\d.]/g, ""),

        }));
    const calculateTotal = (arr) => {

      return arr.reduce((sum, item) => {

        const value =
          parseFloat(
            String(item.amount)
              .replace(/,/g, "")
          ) || 0;

        return sum + value;

      }, 0);

    };

    ledgerData.totalCredit =
      calculateTotal(
        ledgerData.creditSide || []
      );

    ledgerData.totalDebit =
      calculateTotal(
        ledgerData.debitSide || []
      );

    // CREATE EXCEL


    // TEMP DIRECTORY

    const tempDir =
      path.join(
        process.cwd(),
        "temp"
      );

    // CREATE TEMP FOLDER

    if (
      !fs.existsSync(tempDir)
    ) {

      fs.mkdirSync(
        tempDir,
        { recursive: true }
      );

    }

    // FILE NAME

    const excelFileName =
      `ledger-${Date.now()}.xlsx`;

    const excelPath =
      path.join(
        tempDir,
        excelFileName
      );

    try {

      // WRITE FILE

      const excelBuffer =
        await generateExcel(
          ledgerData
        );

      fs.writeFileSync(
        excelPath,
        excelBuffer
      );

    } catch (excelError) {

      console.log(
        "Excel write error:",
        excelError
      );

      return Response.json(
        {
          message:
            "Excel file creation failed",
        },
        {
          status: 500,
        }
      );

    }

    // UPLOAD TO CLOUDINARY

    const excelUpload =
      await cloudinary.uploader
      .upload(excelPath, {

        resource_type:
          "raw",

        folder:
          "excel-files",

      });

    // DELETE LOCAL FILE

    fs.unlinkSync(excelPath);

    // UPDATE DATABASE

    const conversion =
      await Conversion.findOneAndUpdate(

        {
          originalFileUrl:
            fileUrl,
        },

        {

          status:
            "Completed",

          convertedExcelUrl:
            excelUpload.secure_url,

        },

        {
          returnDocument:
            "after",
        }

      );

    // SAVE TO DOCUMENT COLLECTION

    await Document.create({

      userId:
        decoded.id,

      uploadedBy:
        user?.fullName ||
        "Unknown User",

      userEmail:
        user?.email ||
        "N/A",

      fileName:
        excelFileName,

      fileUrl:
        excelUpload.secure_url,

      category:
        "Ledger Conversion",

      status:
        "Uploaded",

    });

    return Response.json({

      success: true,

      conversion,

    });

  } catch (error) {

    console.log(
      "CONVERSION ERROR:",
      error
    );

    return Response.json(
      {
        message:
          "Conversion failed",
      },
      {
        status: 500,
      }
    );

  }

}