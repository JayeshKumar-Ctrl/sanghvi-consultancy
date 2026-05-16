import connectDB from "@/lib/mongodb";

import Document from "@/models/Document";

import Conversion from "@/models/Conversion";

import jwt from "jsonwebtoken";

export async function GET(req) {

  try {

    await connectDB();

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

    // NORMAL DOCUMENTS

    const documents =
      await Document.find({
        userId:
          decoded.userId,
      }).sort({
        createdAt: -1,
      });

    // CONVERSION FILES

    const conversions =
      await Conversion.find({
        userId:
          decoded.userId,
      }).sort({
        createdAt: -1,
      });

    return Response.json({

      success: true,

      documents,

      conversions,

    });

  } catch (error) {

    console.log(error);

    return Response.json(
      {
        message:
          "Failed to fetch files",
      },
      {
        status: 500,
      }
    );

  }

}