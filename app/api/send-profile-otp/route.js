import User from "@/models/User";
import connectDB from "@/lib/mongodb";
import nodemailer from "nodemailer";


global.otpStore =
  global.otpStore || {};

export async function POST(req) {

  try {

    const body =
      await req.json();

    const email =
      body.email;

    if (!email) {

      return Response.json(
        {
          success: false,
          message: "Email is required.",
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

    await connectDB();

    const user =
      await User.findOne({
        email,
      });

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

    const otp =
      Math.floor(
        100000 +
        Math.random() * 900000
      ).toString();

    global.otpStore[email] = {

      otp,

      expiresAt:
        Date.now() + 5 * 60 * 1000,

    };

    const transporter =
      nodemailer.createTransport({

        service: "gmail",

        auth: {

          user:
            process.env.EMAIL_USER,

          pass:
            process.env.EMAIL_PASS,

        },

      });

    await transporter.sendMail({

      from:
        process.env.EMAIL_USER,

      to: email,

      subject:
        "Profile Update OTP",

      html: `

        <h2>Sanghvi Consultancy Services</h2>

        <p>Your OTP for profile verification is:</p>

        <h1>${otp}</h1>

        <p>This OTP will expire in 5 minutes.</p>

        <p>Please do not share it with anyone.</p>

      `,

    });

    return Response.json(
      {
        success: true,
        message: "OTP sent successfully.",
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
          "OTP send failed",
      },
      {
        status: 500,
      }
    );

  }

}