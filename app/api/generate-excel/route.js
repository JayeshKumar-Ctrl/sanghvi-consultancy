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
          success: false,
          message:
            "Unauthorized",
        },
        {
          status: 401,
        }
      );

    }

    const token =
      authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : null;

    if (!token) {

      return Response.json(
        {
          success: false,
          message: "Invalid token.",
        },
        {
          status: 401,
        }
      );

    }

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    const user =
      await User.findById(
        decoded.id
      );

    if (!user) {

      return Response.json(
        {
          success: false,
          message: "User not found.",
        },
        {
          status: 404,
        }
      );

    }

    // BODY

    const body =
      await req.json();

    const rows =
      body.rows;

    if (
      !Array.isArray(rows) ||
      rows.length === 0
    ) {

      return Response.json(
        {
          success: false,
          message: "No rows found.",
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
        "/tmp",
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

    if (!uploadResult?.secure_url) {

      return Response.json(
        {
          success: false,
          message: "Cloud upload failed.",
        },
        {
          status: 500,
        }
      );

    }

    // DELETE LOCAL FILE

    try {

      fs.unlinkSync(filePath);

    } catch (err) {

      console.log(
        "Cleanup failed:",
        err
      );

    }

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

    return Response.json(
      {
        success: true,

        excelUrl:
          uploadResult.secure_url,
      },
      {
        status: 200,
      }
    );

  } catch (error) {

    console.log(error);

    return Response.json(
      {
        success: false,
        message:
          "Excel generation failed",
      },
      {
        status: 500,
      }
    );

  }

}