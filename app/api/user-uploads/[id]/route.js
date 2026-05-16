import connectDB from
"@/lib/mongodb";

import Document from
"@/models/Document";

export async function GET(
  req,
  context
) {

  try {

    await connectDB();

    const params =
      await context.params;

    const uploads =
      await Document.find({

        userId:
          params.id,

      }).sort({
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