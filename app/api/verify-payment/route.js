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
      authHeader.split(" ")[1];

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    const body =
      await req.json();

    const {

      razorpay_order_id,

      razorpay_payment_id,

      razorpay_signature,

    } = body;

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
          "Verification failed",
      },
      {
        status: 500,
      }
    );

  }

}