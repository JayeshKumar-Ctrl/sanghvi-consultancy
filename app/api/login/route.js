import connectDB from "@/lib/mongodb";
import User from "@/models/User";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {

  try {

    await connectDB();

    const body = await req.json();

    const email =
      body.email?.trim().toLowerCase();

    const password =
      body.password;

    if (!email || !password) {

      return Response.json(
        {
          success: false,
          message: "Email and password are required.",
        },
        {
          status: 400,
        }
      );

    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {

      return Response.json(
        {
          success: false,
          message: "Invalid email address.",
        },
        {
          status: 400,
        }
      );

    }

    // CHECK USER
    const user = await User.findOne({ email });

    if (!user) {

      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    // CHECK PASSWORD
    const isPasswordCorrect =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isPasswordCorrect) {

      return Response.json(
        {
          success: false,
          message: "Invalid password",
        },
        {
          status: 401,
        }
      );
    }

    // CREATE JWT TOKEN
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d",
      }
    );

    return Response.json(

      {
        success: true,

        message: "Login successful",

        token,

        user: {

          _id: user._id,

          fullName: user.fullName,

          email: user.email,

          company: user.company,

          phone: user.phone,

          planType: user.planType,

          isPremium: user.isPremium,

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