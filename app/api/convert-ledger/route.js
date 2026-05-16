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

    const model =
      genAI.getGenerativeModel({

        model:
          "gemini-2.5-flash",

      });

    // PROMPT

    const prompt = `
You are an expert Gujarati accounting AI.

Carefully read this ledger image.

This is a Gujarati business accounting book.

Your task:

- Extract ALL rows accurately
- Preserve numbers EXACTLY
- Do NOT hallucinate
- Keep debit/credit values accurate
- Read handwritten Gujarati carefully
- Translate Gujarati text into English
- Keep dates and balances correct
- Return structured JSON only

VERY IMPORTANT:

- Double-check all numbers before returning
- If unsure, keep original value
- Do not skip rows
- Do not merge rows
- Maintain exact table structure

Required JSON format:

[
  {
    "date": "",
    "particulars": "",
    "voucher": "",
    "debit": "",
    "credit": "",
    "balance": ""
  }
]

Return ONLY JSON.
No markdown.
No explanation.
`;

    // GEMINI RESPONSE

    let result;

    let retries = 2;

    while (retries > 0) {

      try {

        result =
          await model.generateContent([

            prompt,

            {
              fileData: {

                fileUri:
                  fileUrl,

                mimeType:
                  mimeType || "image/jpeg",

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
              5000
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

    let rows = [];

    try {

      rows =
        JSON.parse(cleaned);

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

    // CREATE EXCEL

    const worksheet =
      XLSX.utils.json_to_sheet(
        Array.isArray(rows)
          ? rows
          : []
      );

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Ledger"
    );

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
        XLSX.write(
          workbook,
          {
            type: "buffer",
            bookType: "xlsx",
          }
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