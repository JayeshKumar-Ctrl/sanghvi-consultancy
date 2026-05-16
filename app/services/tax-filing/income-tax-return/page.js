import Footer from "@/app/components/Footer";

export default function IncomeTaxReturnPage() {

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
            Income Tax Return Filing
          </h1>

          <p
            style={{
              fontSize: "28px",
              lineHeight: "1.8",
              color: "#d8d8d8",
              maxWidth: "1000px",
            }}
          >
            Professional ITR filing services
            for salaried employees,
            businesses, freelancers and NRIs.
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
              What is Income Tax Return Filing?
            </h2>

            <p
              style={{
                fontSize: "30px",
                lineHeight: "1.8",
                color: "#333",
              }}
            >
              Income Tax Return filing is the
              process of reporting your income,
              taxes paid, investments and
              deductions to the Income Tax
              Department. Proper filing helps
              maintain compliance and allows
              taxpayers to legally claim
              deductions and refunds.
            </p>

          </div>

          {/* DOCUMENTS */}

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
              Documents Required
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
                "PAN Card",
                "Aadhaar Card",
                "Form 16",
                "Salary Slips",
                "Bank Statements",
                "Investment Proofs",
              ].map((item, index) => (

                <div
                  key={index}
                  className="premium-white-card"
                >
                  {item}
                </div>

              ))}

            </div>

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
                "Avoid penalties",
                "Claim tax refunds",
                "Better financial records",
                "Useful for visa applications",
                "Faster loan approvals",
                "Professional compliance",
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
              Risks of Not Filing
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
                "Income tax notices",
                "Penalties & interest",
                "Loan rejection issues",
                "Legal complications",
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