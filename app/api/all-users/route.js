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

    jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const users =
      await User.find()
      .sort({
        createdAt: -1,
      });

    return Response.json({

      success: true,

      users,

    });

  } catch (error) {

    console.log(error);

    return Response.json(
      {
        success: false,
        message:
          "Server error",
      },
      {
        status: 500,
      }
    );

  }

}