import connectDB from
"@/lib/mongodb";

import User from
"@/models/User";

import jwt from
"jsonwebtoken";

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

    console.log(
      "DECODED TOKEN:",
      decoded
    );

    const body =
      await req.json();

    console.log(
      "BODY:",
      body
    );

    console.log(
      "USER ID:",
      decoded.id
    );

    const updatedUser =
      await User.findByIdAndUpdate(

        decoded.id,

        {

          fullName:
            body.fullName,

          company:
            body.companyName,

        },

        {

          new: true,

          runValidators: true,

        }

      );

    console.log(
      "UPDATED USER:",
      updatedUser
    );

    if (!updatedUser) {

      return Response.json({

        success: false,

        message:
          "User not found",

      });

    }

    return Response.json({

      success: true,

      user: updatedUser,

    });

  } catch (error) {

    console.log(error);

    return Response.json({

      success: false,

      message:
        "Update failed",

    });

  }

}