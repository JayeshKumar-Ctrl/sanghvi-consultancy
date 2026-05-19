import Footer from "@/app/components/Footer";

export default function NRIInvestments() {

  return (

    <main
      style={{
        background: "#e7dfcf",
        minHeight: "100vh",
        padding: "80px 0",
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

            borderRadius: "40px",

            padding: "80px",

            color: "white",

            marginBottom: "70px",

            boxShadow:
              "0 20px 60px rgba(0,0,0,0.18)",
          }}
        >

          <h1
            style={{
              fontSize: "72px",
              fontWeight: "800",
              marginBottom: "25px",
              lineHeight: "1.1",
            }}
          >
            NRI Investments
          </h1>

          <p
            style={{
              fontSize: "28px",
              lineHeight: "1.8",
              color: "#d8d8d8",
              maxWidth: "1000px",
            }}
          >
            Specialized investment solutions for
            Non-Resident Indians (NRIs) to build
            wealth in India through regulated,
            tax-efficient and professionally
            managed investment opportunities.
          </p>

        </div>

        {/* MAIN WHITE BOX */}

        <div
          style={{
            background: "white",

            borderRadius: "35px",

            padding: "70px",

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
                fontSize: "52px",
                color: "#062b1f",
                fontWeight: "800",
                marginBottom: "25px",
              }}
            >
              What are NRI Investments?
            </h2>

            <p
              style={{
                fontSize: "30px",
                lineHeight: "1.8",
                color: "#333",
              }}
            >
              NRI Investments help Non-Resident
              Indians invest in Indian financial
              products like mutual funds, fixed
              deposits, shares and real estate
              while complying with RBI and FEMA
              regulations.
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
                fontSize: "52px",
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
                "Investment opportunities in India",
                "Tax-efficient wealth management",
                "Portfolio diversification",
                "Long-term financial growth",
                "Professional advisory support",
                "RBI & FEMA compliant investments",
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
                fontSize: "52px",
                color: "#062b1f",
                fontWeight: "800",
                marginBottom: "35px",
              }}
            >
              Risks Without Proper Guidance
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
                "Regulatory compliance issues",
                "Taxation complications",
                "Improper portfolio allocation",
                "Higher financial risks",
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

                padding: "22px 48px",

                borderRadius: "60px",

                textDecoration: "none",

                fontSize: "22px",

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

                padding: "22px 48px",

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

      </div>

      <Footer />

    </main>

  );

}