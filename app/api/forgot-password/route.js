import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import transporter from "@/lib/mailer";

export async function POST(req) {
  try {

    await connectDB();

    const body = await req.json();

    const { email } = body;

    if (!email) {
      return Response.json(
        {
          message: "Email required",
        },
        {
          status: 400,
        }
      );
    }

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return Response.json(
        {
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    // GENERATE OTP

    const otp =
      Math.floor(
        100000 +
        Math.random() * 900000
      ).toString();

    // SAVE OTP

    user.resetOtp = otp;

    user.resetOtpExpiry =
      new Date(
        Date.now() + 10 * 60 * 1000
      );

    await user.save();

    // SEND MAIL

    await transporter.sendMail({

      from:
        process.env.EMAIL_USER,

      to: email,

      subject:
        "Password Reset OTP",

      html: `
        <div style="font-family:sans-serif;padding:20px">
          <h2>Password Reset</h2>

          <p>Your OTP is:</p>

          <h1>${otp}</h1>

          <p>
            OTP expires in 10 minutes.
          </p>
        </div>
      `,
    });

    return Response.json({
      success: true,
      message:
        "OTP sent successfully",
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