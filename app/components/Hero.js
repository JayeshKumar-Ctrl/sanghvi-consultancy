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

          <h1 className="hero-title">
            Commitment
          </h1>

          <p className="hero-desc">
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
            loading="lazy"
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
          <h2>16+</h2>
          <p>Years of Experience</p>
        </div>

      </div>

    </section>
  );
}