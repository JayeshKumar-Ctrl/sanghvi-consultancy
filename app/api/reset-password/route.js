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

    if (!email || !otp || !newPassword) {

      return Response.json(
        {
          success: false,
          message: "All fields are required.",
        },
        {
          status: 400,
        }
      );

    }

    if (newPassword.length < 6) {

      return Response.json(
        {
          success: false,
          message:
            "Password must be at least 6 characters.",
        },
        {
          status: 400,
        }
      );

    }

    const user =
      await User.findOne({
        email,
      });

    if (!user) {

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

    // CHECK OTP

    if (
      user.resetOtp !== otp
    ) {

      return Response.json(
        {
          success: false,
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
          success: false,
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

    return Response.json(
      {
        success: true,
        message:
          "Password Updated Successfully.",
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
          "Internal Server Error.",
      },
      {
        status: 500,
      }
    );

  }

}