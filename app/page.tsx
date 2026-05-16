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
      <Services />
      <SIPCalculator />
      <Scanner />
      <Stats />
      <About />
      <Footer />
    </main>
  );
}