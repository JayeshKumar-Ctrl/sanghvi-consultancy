import connectDB from "@/lib/mongodb";

import Consultation from
  "@/models/Consultation";

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

    // VERIFY TOKEN

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    // FETCH USER CONSULTATIONS

    const consultations =
      await Consultation.find({
        userId: decoded.id,
      })
        .select(
          "fullName email phone service message status createdAt"
        )
        .sort({
          createdAt: -1,
        });

    return Response.json(
      {
        success: true,
        consultations,
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
        message: "Internal server error.",

      },
      {
        status: 500,
      }
    );

  }

}