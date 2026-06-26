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

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    if (
      decoded.email !==
      process.env.NEXT_PUBLIC_ADMIN_EMAIL
    ) {

      return Response.json(
        {
          success: false,
          message: "Access denied.",
        },
        {
          status: 403,
        }
      );

    }

    const payments =
      await Payment.find()
      .sort({
        paidAt: -1,
      });

    return Response.json(
      {
        success: true,
        payments,
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