import connectDB from
"@/lib/mongodb";

import Document from
"@/models/Document";

import User from
"@/models/User";

import jwt from
"jsonwebtoken";

import cloudinary from
"@/lib/cloudinary";

export async function POST(req) {

  try {

    await connectDB();

    const formData =
      await req.formData();

    const file =
      formData.get("file");

    const category =
      formData.get("category");

    const token =
      formData.get("token");

    if (!file) {

      return Response.json(
        {
          success: false,
          message:
            "No file uploaded",
        },
        {
          status: 400,
        }
      );

    }

    // VERIFY TOKEN

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    // IMPORTANT FIX

    const user =
      await User.findById(
        decoded.id || decoded.userId
      );

    if (!user) {

      return Response.json(
        {
          success: false,
          message:
            "User not found",
        },
        {
          status: 404,
        }
      );

    }

    // FILE BUFFER

    const bytes =
      await file.arrayBuffer();

    const buffer =
      Buffer.from(bytes);

    // BASE64

    const base64File =
      `data:${file.type};base64,${buffer.toString("base64")}`;

    // CHECK IMAGE

    const isImage =
      file.type.startsWith(
        "image/"
      );

    // CLOUDINARY UPLOAD

    const uploadResponse =
      await cloudinary.uploader.upload(
        base64File,
        {

          resource_type:
            isImage
              ? "image"
              : "raw",

          folder:
            "scs-documents",

          use_filename:
            true,

          unique_filename:
            true,

        }
      );

    // SAVE DATABASE

    const document =
      await Document.create({

        userId:
          user._id.toString(),

        uploadedBy:
          user.fullName,

        userEmail:
          user.email,

        fileName:
          file.name,

        fileUrl:
          uploadResponse.secure_url,

        category:
          category || "Document",

        status:
          "Uploaded",

      });

    return Response.json({

      success: true,

      document,

    });

  } catch (error) {

    console.log(
      "UPLOAD ERROR:",
      error
    );

    return Response.json(
      {
        success: false,
        message:
          "Upload failed",
      },
      {
        status: 500,
      }
    );

  }

}