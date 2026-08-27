"use client";
import { DownloadCloud, PackageOpen, PlayCircle } from "lucide-react";
import { GooeyTextReveal } from "./GooeyTextReveal";
import { Reveal } from "./Reveal";

const STEPS = [
  { n: "01", icon: DownloadCloud, title: "Download", body: "Download Carevexa for Windows using the button below." },
  { n: "02", icon: PackageOpen, title: "Install", body: "Run the installer and follow the on-screen installation instructions." },
  { n: "03", icon: PlayCircle, title: "Use", body: "Launch Carevexa and configure the available eye-care features." },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative py-24 sm:py-32">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow mb-5">How it works</span>
          </Reveal>
          <GooeyTextReveal mode="scroll" className="font-display text-3xl font-bold text-white sm:text-5xl">
            <h2>Up and running in three steps</h2>
          </GooeyTextReveal>
        </div>

        <div className="relative mt-16 grid gap-6 md:grid-cols-3">
          {/* connecting line */}
          <div className="absolute left-0 right-0 top-16 hidden h-px bg-gradient-to-r from-transparent via-teal-brand/30 to-transparent md:block" />
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <div className="relative h-full rounded-2xl border border-white/10 bg-white/[0.02] p-7 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-teal-brand/20 bg-ink-900 text-teal-brand shadow-glow">
                  <s.icon className="h-7 w-7" />
                </div>
                <div className="mt-5 font-display text-sm font-semibold tracking-[0.3em] text-teal-brand/70">
                  {s.n}
                </div>
                <h3 className="mt-1 text-xl font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mint/65">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
