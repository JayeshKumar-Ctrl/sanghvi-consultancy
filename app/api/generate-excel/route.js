import * as XLSX from "xlsx";

import fs from "fs";

import path from "path";

import cloudinary from "@/lib/cloudinary";

import connectDB from "@/lib/mongodb";

import Document from "@/models/Document";

import User from "@/models/User";

import jwt from "jsonwebtoken";

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

    const user =
      await User.findById(
        decoded.id
      );

    // BODY

    const body =
      await req.json();

    const rows =
      body.rows;

    if (!rows) {

      return Response.json(
        {
          message:
            "No rows found",
        },
        {
          status: 400,
        }
      );

    }

    // CREATE WORKBOOK

    const worksheet =
      XLSX.utils.json_to_sheet(
        rows
      );

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Ledger"
    );

    // FILE PATH

    const fileName =
      `ledger-${Date.now()}.xlsx`;

    const filePath =
      path.join(
        process.cwd(),
        fileName
      );

    // WRITE FILE

    XLSX.writeFile(
      workbook,
      filePath
    );

    // CLOUDINARY

    const uploadResult =
      await cloudinary.uploader.upload(
        filePath,
        {

          resource_type:
            "raw",

          folder:
            "excel-files",

        }
      );

    // DELETE LOCAL FILE

    fs.unlinkSync(filePath);

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
        fileName,

      fileUrl:
        uploadResult.secure_url,

      category:
        "Converted Excel",

      status:
        "Uploaded",

    });

    return Response.json({

      success: true,

      excelUrl:
        uploadResult.secure_url,

    });

  } catch (error) {

    console.log(error);

    return Response.json(
      {
        message:
          "Excel generation failed",
      },
      {
        status: 500,
      }
    );

  }

}