import model from
"@/lib/gemini";

export async function GET() {

  try {

    const result =
      await model.generateContent(

        "Translate this Gujarati accounting word into English: જમા"

      );

    const response =
      result.response.text();

    return Response.json({

      success: true,

      response,

    });

  } catch (error) {

    console.log(error);

    return Response.json({

      success: false,

      message:
        "Gemini failed",

    });

  }

}