"use client";

export default function Hero() {
  return (
    <section id="home" className="hero-wrapper">

      {/* =========================
          SECTION 1
      ========================== */}

      <div className="hero-top">

        {/* LEFT TEXT */}
        <div className="hero-text">

          <h1
            style={{
              fontSize: "5.2rem",
              lineHeight: "1.1",
              fontWeight: "800",
              color: "#111",
              marginBottom: "30px",
            }}
          >
            Commitment
          </h1>

          <p
            className="desc"
            style={{
              fontSize: "2rem",
              lineHeight: "1.8",
              color: "#4a4a4a",
              maxWidth: "850px",
              fontWeight: "500",
            }}
          >
            We combine technical expertise with clear communication,
            empowering clients to make informed decisions with confidence.
            We uphold the highest level of professionalism and reliability
            in every engagement.
          </p>

        </div>

        {/* RIGHT SMALL IMAGE */}
        <div className="hero-small-image-box">

          <img
            src="/finance-dashboard.png"
            alt="Finance Premium"
            className="hero-small-image"
          />

        </div>

      </div>

      {/* =========================
          SECTION 2
      ========================== */}

      <div className="hero-big-image-box">

        <img
          src="/Accounting Team.jpeg"
          alt="Team"
          className="hero-big-image"
        />
        <div className="floating-card">
          <h2>98%</h2>
          <p>Client retention rate</p>
        </div>

      </div>

    </section>
  );
}