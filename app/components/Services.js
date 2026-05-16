"use client";

import Link from "next/link";

import {
  Calculator,
  BookOpen,
  TrendingUp,
  ShieldCheck,
  Landmark,
  Building2,
  Scale,
  Cpu,
  Rocket
} from "lucide-react";

const services = [

  {
    id: "01",
    slug: "tax-filing",
    title: "Tax Filing & Planning",
    icon: Calculator,
    items: [
      "Income Tax Returns",
      "TDS/TCS Returns",
      "GST Returns",
      "Tax Planning",
      "Project Reports"
    ]
  },

  {
    id: "02",
    slug: "accounting-services",
    title: "Accounting Services",
    icon: BookOpen,
    items: [
      "Bookkeeping",
      "BS & PL Preparation",
      "Tally Migration",
      "Payroll Support"
    ]
  },

  {
    id: "03",
    slug: "investment",
    title: "Investment Advisory",
    icon: TrendingUp,
    items: [
      "Mutual Funds",
      "PMS / Mini PMS",
      "NCDs",
      "Fixed Deposits",
      "Unlisted Shares",
      "NRI Investments"
    ]
  },

  {
    id: "04",
    slug: "insurance",
    title: "Insurance Solutions",
    icon: ShieldCheck,
    items: [
      "Health Insurance",
      "Life Insurance",
      "Motor Insurance",
      "Term Insurance"
    ]
  },

  {
    id: "05",
    slug: "loan-assistance",
    title: "Loan Assistance",
    icon: Landmark,
    items: [
      "Unsecured Loans",
      "Business Loans",
      "Working Capital Loans",
      "Home Loans"
    ]
  },

  {
    id: "06",
    slug: "business-registration",
    title: "Business Registration",
    icon: Building2,
    items: [
      "GST Registration",
      "Trade License",
      "Labour License",
      "Trademark Registration",
      "PAN Application",
      "TAN Application",
      "Import Export Code"
    ]
  },

  {
    id: "07",
    slug: "compliance",
    title: "Compliance & Legal",
    icon: Scale,
    items: [
      "ROC Compliance",
      "FEMA & RBI Compliance",
      "Annual Filings",
      "Tax Notices & Appeals"
    ]
  },

  {
    id: "08",
    slug: "ai-accounting",
    title: "AI & Digital Accounting",
    icon: Cpu,
    items: [
      "AI Invoice Scanner",
      "Cloud Accounting",
      "Automated Reports",
      "Smart Bookkeeping"
    ]
  },

  {
    id: "09",
    slug: "startup-advisory",
    title: "Startup Advisory",
    icon: Rocket,
    items: [
      "Startup Registration",
      "Business Structuring",
      "Financial Planning",
      "Investor Readiness"
    ]
  },

];

export default function Services() {

  return (

    <section
      id="services"
      className="services"
    >

      <div className="service-grid">

        {services.map((service) => {

          const Icon = service.icon;

          return (

            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >

              <div
                className="service-card"
                style={{
                  cursor: "pointer",
                  height: "520px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >

                <div className="service-top">

                  <div className="icon-box">

                    <Icon className="service-icon" />

                  </div>

                  <span className="service-id">

                    {service.id}

                  </span>

                </div>

                <h3>{service.title}</h3>

                <ul className="service-list">

                  {service.items.map(
                    (item, index) => (

                    <li key={index}>
                      {item}
                    </li>

                  ))}

                </ul>

                <div
                  style={{
                    marginTop: "25px",
                    fontWeight: "600",
                    color: "#f5f5f5",
                    fontSize: "15px",
                  }}
                >

                  View Details →

                </div>

              </div>

            </Link>

          );

        })}

      </div>

    </section>

  );

}