import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SIPCalculator from "./components/SIPCalculator";
import Stats from "./components/Stats";
import Services from "./components/Services";
import Scanner from "./components/Scanner";
import Footer from "./components/Footer";
import About from "./components/About";
import NewsSection from "./components/NewsSection";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <NewsSection />
      {/* SERVICES HEADING */}
      <div
        style={{
          width: "90%",
          maxWidth: "1400px",
          margin: "0 auto 30px auto",
        }}
      >

        <h1
          style={{
            fontSize: "clamp(36px, 8vw, 72px)",
            fontWeight: "800",
            color: "#062b1f",
            marginBottom: "20px",
            lineHeight: "1.1",
          }}
        >
          Services
        </h1>

        <p
          style={{
            fontSize: "clamp(16px, 3vw, 28px)",
            color: "#4a4a4a",
            lineHeight: "1.8",
            maxWidth: "900px",
          }}
        >
          Professional financial, taxation, compliance and advisory services designed for individuals, startups and growing businesses.
        </p>
      </div>
      <Services />
      <SIPCalculator />
      <Scanner />
      <Stats />
      <About />
      <Footer />
    </main>
  );
}