export default function About() {

  return (

    <section
      id="about"
      className="about"
      style={{
        padding: "clamp(50px,8vw,100px) 0",
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
            "repeat(auto-fit,minmax(320px,1fr))",
          gap: "clamp(25px,4vw,70px)",
          alignItems: "start",
        }}
      >

        {/* LEFT CONTENT */}

        <div className="about-text">

          <p
            style={{
              fontSize: "clamp(1rem,2vw,24px)",
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
                "repeat(auto-fit,minmax(180px,1fr))",
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

                  fontSize: "clamp(0.95rem,2vw,18px)",

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
              height:"auto",
              maxHeight:"700px",
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