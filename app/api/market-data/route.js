import YahooFinance from "yahoo-finance2";

const yahooFinance = new YahooFinance();

export async function GET() {

  try {

    // GOLD API

    const goldRes = await fetch(
      "https://www.goldapi.io/api/XAU/INR",
      {
        headers: {
          "x-access-token":
            process.env.GOLD_API_KEY,
        },
      }
    );

    const silverRes = await fetch(
      "https://www.goldapi.io/api/XAG/INR",
      {
        headers: {
          "x-access-token":
            process.env.GOLD_API_KEY,
        },
      }
    );

    const goldData =
      await goldRes.json();

    const silverData =
      await silverRes.json();

    // YAHOO FINANCE API

    const niftyRes = await fetch(
      "https://query1.finance.yahoo.com/v8/finance/chart/%5ENSEI"
    );

    const sensexRes = await fetch(
      "https://query1.finance.yahoo.com/v8/finance/chart/%5EBSESN"
    );

    const usdRes = await fetch(
      "https://query1.finance.yahoo.com/v8/finance/chart/INR=X"
    );

    const niftyJson =
      await niftyRes.json();

    const sensexJson =
      await sensexRes.json();

    const usdJson =
      await usdRes.json();

    const nifty =
      Math.floor(
        niftyJson.chart.result[0]
        .meta.regularMarketPrice
      );

    const sensex =
      Math.floor(
        sensexJson.chart.result[0]
        .meta.regularMarketPrice
      );

    const usdInr =
      usdJson.chart.result[0]
      .meta.regularMarketPrice
      .toFixed(2);

    // RETURN FINAL DATA

    return Response.json({

      success: true,

      data: {

        // GOLD PRICE PER 10g WITH TAX

        gold: Math.floor(
          goldData.price_gram_24k *
          10 *
          1.1405
        ),

        // SILVER PRICE PER KG WITH TAX

        silver: Math.floor(
          silverData.price *
          32.1507 *
          1.1057
        ),

        nifty,
        sensex,
        usdInr,

      },

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