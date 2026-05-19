import Footer from "@/app/components/Footer";

export default function TaxSavingPlanning() {

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
            Tax Saving Planning
          </h1>

          <p
            style={{
              fontSize: "28px",
              lineHeight: "1.8",
              color: "#d8d8d8",
              maxWidth: "1000px",
            }}
          >
            Smart and legal tax saving strategies
            to reduce tax burden and maximize
            financial growth for individuals,
            businesses and professionals.
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
              What is Tax Saving Planning?
            </h2>

            <p
              style={{
                fontSize: "30px",
                lineHeight: "1.8",
                color: "#333",
              }}
            >
              Tax Saving Planning is the process of
              organizing investments, expenses and
              financial decisions in a legal way to
              reduce tax liabilities and improve
              long-term wealth creation.
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
                "Reduce tax burden legally",
                "Increase savings",
                "Better financial planning",
                "Long-term wealth creation",
                "Investment optimization",
                "Professional tax guidance",
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
              Risks Without Planning
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
                "Higher tax payments",
                "Missed deductions",
                "Poor financial management",
                "Reduced savings growth",
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