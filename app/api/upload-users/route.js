import connectDB from
"@/lib/mongodb";

import Document from
"@/models/Document";

import jwt from "jsonwebtoken";

export async function GET(req) {

  try {

    await connectDB();

    const authHeader =
      req.headers.get("authorization");

    if (!authHeader) {

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

    const uploads =
      await Document.find(
        {},
        {
          userId: 1,
          uploadedBy: 1,
          userEmail: 1,
        }
      );

    const groupedUsers = {};

    uploads.forEach(
      (item) => {

        // SKIP EMPTY USERS

        if (
          !item.uploadedBy &&
          !item.userEmail
        ) {

          return;

        }

        const key =
          item.userId.toString();

        if (!groupedUsers[key]) {

          groupedUsers[key] = {

            userId:
              item.userId,

            uploadedBy:
              item.uploadedBy,

            userEmail:
              item.userEmail,

          };

        }

      }
    );

    return Response.json({

      success: true,

      users:
        Object.values(
          groupedUsers
        ),

    });

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