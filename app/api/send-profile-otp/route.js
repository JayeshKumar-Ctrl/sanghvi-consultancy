import nodemailer from
"nodemailer";

global.otpStore =
  global.otpStore || {};

export async function POST(req) {

  try {

    const body =
      await req.json();

    const email =
      body.email;

    const otp =
      Math.floor(
        100000 +
        Math.random() * 900000
      ).toString();

    global.otpStore[email] =
      otp;
    
    console.log(
        "Generated OTP:",
        otp
    );

    console.log(
      "OTP:",
      otp
    );

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

        <h2>
          Your OTP is:
          ${otp}
        </h2>

      `,

    });

    return Response.json({

      success: true,

      otp,

    });

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