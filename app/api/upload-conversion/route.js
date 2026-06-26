import connectDB from
"@/lib/mongodb";

import Conversion from
"@/models/Conversion";

import Document from
"@/models/Document";

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

    const language =
      formData.get("language");

    const token =
      formData.get("token");
    
    if (!token) {

      return Response.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        {
          status: 401,
        }
      );

    }

    if (!file) {

      return Response.json(
        {
          message:
            "No file uploaded",
        },
        {
          status: 400,
        }
      );
    }

    const allowedTypes = [

        "application/pdf",

        "image/jpeg",

        "image/png",

        "image/jpg",

      ];

      if (
        !allowedTypes.includes(file.type)
      ) {

        return Response.json(
          {
            success: false,
            message:
              "Only PDF, JPG, JPEG and PNG files are allowed.",
          },
          {
            status: 400,
          }
        );

      }

    // VERIFY USER

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    if (
      !["Gujarati", "Hindi", "Marwadi"].includes(language)
    ) {

      return Response.json(
        {
          success: false,
          message: "Invalid language.",
        },
        {
          status: 400,
        }
      );

    }

    // FILE BUFFER

    const bytes =
      await file.arrayBuffer();

    const buffer =
      Buffer.from(bytes);

    const base64File =
      `data:${file.type};base64,${buffer.toString("base64")}`;

    // CHECK PDF

    const isPdf =
      file.type ===
      "application/pdf";

    // CLOUDINARY

    const uploadResponse =
      await cloudinary.uploader.upload(
        base64File,
        {

          resource_type:
            isPdf
              ? "raw"
              : "image",

          folder:
            "scs-conversions",

          use_filename:
            true,

          unique_filename:
            true,

        }
      );

    // SAVE IN CONVERSIONS

    const conversion =
      await Conversion.create({

        userId:
          decoded.id,

        fileName:
          file.name,

        originalFileUrl:
          uploadResponse.secure_url,

        language,

        status:
          "Processing",

      });


    // ALSO SAVE ORIGINAL FILE
    // IN DOCUMENTS

    await Document.create({

      userId:
        decoded.id,

      fileName:
        file.name,

      fileUrl:
        uploadResponse.secure_url,

      category:
        "Ledger Upload",

      status:
        "Uploaded",

    });

    return Response.json(
      {
        success: true,

        message:
          "File uploaded successfully.",

        conversion,
      },
      {
        status: 201,
      }

    );

  } catch (error) {

    console.log(error);

    return Response.json(
      {
        success: false,
        message:
          "Conversion upload failed",
      },
      {
        status: 500,
      }
    );

  }

}