import model from
"@/lib/gemini";

export async function POST(req) {

  try {

    const body =
      await req.json();

    const {
      imageUrl,
      language,
    } = body;

    // FETCH IMAGE

    const imageResponse =
      await fetch(imageUrl);

    const arrayBuffer =
      await imageResponse.arrayBuffer();

    const base64 =
      Buffer.from(
        arrayBuffer
      ).toString("base64");

    const prompt = `

You are an expert Indian accounting AI.

Analyze this ${language} ledger image.

Extract accounting rows.

Translate into English.

Return ONLY valid JSON.

Format:

[
  {
    "date": "",
    "particulars": "",
    "debit": "",
    "credit": "",
    "balance": ""
  }
]

`;

    let result;

    let retries = 3;

    while (retries > 0) {

    try {

        result =
        await model.generateContent([

            prompt,

            {
            inlineData: {

                mimeType:
                "image/jpeg",

                data:
                base64,

            },
            },

        ]);

        break;

    } catch (error) {

        console.log(
        "Gemini retrying..."
        );

        retries--;

        if (retries === 0) {

        throw error;

        }

        await new Promise(
        (resolve) =>
            setTimeout(
            resolve,
            3000
            )
        );

    }

    }

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
        "AI extraction failed",

      error:
        error.message,

    });

  }

}