export default function About() {
  return (
    <section id="about" className="about">

      <div className="about-container">

        {/* LEFT TEXT */}
        <div className="about-text">
          {/*<p className="small">04 — ABOUT THE FIRM</p>*/}

          <p className="desc">
            Sanghvi Consultancy Services blends decades of Chartered Accountancy 
            experience with modern AI-powered tools. From audits and taxation 
            to smart bookkeeping, we help businesses stay compliant, efficient, 
            and future-ready.
          </p>

          <div className="about-points">
            <div className="point">✔<strong>25+</strong> years experience</div>
            <div className="point">✔<strong>1200+</strong> clients served</div>
            <div className="point">✔ AI-powered accounting</div>
            <div className="point">✔ Gujarat-based expertise</div>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1556761175-b413da4baf72"
            alt="office"
          />
        </div>

      </div>

    </section>
  );
}