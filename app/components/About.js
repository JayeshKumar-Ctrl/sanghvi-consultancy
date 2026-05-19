export default function About() {

  return (

    <section
      id="about"
      className="about"
      style={{
        padding: "100px 0",
        background: "#d8cfbd",
      }}
    >

      <div
        className="about-container"
        style={{
          width: "90%",
          maxWidth: "1400px",
          margin: "auto",
          display: "grid",
          gridTemplateColumns:
            "1.1fr 1fr",
          gap: "70px",
          alignItems: "start",
        }}
      >

        {/* LEFT CONTENT */}

        <div className="about-text">

          <p
            style={{
              fontSize: "24px",
              lineHeight: "1.8",
              color: "#404040",
              marginBottom: "35px",
            }}
          >
            Sanghvi Consultancy Services is
            a trusted advisory and consulting
            firm operating under the guidance
            of a qualified Chartered Accountant.
            We specialize in delivering
            <strong>
              {" "}
              strategic financial solutions,
              compliance support, taxation,
              auditing, investment planning,
              and business advisory services
            </strong>
            {" "}tailored for individuals,
            startups, and established
            enterprises.
          </p>

          {/* EXPERTISE */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(2,minmax(220px,1fr))",
              gap: "18px",
              marginBottom: "40px",
            }}
          >

            {[
              "Accounting & Auditing",
              "Taxation & Compliance",
              "Investment Planning",
              "Business Advisory",
              "AI-Powered Accounting",
              "Startup Consultancy",
            ].map((item, index) => (

              <div
                key={index}
                style={{
                  background:
                    "linear-gradient(135deg,#062b1f,#00150f)",

                  color: "white",

                  padding: "18px 22px",

                  borderRadius: "18px",

                  fontSize: "18px",

                  fontWeight: "600",

                  boxShadow:
                    "0 10px 25px rgba(0,0,0,0.08)",
                }}
              >
                ✔ {item}
              </div>

            ))}

          </div>

        </div>

        {/* RIGHT IMAGE */}

        <div className="about-image">

          <img
            src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1200"
            alt="office"
            style={{
              width: "100%",
              height:"72vh",
              borderRadius: "35px",
              objectFit: "cover",
              boxShadow:
                "0 25px 60px rgba(0,0,0,0.18)",
            }}
          />

        </div>

      </div>

    </section>

  );

}