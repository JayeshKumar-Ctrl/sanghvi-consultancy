import crypto from "crypto";

import connectDB from "@/lib/mongodb";

import User from "@/models/User";

import Payment from "@/models/Payment";

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
          message: "No token",
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

    const existingUser =
      await User.findById(decoded.id);

    if (!existingUser) {

      return Response.json(
        {
          success: false,
          message:
            "User not found.",
        },
        {
          status: 404,
        }
      );

    }

    const body =
      await req.json();

    const {

      razorpay_order_id,

      razorpay_payment_id,

      razorpay_signature,

    } = body;

    if (

      !razorpay_order_id ||

      !razorpay_payment_id ||

      !razorpay_signature

    ) {

      return Response.json(
        {
          success: false,
          message:
            "Missing payment details.",
        },
        {
          status: 400,
        }
      );

    }

    // CREATE SIGNATURE

    const generatedSignature =
      crypto
        .createHmac(
          "sha256",
          process.env
            .RAZORPAY_KEY_SECRET
        )

        .update(
          razorpay_order_id +
          "|" +
          razorpay_payment_id
        )

        .digest("hex");

    // VERIFY SIGNATURE

    if (
      generatedSignature !==
      razorpay_signature
    ) {

      return Response.json(
        {
          success: false,
          message:
            "Payment verification failed",
        },
        {
          status: 400,
        }
      );

    }

    const existingPayment =
      await Payment.findOne({

        razorpayPaymentId:
          razorpay_payment_id,

      });

    if (existingPayment) {

      return Response.json(
        {
          success: false,
          message:
            "Payment already processed.",
        },
        {
          status: 400,
        }
      );

    }

    const existingOrder =
      await Payment.findOne({

        razorpayOrderId:
          razorpay_order_id,

      });

    if (existingOrder) {

      return Response.json(
        {
          success: false,
          message:
            "Order already processed.",
        },
        {
          status: 400,
        }
      );

    }

    if (existingUser.isPremium) {

      return Response.json(
        {
          success: false,
          message:
            "Premium already activated.",
        },
        {
          status: 400,
        }
      );

    }

    // ACTIVATE PREMIUM

    const updatedUser =
      await User.findByIdAndUpdate(

        decoded.id,

        {
          isPremium: true,
          isPaid: true,
          planType: "Premium",
        },

        {
          new: true,
        }
      );

    if (!updatedUser) {

      return Response.json(
        {
          success: false,
          message: "User update failed.",
        },
        {
          status: 404,
        }
      );

    }

    // SAVE PAYMENT

    await Payment.create({

      userId:
        updatedUser._id,

      fullName:
        updatedUser.fullName,

      email:
        updatedUser.email,

      razorpayOrderId:
        razorpay_order_id,

      razorpayPaymentId:
        razorpay_payment_id,

      razorpaySignature:
        razorpay_signature,

      amount: 299,

      plan: "Premium",

      paymentStatus:
        "Completed",

    });

    return Response.json({

      success: true,

      message:
        "Payment verified successfully",

    });

  } catch (error) {

    console.log(error);

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