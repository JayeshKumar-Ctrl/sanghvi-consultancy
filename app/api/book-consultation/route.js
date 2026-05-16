import connectDB from "@/lib/mongodb";

import Consultation from
  "@/models/Consultation";

import jwt from "jsonwebtoken";

export async function POST(req) {

  try {

    await connectDB();

    const body =
      await req.json();

    const {
      fullName,
      email,
      phone,
      service,
      message,
    } = body;

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

    // CREATE CONSULTATION

    const consultation =
      await Consultation.create({

        userId:
          decoded.id,

        fullName,
        email,
        phone,
        service,
        message,

      });

    return Response.json(
      {
        success: true,

        message:
          "Consultation booked successfully",

        consultation,
      },
      {
        status: 201,
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