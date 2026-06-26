"use client";

import Link from "next/link";
import Footer from "@/app/components/Footer";

export default function BusinessRegistrationPage() {

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
          padding: "clamp(90px,12vw,130px) clamp(16px,4vw,40px) clamp(50px,8vw,80px)",
        }}
      >

        {/* HEADING */}

        <h1
          style={{
            fontSize: "clamp(2.3rem,8vw,64px)",
            lineHeight: "1.2",
            letterSpacing: "-0.03em",
            fontWeight: "800",
            color: "#062b1f",
            marginBottom: "25px",
          }}
        >
          Business Registration
        </h1>

        <p
          style={{
            fontSize: "clamp(1rem,3vw,22px)",
            lineHeight: "1.8",
            color: "#3b3b3b",
            maxWidth: "950px",
            marginBottom: "70px",
          }}
        >
          Complete business registration and
          licensing solutions for startups,
          professionals, firms and growing
          businesses with end-to-end compliance
          support.
        </p>

        {/* SERVICES INCLUDED */}

        <div
          style={{
            background:
              "linear-gradient(135deg,#062b1f,#00150f)",

            borderRadius: "24px",

            padding: "clamp(24px,5vw,60px)",

            color: "white",

            marginBottom: "70px",

            boxShadow:
              "0 20px 60px rgba(0,0,0,0.18)",
          }}
        >

          <h2
            style={{
              fontSize: "clamp(2rem,6vw,46px)",
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
                  "Company Registration",
                link:
                  "/services/business-registration/company-registration",
              },


              {
                title:
                  "GST Registration",
                link:
                  "/services/business-registration/gst-registration",
              },

              {
                title:
                  "Trade License",
                link:
                  "/services/business-registration/trade-license",
              },

              {
                title:
                  "Labour License",
                link:
                  "/services/business-registration/labour-license",
              },

              {
                title:
                  "Trademark Registration",
                link:
                  "/services/business-registration/trademark-registration",
              },

              {
                title:
                  "PAN Application",
                link:
                  "/services/business-registration/pan-application",
              },

              {
                title:
                  "TAN Application",
                link:
                  "/services/business-registration/tan-application",
              },

              {
                title:
                  "Import Export Code",
                link:
                  "/services/business-registration/import-export-code",
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

            borderRadius: "24px",

            padding: "clamp(24px,5vw,70px)",

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
                fontSize: "clamp(2rem,6vw,48px)",
                fontWeight: "800",
                color: "#062b1f",
                marginBottom: "25px",
                lineHeight: "1.1",
              }}
            >
              What is Business Registration?
            </h2>

            <p
              style={{
                fontSize: "clamp(1rem,3vw,24px)",
                lineHeight: "1.8",
                color: "#3b3b3b",
              }}
            >
              Business Registration helps startups,
              firms and companies legally establish
              and operate their business with proper
              government approvals, licenses and
              registrations.
            </p>

          </div>

          {/* WHY REQUIRED */}

          <div
            style={{
              marginBottom: "60px",
            }}
          >

            <h2
              style={{
                fontSize: "clamp(2rem,7vw,58px)",
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
                "Legal business operations",
                "Government compliance",
                "Business credibility",
                "Bank account & loan approvals",
                "Tax & licensing support",
              ].map((item, index) => (

                <div
                  key={index}
                  style={{
                    background: "#f7f7f7",

                    padding:"clamp(16px,3vw,24px) clamp(18px,4vw,28px)",

                    fontSize:"clamp(1rem,3vw,28px)",

                    borderRadius: "18px",

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
                fontSize: "clamp(2rem,6vw,48px)",
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
                "MSMEs",
                "Shop Owners",
                "Professionals",
                "Private Companies",
                "Import Export Businesses",
              ].map((item, index) => (

                <div
                  key={index}
                  style={{
                    background:
                      "linear-gradient(135deg,#062b1f,#00150f)",

                    color: "white",

                    padding:"clamp(18px,4vw,28px)",

                    fontSize:"clamp(1rem,3vw,28px)",

                    borderRadius: "22px",

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

              padding:"clamp(14px,3vw,20px) clamp(24px,5vw,46px)",

              fontSize:"clamp(1rem,3vw,22px)",

              borderRadius: "60px",

              textDecoration: "none",

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

              padding:"clamp(14px,3vw,20px) clamp(24px,5vw,46px)",

              fontSize:"clamp(1rem,3vw,22px)",

              borderRadius: "60px",

              textDecoration: "none",

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

          padding:
            clamp(18px,3vw,28px)
            clamp(20px,4vw,34px);

          font-size:
            clamp(1rem,3vw,28px);

          flex-wrap: wrap;

          gap: 12px;

          border-radius: 22px;

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