import Footer from "@/app/components/Footer";

export default function UnsecuredLoans() {

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

        {/* HERO */}

        <div
          style={{
            background:
              "linear-gradient(135deg,#062b1f,#00150f)",

            borderRadius: "40px",

            padding: "80px",

            color: "white",

            marginBottom: "70px",
          }}
        >

          <h1
            style={{
              fontSize: "72px",
              fontWeight: "800",
              marginBottom: "25px",
            }}
          >
            Unsecured Loans
          </h1>

          <p
            style={{
              fontSize: "28px",
              lineHeight: "1.8",
              color: "#d8d8d8",
            }}
          >
            Fast and flexible unsecured loan
            solutions for startups, businesses
            and salaried individuals without
            collateral requirements.
          </p>

        </div>

        {/* CONTENT BOX */}

        <div
          style={{
            background: "white",

            borderRadius: "35px",

            padding: "70px",

            boxShadow:
              "0 20px 50px rgba(0,0,0,0.08)",
          }}
        >

          {/* WHAT IS */}

          <h2
            style={{
              fontSize: "58px",
              color: "#062b1f",
              marginBottom: "25px",
              fontWeight: "800",
            }}
          >
            What are Unsecured Loans?
          </h2>

          <p
            style={{
              fontSize: "30px",
              lineHeight: "1.8",
              color: "#333",
              marginBottom: "60px",
            }}
          >
            Unsecured Loans provide financial
            support without requiring property,
            assets or collateral security.
            These loans help businesses and
            individuals manage expansion,
            emergencies and operational needs.
          </p>

          {/* LOAN FEATURES */}

          <h2
            style={{
              fontSize: "52px",
              color: "#062b1f",
              marginBottom: "30px",
              fontWeight: "800",
            }}
          >
            Loan Features
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(300px,1fr))",
              gap: "22px",
              marginBottom: "70px",
            }}
          >

            {[
              "No Collateral Required",
              "Quick Approval Process",
              "Flexible Loan Amount",
              "Minimal Documentation",
              "Fast Disbursement",
              "Easy EMI Options",
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
              fontSize: "52px",
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
                "repeat(auto-fit,minmax(300px,1fr))",
              gap: "22px",
              marginBottom: "70px",
            }}
          >

            {[
              "Instant financial support",
              "No asset mortgage",
              "Business growth assistance",
              "Emergency fund access",
              "Flexible repayment tenure",
              "Improved cash flow",
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
              fontSize: "52px",
              color: "#062b1f",
              marginBottom: "30px",
              fontWeight: "800",
            }}
          >
            Risks Without Proper Planning
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(300px,1fr))",
              gap: "22px",
              marginBottom: "80px",
            }}
          >

            {[
              "Loan rejection issues",
              "Higher repayment burden",
              "Cash flow problems",
              "Credit score impact",
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

                padding: "18px 42px",

                borderRadius: "50px",

                textDecoration: "none",

                fontSize: "20px",

                fontWeight: "700",

                border: "2px solid #003b2f",

                boxShadow:
                  "0 10px 30px rgba(0,0,0,0.12)",

                transition: "0.3s",
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

                padding: "18px 42px",

                borderRadius: "50px",

                textDecoration: "none",

                fontSize: "20px",

                fontWeight: "700",

                border: "2px solid #003b2f",

                transition: "0.3s",
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