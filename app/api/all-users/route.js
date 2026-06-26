import connectDB from "@/lib/mongodb";

import User from "@/models/User";

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
      authHeader.split(" ")[1];

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    if (
      decoded.email !==
      process.env.NEXT_PUBLIC_ADMIN_EMAIL
    ) {

      return Response.json(
        {
          success: false,
          message: "Access denied.",
        },
        {
          status: 403,
        }
      );

    }

    const users =
      await User.find()
        .select("-password")
        .sort({
          createdAt: -1,
        });

    return Response.json(
      {
        success: true,
        users,
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
          "Internal Server Error",
      },
      {
        status: 500,
      }
    );

  }

}