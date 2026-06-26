import connectDB from "@/lib/mongodb";

import Consultation from
  "@/models/Consultation";

import jwt from "jsonwebtoken";

export async function POST(req) {

  try {

    await connectDB();

    const body =
      await req.json();

    const fullName =
      body.fullName?.trim();

    const email =
      body.email?.trim().toLowerCase();

    const phone =
      body.phone?.trim();

    const service =
      body.service?.trim();

    const message =
      body.message?.trim();

    if (
      !fullName ||
      !email ||
      !phone ||
      !service ||
      !message
    ) {

      return Response.json(
        {
          success: false,
          message:
            "Please fill all required fields.",
        },
        {
          status: 400,
        }
      );

    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {

      return Response.json(
        {
          success: false,
          message:
            "Invalid email address.",
        },
        {
          status: 400,
        }
      );

    }

    if (!/^[0-9]{10}$/.test(phone)) {

      return Response.json(
        {
          success: false,
          message:
            "Enter a valid 10-digit phone number.",
        },
        {
          status: 400,
        }
      );

    }

    // GET TOKEN

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
          "Consultation booked successfully.",

        consultation: {

          _id:
            consultation._id,

          fullName:
            consultation.fullName,

          service:
            consultation.service,

          status:
            consultation.status,

        },

      },
      {
        status: 201,
      }
    );

  } catch (error) {

    console.log(error);

    return Response.json(
      {
        success: false,
        message:
          "Something went wrong",
      },
      {
        status: 500,
      }
    );

  }

}