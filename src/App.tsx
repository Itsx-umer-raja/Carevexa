"use client";
import * as React from "react";
import { AnimatePresence } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IntroOverlay } from "./components/IntroOverlay";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Features } from "./components/Features";
import { DissolveSection } from "./components/DissolveSection";
import { HowItWorks } from "./components/HowItWorks";
import { ModesSection } from "./components/ModesSection";
import { DownloadSection } from "./components/DownloadSection";
import { TrustInfo } from "./components/TrustInfo";
import { Footer } from "./components/Footer";

export default function App() {
  const [entered, setEntered] = React.useState(false);

  // Lock scroll while the intro is visible.
  React.useEffect(() => {
    document.body.classList.toggle("intro-lock", !entered);
    return () => document.body.classList.remove("intro-lock");
  }, [entered]);

  const handleEnter = () => {
    setEntered(true);
    // Let the layout settle, then re-measure scroll triggers.
    window.setTimeout(() => {
      window.scrollTo({ top: 0 });
      ScrollTrigger.refresh();
    }, 400);
  };

  return (
    <>
      <AnimatePresence>
        {!entered && <IntroOverlay key="intro" onEnter={handleEnter} />}
      </AnimatePresence>

      <div
        aria-hidden={!entered}
        className={entered ? "opacity-100 transition-opacity duration-700" : "pointer-events-none opacity-0"}
      >
        <Navbar />
        <main>
          <Hero />
          <Features />
          <DissolveSection />
          <HowItWorks />
          <ModesSection />
          <DownloadSection />
          <TrustInfo />
        </main>
        <Footer />
      </div>
    </>
  );
}
