import jwt from "jsonwebtoken";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(req) {

  try {

    await connectDB();

    const authHeader =
      req.headers.get("authorization");

    if (!authHeader) {

      return Response.json(
        {
          success: false,
          message: "Authorization token is required.",

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
          message: "Invalid authorization header.",
        },
        {
          status: 401,
        }
      );

    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user =
      await User.findById(decoded.id)
      .select( "fullName email company phone planType isPremium isPaid");

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

    return Response.json(
      {
        success: true,
        user,
      }
    );

  } catch (error) {

    console.log(error);

    return Response.json(
      {
        success: false,
        message: "Invalid or expired token.",
      },
      {
        status: 401,
      }
    );

  }

}