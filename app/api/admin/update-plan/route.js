import connectDB from "@/lib/mongodb";

import User from "@/models/User";

import jwt from "jsonwebtoken";

export async function POST(req) {

  try {

    await connectDB();

    const authHeader =
      req.headers.get("authorization");

    if (!authHeader) {

      return Response.json(
        {
          success: false,
          message: "Unauthorized.",
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

    const body =
      await req.json();

    const {
      userId,
      plan,
    } = body;

    if (
      plan !== "Free" &&
      plan !== "Premium"
    ) {

      return Response.json(
        {
          success: false,
          message: "Invalid plan.",
        },
        {
          status: 400,
        }
      );

    }

    if (!userId || !plan) {

      return Response.json(
        {
          success: false,
          message:
            "Missing data",
        },
        {
          status: 400,
        }
      );

    }

    // PREMIUM CHECK

    const isPremium =
      plan === "Premium";

    // UPDATE DATABASE

    const updatedUser =
      await User.findByIdAndUpdate(

        userId,

        {

          planType:
            plan,

          isPremium:
            isPremium,

          isPaid:
            isPremium,

        },

        {

          new: true,

        }

      );

    if (!updatedUser) {

      return Response.json(
        {
          success: false,
          message:
            "User not found",
        },
        {
          status: 404,
        }
      );

    }

    return Response.json({

      success: true,

      message:
        "Plan updated successfully.",

      user: {

        _id:
          updatedUser._id,

        fullName:
          updatedUser.fullName,

        email:
          updatedUser.email,

        planType:
          updatedUser.planType,

        isPremium:
          updatedUser.isPremium,

      },

    });

  } catch (error) {

    console.log(
      "UPDATE PLAN ERROR:",
      error
    );

    return Response.json(
      {
        success: false,
        message:
          "Internal Server Error",
      },
      {
        status: 500,
      }
    );

  }

}