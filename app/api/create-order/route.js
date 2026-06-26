import Razorpay from "razorpay";

import jwt from "jsonwebtoken";

import connectDB from "@/lib/mongodb";

import User from "@/models/User";

const razorpay =
  new Razorpay({

    key_id:
      process.env.RAZORPAY_KEY_ID,

    key_secret:
      process.env
      .RAZORPAY_KEY_SECRET,

  });

export async function POST(req) {

  try {

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

    await connectDB();

    const user =
      await User.findById(decoded.id);

    if (!user) {

      return Response.json(
        {
          success: false,
          message: "User not found.",
        },
        {
          status: 404,
        }
      );

    }

    if (user.isPremium) {

      return Response.json(
        {
          success: false,
          message:
            "You already have Premium access.",
        },
        {
          status: 400,
        }
      );

    }

    const options = {

      amount:
        299 * 100,

      currency:
        "INR",

      receipt:
        `receipt_${Date.now()}`,

      notes: {

        userId:
          user._id.toString(),

        email:
          user.email,

      },

    };

    const order =
      await razorpay.orders.create(
        options
      );

    return Response.json({

      success: true,

      message:
        "Order created successfully.",

      order,

    });

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