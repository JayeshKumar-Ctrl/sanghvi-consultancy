import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {

  try {

    await connectDB();

    const body =
      await req.json();

    const {
      email,
      otp,
      newPassword,
    } = body;

    const user =
      await User.findOne({
        email,
      });

    if (!user) {

      return Response.json(
        {
          message:
            "User not found",
        },
        {
          status: 404,
        }
      );

    }

    // CHECK OTP

    if (
      user.resetOtp !== otp
    ) {

      return Response.json(
        {
          message:
            "Invalid OTP",
        },
        {
          status: 400,
        }
      );

    }

    // CHECK EXPIRY

    if (
      new Date() >
      user.resetOtpExpiry
    ) {

      return Response.json(
        {
          message:
            "OTP expired",
        },
        {
          status: 400,
        }
      );

    }

    // HASH PASSWORD

    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10
      );

    user.password =
      hashedPassword;

    user.resetOtp =
      null;

    user.resetOtpExpiry =
      null;

    await user.save();

    return Response.json({
      success: true,
      message:
        "Password updated",
    });

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