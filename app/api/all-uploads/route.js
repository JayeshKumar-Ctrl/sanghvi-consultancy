import connectDB from
"@/lib/mongodb";

import Document from
"@/models/Document";

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

    const uploads =
      await Document.find()
      .sort({
        createdAt: -1,
      });

    return Response.json({

      success: true,

      uploads,

    });

  } catch (error) {

    console.log(error);

    return Response.json({

      success: false,

    });

  }

}