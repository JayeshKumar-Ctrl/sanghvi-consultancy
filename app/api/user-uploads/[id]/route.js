import connectDB from "@/lib/mongodb";

import Document from "@/models/Document";

import jwt from "jsonwebtoken";

export async function GET(
  req,
  { params }
) {

  try {

    await connectDB();

    // AUTH HEADER

    const authHeader =
      req.headers.get(
        "authorization"
      );

    if (!authHeader) {

      return Response.json(
        {
          success: false,
          message:
            "Unauthorized.",
        },
        {
          status: 401,
        }
      );

    }

    // TOKEN

    const token =
      authHeader.startsWith("Bearer ")

        ? authHeader.split(" ")[1]

        : null;

    if (!token) {

      return Response.json(
        {
          success: false,
          message:
            "Invalid token.",
        },
        {
          status: 401,
        }
      );

    }

    // VERIFY JWT

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    // ADMIN CHECK

    if (

      decoded.email !==
      process.env.NEXT_PUBLIC_ADMIN_EMAIL

    ) {

      return Response.json(
        {
          success: false,
          message:
            "Access denied.",
        },
        {
          status: 403,
        }
      );

    }

    // VALIDATE ID

    if (!params?.id) {

      return Response.json(
        {
          success: false,
          message:
            "User ID is required.",
        },
        {
          status: 400,
        }
      );

    }

    // FETCH UPLOADS

    const uploads =
      await Document.find(

        {
          userId:
            params.id,
        },

        {

          fileName: 1,

          fileUrl: 1,

          category: 1,

          status: 1,

          createdAt: 1,

          uploadedBy: 1,

          userEmail: 1,

        }

      ).sort({

        createdAt: -1,

      });

    return Response.json(
      {

        success: true,

        uploads,

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
          "Internal server error.",
      },
      {
        status: 500,
      }
    );

  }

}