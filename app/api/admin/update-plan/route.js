import connectDB from "@/lib/mongodb";

import User from "@/models/User";

export async function POST(req) {

  try {

    await connectDB();

    const body =
      await req.json();

    const {
      userId,
      plan,
    } = body;

    if (!userId || !plan) {

      return Response.json(
        {
          success: false,
          message:
            "Missing data",
        },
        {
          status: 400,
        }
      );

    }

    // PREMIUM CHECK

    const isPremium =
      plan === "Premium";

    // UPDATE DATABASE

    const updatedUser =
      await User.findByIdAndUpdate(

        userId,

        {

          planType:
            plan,

          isPremium:
            isPremium,

          isPaid:
            isPremium,

        },

        {

          new: true,

        }

      );

    if (!updatedUser) {

      return Response.json(
        {
          success: false,
          message:
            "User not found",
        },
        {
          status: 404,
        }
      );

    }

    return Response.json({

      success: true,

      user:
        updatedUser,

    });

  } catch (error) {

    console.log(
      "UPDATE PLAN ERROR:",
      error
    );

    return Response.json(
      {
        success: false,
        message:
          "Server Error",
      },
      {
        status: 500,
      }
    );

  }

}