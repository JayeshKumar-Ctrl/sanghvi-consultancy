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

      return Response.json({

        success: false,

        message:
          "Unauthorized",

      });

    }

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    const body =
      await req.json();

    const user =
      await User.findById(
        decoded.id
      );

    if (!user) {

      return Response.json({

        success: false,

        message:
          "User not found",

      });

    }

    const isMatch =
      await bcrypt.compare(

        body.currentPassword,

        user.password

      );

    if (!isMatch) {

      return Response.json({

        success: false,

        message:
          "Current password incorrect",

      });

    }

    const hashedPassword =
      await bcrypt.hash(

        body.newPassword,

        10

      );

    user.password =
      hashedPassword;

    await user.save();

    return Response.json({

      success: true,

    });

  } catch (error) {

    console.log(error);

    return Response.json({

      success: false,

      message:
        "Password change failed",

    });

  }

}