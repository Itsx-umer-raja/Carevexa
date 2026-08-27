"use client";
import { ArrowRight } from "lucide-react";
import { RippleBackground } from "./RippleBackground";
import { AppMockup } from "./AppMockup";
import { DownloadButton } from "./DownloadButton";
import { GooeyTextReveal } from "./GooeyTextReveal";
import { Reveal } from "./Reveal";
import { APP_CONFIG } from "@/config";

export function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-16">
      {/* Living WebGL backdrop (adapted ripple slider) */}
      <RippleBackground className="opacity-60" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-950/40 via-ink-950/55 to-ink-950" />

      <div className="container-x relative z-10 grid items-center gap-12 lg:grid-cols-2">
        {/* Copy */}
        <div>
          <Reveal>
            <span className="eyebrow mb-6">Lightweight · Calm · Windows</span>
          </Reveal>

          <GooeyTextReveal
            mode="immediate"
            duration={1.4}
            stagger={0.08}
            className="font-display text-4xl font-bold leading-[1.05] text-white sm:text-6xl"
          >
            <h1>
              Protect Your Eyes <span className="accent-text">While You Work.</span>
            </h1>
          </GooeyTextReveal>

          <Reveal delay={0.15}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-mint/75">
              Carevexa is a lightweight Windows eye-care application designed to make everyday screen
              use more comfortable.
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <DownloadButton />
              <a
                href="#features"
                className="glass inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold text-white transition-all hover:border-teal-brand/50 hover:bg-white/[0.06]"
              >
                Explore Features <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.35}>
            <p className="mt-6 text-sm text-mint/50">
              {APP_CONFIG.platform} · Latest version {APP_CONFIG.version}
            </p>
          </Reveal>
        </div>

        {/* App mockup */}
        <Reveal delay={0.2} className="flex justify-center lg:justify-end">
          <AppMockup />
        </Reveal>
      </div>
    </section>
  );
}

export default Hero;
