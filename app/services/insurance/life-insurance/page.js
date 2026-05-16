import Footer from "@/app/components/Footer";

export default function LifeInsurance() {

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
            Life Insurance
          </h1>

          <p
            style={{
              fontSize: "28px",
              lineHeight: "1.8",
              color: "#d8d8d8",
            }}
          >
            Secure your family’s financial future
            with trusted life insurance protection
            and long-term wealth planning.
          </p>

        </div>

        <div
          style={{
            background: "white",
            borderRadius: "35px",
            padding: "70px",
            boxShadow:
              "0 20px 50px rgba(0,0,0,0.08)",
          }}
        >

          <h2
            style={{
              fontSize: "58px",
              color: "#062b1f",
              marginBottom: "25px",
              fontWeight: "800",
            }}
          >
            What is Life Insurance?
          </h2>

          <p
            style={{
              fontSize: "30px",
              lineHeight: "1.8",
              color: "#333",
              marginBottom: "60px",
            }}
          >
            Life Insurance provides financial
            support to family members in case
            of the policyholder’s unfortunate
            death while also helping in wealth
            planning and future security.
          </p>

          <h2
            style={{
              fontSize: "52px",
              color: "#062b1f",
              marginBottom: "30px",
              fontWeight: "800",
            }}
          >
            Coverage Included
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
              "Family Protection",
              "Death Benefits",
              "Child Education Planning",
              "Wealth Creation",
              "Retirement Planning",
              "Tax Saving Benefits",
            ].map((item, index) => (

              <div
                key={index}
                className="premium-white-card"
              >
                {item}
              </div>

            ))}

          </div>

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
              "Financial security",
              "Long-term savings",
              "Tax benefits",
              "Family stability",
              "Retirement support",
              "Peace of mind",
            ].map((item, index) => (

              <div
                key={index}
                className="premium-green-card"
              >
                ✔ {item}
              </div>

            ))}

          </div>

          <h2
            style={{
              fontSize: "52px",
              color: "#062b1f",
              marginBottom: "30px",
              fontWeight: "800",
            }}
          >
            Risks Without Insurance
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
              "Family financial stress",
              "Future uncertainty",
              "Education funding issues",
              "Lack of emergency support",
            ].map((item, index) => (

              <div
                key={index}
                className="premium-risk-card"
              >
                ⚠ {item}
              </div>

            ))}

          </div>

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
              }}
            >
              Book Consultation
            </a>

            <a
              href="https://wa.me/918247564764"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                border: "2px solid #003b2f",
                color: "#003b2f",
                padding: "18px 42px",
                borderRadius: "50px",
                textDecoration: "none",
                fontSize: "20px",
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