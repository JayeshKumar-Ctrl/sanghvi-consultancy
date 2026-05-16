import connectDB from
"@/lib/mongodb";

import Conversion from
"@/models/Conversion";

import jwt from
"jsonwebtoken";

export async function GET(req) {

  try {

    await connectDB();

    const authHeader =
      req.headers.get(
        "authorization"
      );

    if (!authHeader) {

      return Response.json(
        {
          message:
            "Unauthorized",
        },
        {
          status: 401,
        }
      );

    }

    const token =
      authHeader.split(
        " "
      )[1];

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    const conversions =
      await Conversion.find({

        userId:
          decoded.userId,

      }).sort({
        createdAt: -1,
      });

    return Response.json({

      success: true,

      conversions,

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