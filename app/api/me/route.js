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
          message: "No token",
        },
        {
          status: 401,
        }
      );

    }

    const token =
      authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user =
      await User.findById(decoded.id)
      .select("-password");

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
        message: "Invalid token",
      },
      {
        status: 401,
      }
    );

  }

}