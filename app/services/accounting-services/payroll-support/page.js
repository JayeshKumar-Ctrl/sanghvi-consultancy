"use client";

import Footer from "@/app/components/Footer";

export default function PayrollSupportPage() {

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
            Payroll Support
          </h1>

          <p
            style={{
              fontSize: "clamp(1rem,3vw,28px)",
              lineHeight: "1.8",
              color: "#d8d8d8",
              maxWidth: "1000px",
            }}
          >
            Professional payroll management
            services for businesses and startups
            including salary processing,
            employee records, PF, ESI and
            payroll compliance support.
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
              What is Payroll Support?
            </h2>

            <p
              style={{
                fontSize: "clamp(1rem,3vw,24px)",
                lineHeight: "1.8",
                color: "#333",
              }}
            >
              Payroll Support helps businesses
              manage employee salaries,
              deductions, attendance, bonuses,
              PF, ESI and statutory payroll
              compliance efficiently and
              accurately.
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
                "Accurate salary processing",
                "Timely employee payments",
                "PF & ESI compliance",
                "Reduced payroll mistakes",
                "Better employee management",
                "Professional payroll records",
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
              Risks Without Payroll Support
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
                "Salary calculation errors",
                "Employee dissatisfaction",
                "Compliance penalties",
                "Payroll delays",
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

                padding: "clamp(14px,3vw,22px) clamp(24px,5vw,48px)",

                borderRadius: "60px",

                textDecoration: "none",

                fontSize:  "clamp(1rem,3vw,22px)",

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

                borderRadius: "60px",

                textDecoration: "none",

                fontSize:  "clamp(1rem,3vw,22px)",

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