import connectDB from
"@/lib/mongodb";

import Document from
"@/models/Document";

export async function GET() {

  try {

    await connectDB();

    const uploads =
      await Document.find();

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

        if (
          !groupedUsers[
            item.userId
          ]
        ) {

          groupedUsers[
            item.userId
          ] = {

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

    return Response.json({

      success: false,

    });

  }

}