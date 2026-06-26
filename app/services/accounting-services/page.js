"use client";

import Link from "next/link";
import Footer from "@/app/components/Footer";

export default function AccountingServices() {

  const services = [

    {
      title: "Bookkeeping",
      link: "/services/accounting-services/bookkeeping",
    },

    {
      title: "BS & PL Preparation",
      link: "/services/accounting-services/bs-pl-preparation",
    },

    {
      title: "Tally Migration",
      link: "/services/accounting-services/tally-migration",
    },

    {
      title: "Payroll Support",
      link: "/services/accounting-services/payroll-support",
    },

  ];

  return (

    <div
      style={{
        background: "#d9d0bf",
        minHeight: "100vh",
      }}
    >

      <div
        style={{
          maxWidth: "1250px",
          margin: "0 auto",
          padding: "clamp(90px,12vw,130px) 20px clamp(50px,8vw,80px)",
        }}
      >

        {/* HEADING */}

        <h1
          style={{
            fontSize: "clamp(2.2rem, 8vw, 64px)",
            fontWeight: "800",
            color: "#062b1f",
            marginBottom: "25px",
            lineHeight: "1.2",
            overflowWrap: "anywhere",
            letterSpacing: "-0.03em",
          }}
        >
          Accounting Services
        </h1>

        <p
          style={{
            fontSize: "clamp(1rem, 3vw, 22px)",
            lineHeight: "1.8",
            color: "#3b3b3b",
            maxWidth: "950px",
            marginBottom: "70px",
          }}
        >
          Professional accounting and bookkeeping
          solutions for startups, businesses,
          firms and growing enterprises with
          modern financial management support.
        </p>

        {/* SERVICES INCLUDED */}

        <div
          style={{
            background:
              "linear-gradient(135deg,#062b1f,#00150f)",

            borderRadius: "35px",

            padding: "clamp(20px,4vw,40px)",

            color: "white",

            marginBottom: "70px",

            boxShadow:
              "0 20px 60px rgba(0,0,0,0.18)",
          }}
        >

          <h2
            style={{
              fontSize: "clamp(2rem, 6vw, 46px)",
              lineHeight: "1.2",
              marginBottom: "40px",
              fontWeight: "800",
            }}
          >
            Services Included
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "22px",
            }}
          >

            {services.map((service, index) => (

              <Link
                key={index}
                href={service.link}
                style={{
                  textDecoration: "none",
                }}
              >

                <div className="premium-service-box">

                  <span>
                    ✅ {service.title}
                  </span>

                  <span>
                    →
                  </span>

                </div>

              </Link>

            ))}

          </div>

        </div>

        {/* ABOUT SECTION */}

        <div
          style={{
            background: "white",

            borderRadius: "35px",

            padding: "clamp(24px,5vw,60px)",

            marginTop: "70px",

            boxShadow:
              "0 20px 50px rgba(0,0,0,0.08)",

            border:
              "1px solid rgba(0,0,0,0.05)",
          }}
        >

          {/* WHAT IS THIS */}

          <div
            style={{
              marginBottom: "60px",
            }}
          >

            <h2
              style={{
                fontSize: "clamp(2rem, 7vw, 48px)",
                fontWeight: "800",
                color: "#062b1f",
                marginBottom: "25px",
                lineHeight: "1.2",
                overflowWrap: "anywhere",
              }}
            >
              What are Accounting Services?
            </h2>

            <p
              style={{
                fontSize:"clamp(1rem, 4vw, 32px)",
                lineHeight: "1.8",
                overflowWrap: "anywhere",
                color: "#3b3b3b",
              }}
            >
              Accounting Services help businesses,
              startups and professionals maintain
              financial records, manage transactions,
              prepare reports and ensure proper
              financial compliance and growth.
            </p>

          </div>

          {/* WHY REQUIRED */}

          <div
            style={{
              marginBottom: "60px",
            }}
          >

            <h2
              style={{
                fontSize: "clamp(2rem, 8vw, 58px)",
                lineHeight: "1.2",
                fontWeight: "800",
                color: "#062b1f",
                marginBottom: "30px",
              }}
            >
              Why is it Required?
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "22px",
              }}
            >

              {[
                "Maintains accurate financial records",
                "Helps in taxation and GST filing",
                "Improves business decisions",
                "Tracks profits and losses properly",
                "Supports business growth and audits",
              ].map((item, index) => (

                <div
                  key={index}
                  style={{
                    background: "#f7f7f7",
                    padding: "24px 28px",
                    borderRadius: "18px",
                    fontSize: "clamp(1rem, 4vw, 28px)",
                    fontWeight: "600",
                    color: "#222",
                    lineHeight: "1.5",
                    overflowWrap: "anywhere",
                  }}
                >
                  • {item}
                </div>

              ))}

            </div>

          </div>

          {/* WHO NEEDS THIS */}

          <div>

            <h2
              style={{
                fontSize: "clamp(1rem, 5vw, 48px)",
                fontWeight: "800",
                color: "#062b1f",
                marginBottom: "30px",
              }}
            >
              Who Needs This?
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(180px,1fr))",
                gap: "24px",
              }}
            >

              {[
                "Business Owners",
                "Startups",
                "Freelancers",
                "Retail Shops",
                "Companies",
                "Professionals",
              ].map((item, index) => (

                <div
                  key={index}
                  style={{
                    background:
                      "linear-gradient(135deg,#062b1f,#00150f)",

                    color: "white",

                    padding: "20px",

                    borderRadius: "22px",

                    fontSize: "clamp(1rem, 4vw, 28px)",

                    lineHeight: "1.4",

                    overflowWrap: "anywhere",

                    fontWeight: "700",

                    textAlign: "center",

                    boxShadow:
                      "0 12px 30px rgba(0,0,0,0.12)",
                  }}
                >
                  {item}
                </div>

              ))}

            </div>

          </div>

        </div>

        {/* BUTTONS */}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "25px",
            marginTop: "90px",
            marginBottom: "40px",
            flexWrap: "wrap",
          }}
        >

          <Link
            href="/book-consultation"
            style={{
              background:
                "linear-gradient(135deg,#003b2f,#001f1a)",

              color: "white",

              padding: "clamp(14px,3vw,20px) clamp(24px,5vw,46px)",

              borderRadius: "60px",

              textDecoration: "none",

              fontSize: "clamp(1rem, 3vw, 22px)",

              fontWeight: "700",

              boxShadow:
                "0 15px 40px rgba(0,0,0,0.15)",

              textAlign: "center",

            }}
          >
            Book Consultation
          </Link>

          <a
            href="https://wa.me/918247564764"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              border: "2px solid #062b1f",

              color: "#062b1f",

              padding: "clamp(14px,3vw,20px) clamp(24px,5vw,46px)",

              borderRadius: "60px",

              textDecoration: "none",

              fontSize: "clamp(1rem, 3vw, 22px)",

              fontWeight: "700",
            }}
          >
            WhatsApp Now
          </a>

        </div>

      </div>

      <Footer />

    </div>

  );

}