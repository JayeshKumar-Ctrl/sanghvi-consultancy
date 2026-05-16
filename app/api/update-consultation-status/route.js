import connectDB from "@/lib/mongodb";

import Consultation from
  "@/models/Consultation";

import jwt from "jsonwebtoken";

export async function PUT(req) {

  try {

    await connectDB();

    // TOKEN CHECK

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

    jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // BODY

    const body =
      await req.json();

    const {
      consultationId,
      status,
    } = body;

    // UPDATE STATUS

    const updatedConsultation =
      await Consultation.findByIdAndUpdate(

        consultationId,

        {
          status,
        },

        {
          new: true,
        }

      );

    return Response.json(
      {
        success: true,

        consultation:
          updatedConsultation,
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