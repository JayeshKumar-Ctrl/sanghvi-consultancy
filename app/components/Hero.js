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

          <h1>
            Old-School Discipline.
            <br />
            <span className="italic">
              New-School Tools.
            </span>
          </h1>

          <p className="desc">
            Founded in Hyderabad, Sanghvi Consultancy Services has audited
            family businesses, listed companies and global subsidiaries alike.
            We combine traditional expertise with modern AI-powered tools.
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

      <div className="hero-features">

        <div className="feature-card">
          <div className="icon">✓</div>
          <h3>Senior partner oversight</h3>
          <p>
            Every engagement is reviewed by a qualified Chartered Accountant.
          </p>
        </div>

        <div className="feature-card">
          <div className="icon">₹</div>
          <h3>Transparent fees</h3>
          <p>
            Clear pricing before work begins. No surprises.
          </p>
        </div>

        <div className="feature-card">
          <div className="icon">⚙️</div>
          <h3>In-house tech stack</h3>
          <p>
            Secure cloud tools for documents, reports, and compliance.
          </p>
        </div>

        <div className="feature-card">
          <div className="icon">🌐</div>
          <h3>Language expertise</h3>
          <p>
            Gujarati, Hindi & English support for seamless communication.
          </p>
        </div>

      </div>

      {/* =========================
          SECTION 3
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