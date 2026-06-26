import connectDB from
"@/lib/mongodb";

import User from
"@/models/User";

import jwt from
"jsonwebtoken";

import bcrypt from
"bcryptjs";

export async function PUT(req) {

  try {

    await connectDB();

    const token =
      req.headers
      .get("authorization")
      ?.split(" ")[1];

    if (!token) {

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

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    const body =
      await req.json();

    if (
      !body.currentPassword ||
      !body.newPassword
    ) {

      return Response.json(
        {
          success: false,
          message:
            "Current password and new password are required.",
        },
        {
          status: 400,
        }
      );

    }

    if (
      body.newPassword.length < 6
    ) {

      return Response.json(
        {
          success: false,
          message:
            "New password must be at least 6 characters.",
        },
        {
          status: 400,
        }
      );

    }

    const user =
      await User.findById(
        decoded.id
      );

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

    const isMatch =
      await bcrypt.compare(

        body.currentPassword,

        user.password

      );

    if (!isMatch) {

      return Response.json(
        {
          success: false,
          message: "Current password is incorrect.",
        },
        {
          status: 401,
        }
      );

    }

    if (
      body.currentPassword ===
      body.newPassword
    ) {

      return Response.json(
        {
          success: false,
          message:
            "New password must be different from the current password.",
        },
        {
          status: 400,
        }
      );

    }

    const hashedPassword =
      await bcrypt.hash(

        body.newPassword,

        10

      );

    user.password =
      hashedPassword;

    await user.save();

    return Response.json(
      {
        success: true,
        message:
          "Password changed successfully.",
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