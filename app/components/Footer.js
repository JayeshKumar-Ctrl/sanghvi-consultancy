import Link from "next/link";
export default function Footer() {
  return (
    <footer id="contact" className="footer">

      {/* CTA */}
      <Link href="/book-consultation" className="footer-cta">
        Discuss Your Engagement →
      </Link>

      {/* FOOTER CONTENT */}
      <div className="footer-grid">

        {/* LEFT */}
        <div>
          <h2 className="footer-logo">SCS</h2>
          <h3>SANGHVI CONSULTANCY SERVICES</h3>
          <p className="footer-sub">Chartered Accountants</p>

          <p className="footer-desc">
            Modern Chartered Accountancy for businesses that move fast.
            Audit, tax, advisory, and AI-assisted bookkeeping — all under one trusted roof.
          </p>
        </div>

        {/* CENTER */}
        <div className="footer-links">

          <h4>NAVIGATE</h4>

          <a href="/#home">Home</a>

          <a href="/#services">Services</a>

          <a href="/#sip">SIP Calculator</a>

          <a href="/#scanner">AI Scanner</a>

          <a href="/#about">About</a>

          <a href="/#contact">Contact</a>

        </div>

        {/* RIGHT */}
        <div>
          <p className="footer-heading">REACH US</p>
          <p>sanghviconsultancyservices@gmail.com</p>
          <p>+91 8247564764</p>
          <p>Secunderabad, Telangana</p>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="footer-bottom-line">
        © 2009 Sanghvi Consultancy Services
      </div>

    </footer>
  );
}