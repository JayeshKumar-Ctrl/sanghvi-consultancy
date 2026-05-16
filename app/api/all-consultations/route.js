import connectDB from "@/lib/mongodb";

import Consultation from
  "@/models/Consultation";

import jwt from "jsonwebtoken";

export async function GET(req) {

  try {

    await connectDB();

    // GET TOKEN

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

    // FETCH CONSULTATIONS

    const consultations =
      await Consultation.find()
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
        message:
          "Something went wrong",
      },
      {
        status: 500,
      }
    );

  }

}