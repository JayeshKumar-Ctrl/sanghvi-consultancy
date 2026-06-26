"use client";

import Footer from "@/app/components/Footer";

export default function BookkeepingPage() {

  return (

    <main
      style={{
        background: "#e7dfcf",
        minHeight: "100vh",
        padding: "clamp(50px,8vw,80px) 0",
      }}
    >

      <div
        style={{
          width: "90%",
          maxWidth: "1400px",
          margin: "auto",
        }}
      >

        {/* HERO SECTION */}

        <div
          style={{
            background:
              "linear-gradient(135deg,#062b1f,#00150f)",

            borderRadius: "24px",

            padding: "clamp(24px,6vw,80px)",

            color: "white",

            marginBottom: "70px",

            boxShadow:
              "0 20px 60px rgba(0,0,0,0.18)",
          }}
        >

          <h1
            style={{
              fontSize: "clamp(2.4rem,7vw,72px)",
              fontWeight: "800",
              marginBottom: "25px",
              lineHeight: "1.1",
            }}
          >
            Bookkeeping
          </h1>

          <p
            style={{
              fontSize: "clamp(1rem,3vw,28px)",
              lineHeight: "1.8",
              color: "#d8d8d8",
              maxWidth: "1000px",
            }}
          >
            Professional bookkeeping services
            for businesses, startups and
            professionals to maintain proper
            financial records and accounting
            accuracy.
          </p>

        </div>

        {/* MAIN WHITE BOX */}

        <div
          style={{
            background: "white",

            borderRadius: "24px",

            padding: "clamp(24px,5vw,70px)",

            boxShadow:
              "0 20px 50px rgba(0,0,0,0.08)",

            border:
              "1px solid rgba(0,0,0,0.05)",
          }}
        >

          {/* WHAT IS */}

          <div
            style={{
              marginBottom: "70px",
            }}
          >

            <h2
              style={{
                fontSize: "clamp(2rem,6vw,52px)",
                color: "#062b1f",
                fontWeight: "800",
                marginBottom: "25px",
              }}
            >
              What is Bookkeeping?
            </h2>

            <p
              style={{
                fontSize: "clamp(1rem,3vw,24px)",
                lineHeight: "1.8",
                color: "#333",
              }}
            >
              Bookkeeping is the process of
              recording, organizing and managing
              all financial transactions of a
              business including sales,
              purchases, expenses and payments.
            </p>

          </div>

          {/* BENEFITS */}

          <div
            style={{
              marginBottom: "70px",
            }}
          >

            <h2
              style={{
                fontSize: "clamp(2rem,6vw,52px)",
                color: "#062b1f",
                fontWeight: "800",
                marginBottom: "35px",
              }}
            >
              Benefits
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(280px,1fr))",
                gap: "22px",
              }}
            >

              {[
                "Better financial management",
                "Accurate business records",
                "Easy tax filing",
                "Improved cash flow tracking",
                "Professional reporting",
                "Reduced accounting mistakes",
              ].map((item, index) => (

                <div
                  key={index}
                  className="premium-green-card"
                >
                  ✔ {item}
                </div>

              ))}

            </div>

          </div>

          {/* RISKS */}

          <div
            style={{
              marginBottom: "90px",
            }}
          >

            <h2
              style={{
                fontSize: "clamp(2rem,6vw,52px)",
                color: "#062b1f",
                fontWeight: "800",
                marginBottom: "35px",
              }}
            >
              Risks Without Bookkeeping
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(280px,1fr))",
                gap: "22px",
              }}
            >

              {[
                "Financial confusion",
                "Tax filing problems",
                "Business losses",
                "Accounting errors",
              ].map((item, index) => (

                <div
                  key={index}
                  className="premium-risk-card"
                >
                  ⚠ {item}
                </div>

              ))}

            </div>

          </div>

          {/* BUTTONS */}

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "30px",
              flexWrap: "wrap",
            }}
          >

            <a
              href="/book-consultation"
              style={{
                background:
                  "linear-gradient(135deg,#003b2f,#001f1a)",

                color: "white",

                padding:"clamp(14px,3vw,22px) clamp(24px,5vw,48px)",

                borderRadius: "60px",

                textDecoration: "none",

                fontSize: "clamp(1rem,3vw,22px)",

                fontWeight: "700",

                boxShadow:
                  "0 15px 40px rgba(0,0,0,0.15)",
              }}
            >
              Book Consultation
            </a>

            <a
              href="https://wa.me/918247564764"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                border:
                  "2px solid #062b1f",

                color: "#062b1f",

                padding: "clamp(14px,3vw,22px) clamp(24px,5vw,48px)",

                fontSize: "clamp(1rem,3vw,22px)",

                borderRadius: "60px",

                textDecoration: "none",

                fontWeight: "700",
              }}
            >
              WhatsApp Now
            </a>

          </div>

        </div>

      </div>

      <Footer />

    </main>

  );

}