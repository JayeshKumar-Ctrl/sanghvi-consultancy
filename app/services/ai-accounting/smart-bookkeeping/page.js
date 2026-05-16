import Footer from "@/app/components/Footer";

export default function SmartBookkeeping() {

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
            Smart Bookkeeping
          </h1>

          <p
            style={{
              fontSize: "28px",
              lineHeight: "1.8",
              color: "#d8d8d8",
            }}
          >
            AI-powered smart bookkeeping
            solutions for businesses to manage
            accounts, transactions and financial
            records efficiently and accurately.
          </p>

        </div>

        {/* CONTENT */}

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
            What is Smart Bookkeeping?
          </h2>

          <p
            style={{
              fontSize: "30px",
              lineHeight: "1.8",
              color: "#333",
              marginBottom: "60px",
            }}
          >
            Smart Bookkeeping uses AI and
            automation tools to maintain
            accounting records, track business
            expenses and simplify day-to-day
            bookkeeping operations.
          </p>

          {/* FEATURES */}

          <h2
            style={{
              fontSize: "52px",
              color: "#062b1f",
              marginBottom: "30px",
              fontWeight: "800",
            }}
          >
            Features Included
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
              "Automated Expense Tracking",
              "Digital Ledger Management",
              "Bank Reconciliation",
              "Real-Time Accounting",
              "AI Transaction Categorization",
              "Smart Financial Monitoring",
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
              "Better accounting accuracy",
              "Reduced manual bookkeeping",
              "Faster financial tracking",
              "Improved business efficiency",
              "Secure financial records",
              "Smart business management",
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
            Risks Without Smart Bookkeeping
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
              "Accounting inaccuracies",
              "Poor expense management",
              "Financial record confusion",
              "Business reporting delays",
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