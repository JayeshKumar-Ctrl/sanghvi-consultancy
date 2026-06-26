import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const fullName = body.fullName?.trim();
    const email = body.email?.trim().toLowerCase();
    const password = body.password;
    const company = body.company?.trim();
    const phone = body.phone?.trim();

    if (!fullName || !email || !password || !phone) {

      return Response.json(
        {
          success: false,
          message: "Please fill all required fields.",
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

    if (password.length < 6) {

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

    if (!/^[0-9]{10}$/.test(phone)) {

      return Response.json(
        {
          success: false,
          message:
            "Enter a valid 10-digit phone number.",
        },
        {
          status: 400,
        }
      );

    }

    // CHECK EXISTING USER
    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return Response.json(
        {
          message: "User already exists",
        },
        {
          status: 400,
        }
      );
    }

    // HASH PASSWORD
    const hashedPassword =
      await bcrypt.hash(password, 10);

    // CREATE USER
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      company,
      phone,
      isVerified: false,
    });

    return Response.json(
      {
        success: true,

        message:
          "User created successfully",

        user: {

          _id: user._id,

          fullName:
            user.fullName,

          email:
            user.email,

          company:
            user.company,

          phone:
            user.phone,

        },

      },
      {
        status: 201,
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