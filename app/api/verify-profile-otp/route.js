export async function POST(req) {

  try {

    const body =
      await req.json();

    const email =
      body.email;

    const otp =
      body.otp;

    const storedOtp =
      global.otpStore[email];

    if (
      storedOtp !== otp
    ) {

      return Response.json({

        success: false,

        message:
          "Wrong OTP",

      });

    }

    delete global.otpStore[email];

    return Response.json({

      success: true,

    });

  } catch (error) {

    console.log(error);

    return Response.json({

      success: false,

      message:
        "Verification failed",

    });

  }

}