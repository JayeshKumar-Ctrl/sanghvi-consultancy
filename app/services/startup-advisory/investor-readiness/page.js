import Footer from "@/app/components/Footer";

export default function InvestorReadiness() {

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

        {/* HERO */}

        <div
          style={{
            background:
              "linear-gradient(135deg,#062b1f,#00150f)",

            borderRadius: "24px",

            padding:"clamp(24px,6vw,80px)",

            color: "white",

            marginBottom: "70px",
          }}
        >

          <h1
            style={{
              fontSize: "clamp(2.4rem,7vw,72px)",
              fontWeight: "800",
              marginBottom: "25px",
            }}
          >
            Investor Readiness
          </h1>

          <p
            style={{
              fontSize: "clamp(1rem,3vw,28px)",
              lineHeight: "1.8",
              color: "#d8d8d8",
            }}
          >
            Professional investor readiness
            solutions for startups to prepare
            business plans, financials and
            presentations for funding and
            investment opportunities.
          </p>

        </div>

        {/* CONTENT BOX */}

        <div
          style={{
            background: "white",

            borderRadius: "24px",

            padding: "clamp(24px,5vw,70px)",

            boxShadow:
              "0 20px 50px rgba(0,0,0,0.08)",
          }}
        >

          {/* WHAT IS */}

          <h2
            style={{
              fontSize: "clamp(2rem,6vw,52px)",
              color: "#062b1f",
              marginBottom: "25px",
              fontWeight: "800",
            }}
          >
            What is Investor Readiness?
          </h2>

          <p
            style={{
              fontSize: "clamp(1rem,3vw,24px)",
              lineHeight: "1.8",
              color: "#333",
              marginBottom: "60px",
            }}
          >
            Investor Readiness helps startups
            prepare professionally for attracting
            investors through strong financial
            planning, valuation strategies and
            business presentations.
          </p>

          {/* SERVICES INCLUDED */}

          <h2
            style={{
              fontSize: "clamp(2rem,6vw,52px)",
              color: "#062b1f",
              marginBottom: "30px",
              fontWeight: "800",
            }}
          >
            Services Included
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(280px,1fr))",
              gap: "22px",
              marginBottom: "70px",
            }}
          >

            {[
              "Investor Pitch Deck",
              "Startup Valuation Support",
              "Financial Presentation",
              "Business Growth Planning",
              "Investment Strategy Advisory",
              "Funding Preparation",
            ].map((item, index) => (

              <div
                key={index}
                className="premium-white-card"
              >
                {item}
              </div>

            ))}

          </div>

          {/* BENEFITS */}

          <h2
            style={{
              fontSize: "clamp(2rem,6vw,52px)",
              color: "#062b1f",
              marginBottom: "30px",
              fontWeight: "800",
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
              marginBottom: "70px",
            }}
          >

            {[
              "Better funding opportunities",
              "Professional investor approach",
              "Improved business valuation",
              "Strong financial presentation",
              "Business growth support",
              "Enhanced investor confidence",
            ].map((item, index) => (

              <div
                key={index}
                className="premium-green-card"
              >
                ✔ {item}
              </div>

            ))}

          </div>

          {/* RISKS */}

          <h2
            style={{
              fontSize: "clamp(2rem,6vw,52px)",
              color: "#062b1f",
              marginBottom: "30px",
              fontWeight: "800",
            }}
          >
            Risks Without Investor Readiness
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(280px,1fr))",
              gap: "22px",
              marginBottom: "80px",
            }}
          >

            {[
              "Poor investor confidence",
              "Funding rejection",
              "Weak financial presentation",
              "Missed growth opportunities",
            ].map((item, index) => (

              <div
                key={index}
                className="premium-risk-card"
              >
                ⚠ {item}
              </div>

            ))}

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

                padding: "clamp(14px,3vw,22px) clamp(24px,5vw,48px)",

                borderRadius: "50px",

                textDecoration: "none",

                fontSize: "clamp(1rem,3vw,22px)",

                fontWeight: "700",

                border: "2px solid #003b2f",

                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.12)",
              }}
            >
              Book Consultation
            </a>

            <a
              href="https://wa.me/918247564764"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "transparent",

                color: "#003b2f",

                padding: "clamp(14px,3vw,22px) clamp(24px,5vw,48px)",

                borderRadius: "50px",

                textDecoration: "none",

                fontSize: "clamp(1rem,3vw,22px)",

                fontWeight: "700",

                border: "2px solid #003b2f",
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