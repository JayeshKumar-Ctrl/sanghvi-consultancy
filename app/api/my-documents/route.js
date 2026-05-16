import connectDB from "@/lib/mongodb";

import Document from "@/models/Document";

import jwt from "jsonwebtoken";

export async function GET(req) {

  try {

    await connectDB();

    // TOKEN

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

    // FETCH DOCUMENTS

    const documents =
      await Document.find({

        userId:
          decoded.id,

      }).sort({
        createdAt: -1,
      });

    return Response.json({

      success: true,

      documents,

    });

  } catch (error) {

    console.log(error);

    return Response.json(
      {
        message:
          "Something went wrong",
      },
      {
        status: 500,
      }
    );

  }

}