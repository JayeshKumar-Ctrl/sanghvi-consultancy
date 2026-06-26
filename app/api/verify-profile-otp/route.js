export async function POST(req) {

  try {

    const body =
      await req.json();

    const email =
      body.email;

    const otp =
      body.otp;

    if (!email || !otp) {

      return Response.json(
        {
          success: false,
          message:
            "Email and OTP are required.",
        },
        {
          status: 400,
        }
      );

    }

    const storedData =
      global.otpStore[email];

    if (!storedData) {

      return Response.json(
        {
          success: false,
          message:
            "OTP not found.",
        },
        {
          status: 400,
        }
      );

    }

    if (

      Date.now() >

      storedData.expiresAt

    ) {

      delete global.otpStore[email];

      return Response.json(
        {
          success: false,
          message:
            "OTP has expired.",
        },
        {
          status: 400,
        }
      );

    }

    if (

      storedData.otp !== otp

    ) {

      return Response.json(
        {
          success: false,
          message:
            "Invalid OTP.",
        },
        {
          status: 400,
        }
      );

    }

    delete global.otpStore[email];

    return Response.json(
      {
        success: true,
        message:
          "OTP verified successfully.",
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