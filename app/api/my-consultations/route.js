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

    // VERIFY TOKEN

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    // FETCH USER CONSULTATIONS

    const consultations =
      await Consultation.find({

        userId:
          decoded.id,

      }).sort({
        createdAt: -1,
      });

    return Response.json(
      {
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