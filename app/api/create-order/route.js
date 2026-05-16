import Razorpay from "razorpay";

const razorpay =
  new Razorpay({

    key_id:
      process.env.RAZORPAY_KEY_ID,

    key_secret:
      process.env
      .RAZORPAY_KEY_SECRET,

  });

export async function POST() {

  try {

    const options = {

      amount:
        299 * 100,

      currency:
        "INR",

      receipt:
        `receipt_${Date.now()}`,

    };

    const order =
      await razorpay.orders.create(
        options
      );

    return Response.json({

      success: true,

      order,

    });

  } catch (error) {

    console.log(error);

    return Response.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );

  }

}