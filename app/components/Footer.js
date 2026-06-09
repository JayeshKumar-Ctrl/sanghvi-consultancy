import Link from "next/link";
import Image from "next/image";

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
          <Image
                    src="/logo.png"
                    alt="Sanghvi Consultancy"
                    width={110}
                    height={110}
                    className="object-contain"
                    style={{
                      width: "clamp(80px,12vw,125px)",
                      height: "auto",
                    }}
          
          />
          
          <h3
            style={{
              fontSize: "clamp(1.1rem,3vw,1.7rem)",
              lineHeight: "1.3",
              marginTop: "10px",
            }}
          >
            SANGHVI CONSULTANCY SERVICES
          </h3>
          <p
            style={{
              fontSize: "14px",
              fontWeight: "500",
              marginTop: "0px",
              marginLeft: "10px",
            }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Your Trusted Business and Financial Partner
          </p>
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
          <a href="mailto:sanghviconsultancyservices@gmail.com"></a>
          <a href="tel:+918247564764"></a>
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