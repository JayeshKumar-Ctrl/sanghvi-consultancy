import Footer from "@/app/components/Footer";

export default function PANApplication() {

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

            padding:  "clamp(24px,6vw,80px)",

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
            PAN Application
          </h1>

          <p
            style={{
              fontSize: "clamp(1rem,3vw,28px)",
              lineHeight: "1.8",
              color: "#d8d8d8",
            }}
          >
            Professional PAN application
            assistance for individuals,
            businesses and firms with fast
            processing and smooth documentation
            support.
          </p>

        </div>

        {/* CONTENT */}

        <div
          style={{
            background: "white",

            borderRadius: "24px",

            padding: "clamp(24px,5vw,70px)",

            boxShadow:
              "0 20px 50px rgba(0,0,0,0.08)",
          }}
        >

          <h2
            style={{
              fontSize: "clamp(2rem,6vw,52px)",
              color: "#062b1f",
              marginBottom: "25px",
              fontWeight: "800",
            }}
          >
            What is PAN Application?
          </h2>

          <p
            style={{
              fontSize: "clamp(1rem,3vw,24px)",
              lineHeight: "1.8",
              color: "#333",
              marginBottom: "60px",
            }}
          >
            PAN Application is the process of
            obtaining a Permanent Account Number
            issued by the Income Tax Department
            for taxation, banking and financial
            transactions.
          </p>

          {/* FEATURES */}

          <h2
            style={{
              fontSize: "clamp(2rem,6vw,52px)",
              color: "#062b1f",
              marginBottom: "30px",
              fontWeight: "800",
            }}
          >
            Application Features
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
              "Online PAN Processing",
              "Fast Application Support",
              "Professional Documentation",
              "Income Tax Compliance",
              "Identity Verification",
              "Correction & Update Support",
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
              "Required for banking",
              "Income tax filing support",
              "Financial transaction approval",
              "Business registration support",
              "Government compliance",
              "Identity proof benefits",
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
            Risks Without PAN
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
              "Banking restrictions",
              "Tax filing issues",
              "Financial transaction delays",
              "Compliance problems",
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