import Header from "./sections/Header";
import Hero from "./sections/Hero";
import Features from "./sections/Features";
import Community from "./sections/Community";
import HowItWorks from "./sections/HowItWorks";
import Personas from "./sections/Personas";
import Business from "./sections/Business";
import FAQ from "./sections/FAQ";
import Download from "./sections/Download";
import Footer from "./sections/Footer";

export default function App() {
  return (
    <div className="min-h-full flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <Community />
        <HowItWorks />
        <Personas />
        <Business />
        <FAQ />
        <Download />
      </main>
      <Footer />
    </div>
  );
}
