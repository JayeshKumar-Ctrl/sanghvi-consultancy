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

    // BODY

    const body =
      await req.json();

    const {
      consultationId,
      status,
    } = body;

    if (
      !consultationId ||
      !status
    ) {

      return Response.json(
        {
          success: false,
          message:
            "Missing required fields.",
        },
        {
          status: 400,
        }
      );

    }

    if (
      status !== "Approved" &&
      status !== "Rejected"
    ) {

      return Response.json(
        {
          success: false,
          message:
            "Invalid status.",
        },
        {
          status: 400,
        }
      );

    }

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

    if (!updatedConsultation) {

      return Response.json(
        {
          success: false,
          message:
            "Consultation not found.",
        },
        {
          status: 404,
        }
      );

    }

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
        success: false,
        message:
          "Internal server error.",
      },
      {
        status: 500,
      }
    );

  }

}
