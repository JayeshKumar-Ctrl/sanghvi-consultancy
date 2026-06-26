import connectDB from "@/lib/mongodb";

import Consultation from
  "@/models/Consultation";

import User from "@/models/User";

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
          success: false,
          message:"Unauthorized",

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

    const adminUser =
      await User.findById(decoded.id);

    if (
      !adminUser ||
      adminUser.email !==
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

    // FETCH CONSULTATIONS

    const consultations =
      await Consultation.find()
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
        message:
          "Internal server error.",
      },
      {
        status: 500,
      }
    );

  }

}