import connectDB from
"@/lib/mongodb";

import User from
"@/models/User";

import jwt from
"jsonwebtoken";

export async function PUT(req) {

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

    const body =
      await req.json();

    if (
      body.companyName &&
      body.companyName.length > 100
    ) {

      return Response.json(
        {
          success: false,
          message:
            "Company name is too long.",
        },
        {
          status: 400,
        }
      );

    }

    if (
      !body.fullName ||
      body.fullName.trim() === ""
    ) {

      return Response.json(
        {
          success: false,
          message: "Full name is required.",
        },
        {
          status: 400,
        }
      );

    }

    const updatedUser =
      await User.findByIdAndUpdate(

        decoded.id,

        {

          fullName:
            body.fullName.trim(),

          company:
            body.companyName?.trim() || "",

        },

        {

          new: true,

          runValidators: true,

        }

      );

    if (!updatedUser) {

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

    return Response.json(
      {
        success: true,

        user: {

          _id: updatedUser._id,

          fullName: updatedUser.fullName,

          email: updatedUser.email,

          company: updatedUser.company,

          phone: updatedUser.phone,

        },

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
        message: "Internal server error.",
      },
      {
        status: 500,
      }
    );

  }

}