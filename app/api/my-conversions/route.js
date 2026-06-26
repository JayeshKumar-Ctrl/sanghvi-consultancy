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
          success: false,
          message:
            "Unauthorized",
        },
        {
          status: 401,
        }
      );

    }

    const token =
      authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : null;

    if (!token) {

      return Response.json(
        {
          success: false,
          message: "Invalid token.",
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

    const conversions =
      await Conversion.find({
        userId: decoded.id,
      })
        .select(
          "fileName language status convertedExcelUrl originalFileUrl createdAt"
        )
        .sort({
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
        success: false,
        message: "Internal server error.",
      },
      {
        status: 500,
      }
    );

  }

}