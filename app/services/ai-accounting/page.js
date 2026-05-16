"use client";

import Link from "next/link";
import Footer from "@/app/components/Footer";

export default function AIAccountingPage() {

  return (

    <div
      style={{
        background: "#d9d0bf",
        minHeight: "100vh",
      }}
    >

      <div
        style={{
          maxWidth: "1250px",
          margin: "0 auto",
          padding: "130px 40px 80px",
        }}
      >

        {/* HEADING */}

        <h1
          style={{
            fontSize: "64px",
            fontWeight: "800",
            color: "#062b1f",
            marginBottom: "25px",
            lineHeight: "78px",
            letterSpacing: "-2px",
          }}
        >
          AI & Digital Accounting
        </h1>

        <p
          style={{
            fontSize: "22px",
            lineHeight: "38px",
            color: "#3b3b3b",
            maxWidth: "950px",
            marginBottom: "70px",
          }}
        >
          Modern AI-powered accounting and
          digital financial solutions for
          businesses, startups and professionals
          to automate bookkeeping and improve
          financial efficiency.
        </p>

        {/* SERVICES INCLUDED */}

        <div
          style={{
            background:
              "linear-gradient(135deg,#062b1f,#00150f)",

            borderRadius: "35px",

            padding: "60px",

            color: "white",

            marginBottom: "70px",

            boxShadow:
              "0 20px 60px rgba(0,0,0,0.18)",
          }}
        >

          <h2
            style={{
              fontSize: "46px",
              marginBottom: "40px",
              fontWeight: "800",
            }}
          >
            Services Included
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "22px",
            }}
          >

            {[
              {
                title:
                  "AI Invoice Scanner",
                link:
                  "/services/ai-accounting/ai-invoice-scanner",
              },

              {
                title:
                  "Cloud Accounting",
                link:
                  "/services/ai-accounting/cloud-accounting",
              },

              {
                title:
                  "Automated Reports",
                link:
                  "/services/ai-accounting/automated-reports",
              },

              {
                title:
                  "Smart Bookkeeping",
                link:
                  "/services/ai-accounting/smart-bookkeeping",
              },

            ].map((service, index) => (

              <Link
                key={index}
                href={service.link}
                style={{
                  textDecoration: "none",
                }}
              >

                <div className="premium-service-box">

                  <span>
                    ✅ {service.title}
                  </span>

                  <span>
                    →
                  </span>

                </div>

              </Link>

            ))}

          </div>

        </div>

        {/* ABOUT SECTION */}

        <div
          style={{
            background: "white",

            borderRadius: "35px",

            padding: "70px",

            marginTop: "70px",

            boxShadow:
              "0 20px 50px rgba(0,0,0,0.08)",

            border:
              "1px solid rgba(0,0,0,0.05)",
          }}
        >

          {/* WHAT IS THIS */}

          <div
            style={{
              marginBottom: "60px",
            }}
          >

            <h2
              style={{
                fontSize: "48px",
                fontWeight: "800",
                color: "#062b1f",
                marginBottom: "25px",
                lineHeight: "1.1",
              }}
            >
              What is AI & Digital Accounting?
            </h2>

            <p
              style={{
                fontSize: "32px",
                lineHeight: "1.8",
                color: "#3b3b3b",
              }}
            >
              AI & Digital Accounting uses modern
              technologies, automation and cloud
              systems to simplify bookkeeping,
              invoice processing, reporting and
              financial management.
            </p>

          </div>

          {/* WHY IMPORTANT */}

          <div
            style={{
              marginBottom: "60px",
            }}
          >

            <h2
              style={{
                fontSize: "58px",
                fontWeight: "800",
                color: "#062b1f",
                marginBottom: "30px",
              }}
            >
              Why is it Important?
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "22px",
              }}
            >

              {[
                "Automates accounting tasks",
                "Reduces manual errors",
                "Improves financial accuracy",
                "Saves time and operational cost",
                "Provides real-time reports",
              ].map((item, index) => (

                <div
                  key={index}
                  style={{
                    background: "#f7f7f7",

                    padding: "24px 28px",

                    borderRadius: "18px",

                    fontSize: "28px",

                    fontWeight: "600",

                    color: "#222",
                  }}
                >
                  • {item}
                </div>

              ))}

            </div>

          </div>

          {/* WHO NEEDS THIS */}

          <div>

            <h2
              style={{
                fontSize: "48px",
                fontWeight: "800",
                color: "#062b1f",
                marginBottom: "30px",
              }}
            >
              Who Needs This?
            </h2>

            <div
              style={{
                display: "grid",

                gridTemplateColumns:
                  "repeat(auto-fit,minmax(280px,1fr))",

                gap: "24px",
              }}
            >

              {[
                "Startups",
                "CA Firms",
                "Business Owners",
                "E-Commerce Businesses",
                "Growing Companies",
                "Digital Enterprises",
              ].map((item, index) => (

                <div
                  key={index}
                  style={{
                    background:
                      "linear-gradient(135deg,#062b1f,#00150f)",

                    color: "white",

                    padding: "28px",

                    borderRadius: "22px",

                    fontSize: "28px",

                    fontWeight: "700",

                    textAlign: "center",

                    boxShadow:
                      "0 12px 30px rgba(0,0,0,0.12)",
                  }}
                >
                  {item}
                </div>

              ))}

            </div>

          </div>

        </div>

        {/* BUTTONS */}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "25px",
            marginTop: "90px",
            marginBottom: "40px",
            flexWrap: "wrap",
          }}
        >

          <Link
            href="/book-consultation"
            style={{
              background:
                "linear-gradient(135deg,#003b2f,#001f1a)",

              color: "white",

              padding: "20px 46px",

              borderRadius: "60px",

              textDecoration: "none",

              fontSize: "22px",

              fontWeight: "700",

              boxShadow:
                "0 15px 40px rgba(0,0,0,0.15)",
            }}
          >
            Book Consultation
          </Link>

          <a
            href="https://wa.me/918247564764"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              border: "2px solid #062b1f",

              color: "#062b1f",

              padding: "20px 46px",

              borderRadius: "60px",

              textDecoration: "none",

              fontSize: "22px",

              fontWeight: "700",
            }}
          >
            WhatsApp Now
          </a>

        </div>

      </div>

      <style jsx>{`

        .premium-service-box {

          background: white;

          color: #062b1f;

          padding: 28px 34px;

          border-radius: 22px;

          font-size: 28px;

          font-weight: 700;

          display: flex;

          justify-content: space-between;

          align-items: center;

          transition: 0.35s ease;

          box-shadow:
            0 10px 30px rgba(0,0,0,0.12);

        }

        .premium-service-box:hover {

          background: #f47c2c;

          color: white;

          transform: translateY(-5px);

        }

      `}</style>

      <Footer />

    </div>

  );

}