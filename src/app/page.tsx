import { AboutUs } from "@/components/AboutUs";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { WhySenda } from "@/components/WhySenda";
import { Social } from "@/shared/Social";
import stackStyles from "@/styles/Stack.module.css";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Two layers: the hero pins and About Us rides up over it.
            About Us needs an opaque background of its own, which it
            has. The wrapper ends here so the hero stops pinning —
            everything below scrolls normally. */}
        <div className={stackStyles.stack}>
          <Hero />
          <AboutUs />
        </div>
        <Services />
        <WhySenda />
        <Contact />
      </main>
      <Footer />
      <Social />
    </>
  );
}
