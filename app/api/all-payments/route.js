import connectDB from
"@/lib/mongodb";

import Payment from
"@/models/Payment";

import jwt from
"jsonwebtoken";

export async function GET(req) {

  try {

    await connectDB();

    const token =
      req.headers
      .get("authorization")
      ?.split(" ")[1];

    if (!token) {

      return Response.json({

        success: false,

      });

    }

    jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const payments =
      await Payment.find()
      .sort({
        paidAt: -1,
      });

    return Response.json({

      success: true,

      payments,

    });

  } catch (error) {

    console.log(error);

    return Response.json({

      success: false,

    });

  }

}