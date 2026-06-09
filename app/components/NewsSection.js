"use client";
import { useEffect, useState } from "react";


export default function NewsSection() {

  const [newsData, setNewsData] =
    useState([]);

  const fetchNews = async () => {

    try {

      const res = await fetch(
        "/api/icai-news"
      );

      const data = await res.json();

      if (data.success) {

        setNewsData(data.news);

      }

    } catch (error) {

      console.log(error);

    }

  };


  const [marketData, setMarketData] = useState({
    gold: 98400,
    silver: 112000,
    nifty: 24820,
    sensex: 81240,
    usdInr: 83.11,
  });

  useEffect(() => {

    fetchMarketData();

    fetchNews();

    const interval = setInterval(() => {

      fetchMarketData();

      fetchNews();

    }, 60000);

    return () => clearInterval(interval);

  }, []);

  const fetchMarketData = async () => {

    try {

      const res = await fetch(
        "/api/market-data"
      );

      const data = await res.json();

      if (data.success) {

        setMarketData(data.data);

      }

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <section id="news" className="news-section">

      <div className="news-header">

        <h2 className="news-main-title">
          Industry Updates & Market Watch
        </h2>

        <p className="news-main-desc">
          Latest ICAI notifications,
          compliance alerts,
          and live financial indicators.
        </p>

      </div>

      <div className="news-grid">

        {/* LEFT BOX */}

        <div className="news-box">

          <div className="news-box-header">

            <div className="title-live">

              <div className="live-dot"></div>

              <div className="news-box-title">
                ICAI & Compliance Updates
              </div>

            </div>

          </div>

          <div className="news-scroll">

            {
              newsData.map((item, index) => (

                <a
                  key={index}

                  href={item.link}

                  target="_blank"

                  rel="noopener noreferrer"

                  className="news-item news-link"

                >

                  <span className="badge">

                    {
                      item.tag || "NEW"
                    }

                  </span>

                  {item.title}

                </a>

              ))
            }

          </div>

        </div>

        {/* RIGHT BOX */}

        <div className="news-box">

          <div className="news-top-row">

            <div>

              <div className="news-box-title">
                Market & Finance Watch
              </div>

              <div className="market-live-row">

                <div className="live-dot red-live"></div>

                <div className="market-live-text">
                  LIVE MARKET DATA
                </div>

              </div>

            </div>

          </div>

          <div className="market-scroll">

            <div className="market-item positive">
              <span>Gold</span>

              <strong>
                ₹{
                  marketData.gold
                    ? marketData.gold.toLocaleString("en-IN")
                    : "Loading..."
                } ↑
              </strong>
            </div>

            <div className="market-item negative">
              <span>Silver</span>

              <strong>
                ₹{
                  marketData.silver
                    ? marketData.silver.toLocaleString("en-IN")
                    : "Loading..."
                } ↓
              </strong>
            </div>

            <div className="market-item positive">
              <span>Nifty 50</span>

              <strong>
                {
                  marketData.nifty
                    ? marketData.nifty.toLocaleString("en-IN")
                    : "Loading..."
                } ↑
              </strong>
            </div>

            <div className="market-item positive">
              <span>Sensex</span>

              <strong>
                {
                  marketData.sensex
                    ? marketData.sensex.toLocaleString("en-IN")
                    : "Loading..."
                } ↑
              </strong>
            </div>

            <div className="market-item">
              <span>USD/INR</span>

              <strong>
                {
                  marketData.usdInr
                    ? marketData.usdInr
                    : "Loading..."
                }
              </strong>
            </div>

            <div className="market-item positive">
              <span>SBI FD Rate</span>

              <strong>7.10%</strong>
            </div>

          </div>

        </div>

      </div>

    </section>

  );
}