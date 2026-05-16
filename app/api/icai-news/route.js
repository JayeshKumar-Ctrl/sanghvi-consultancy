import YahooFinance from "yahoo-finance2";

const yahooFinance = new YahooFinance();

export async function GET() {

  try {

    const news = [

      {
        tag: "NEW",

        title:
          "ICAI Releases Updated Tax Audit Guidelines",

        link:
          "https://www.icai.org",
      },

      {
        tag: "IMPORTANT",

        title:
          "GST Return Filing Deadline Extended",

        link:
          "https://www.gst.gov.in",
      },

      {
        tag: "ALERT",

        title:
          "MCA Issues New Compliance Notification",

        link:
          "https://www.mca.gov.in",
      },

      {
        tag: "UPDATE",

        title:
          "CBDT Announces Revised TDS Rules",

        link:
          "https://www.incometax.gov.in",
      },

      {
        tag: "NEW",

        title:
          "ICAI Introduces AI-Based Audit Framework",

        link:
          "https://www.icai.org",
      },

    ];

    return Response.json({

      success: true,

      news,

    });

  } catch (error) {

    console.log(error);

    return Response.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );

  }

}