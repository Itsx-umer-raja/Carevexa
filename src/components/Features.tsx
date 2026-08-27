"use client";
import { MonitorSmartphone, SunMedium, Feather, SlidersHorizontal } from "lucide-react";
import { GooeyTextReveal } from "./GooeyTextReveal";
import { Reveal } from "./Reveal";

const FEATURES = [
  {
    icon: MonitorSmartphone,
    title: "Eye-Friendly Screen Experience",
    body: "Designed to provide a more comfortable experience during long periods of computer use.",
  },
  {
    icon: SunMedium,
    title: "Blue-Light Management",
    body: "Helps you manage your screen's visual appearance for a more comfortable viewing experience.",
  },
  {
    icon: Feather,
    title: "Lightweight Windows App",
    body: "Designed to run quietly in the background without unnecessary complexity or clutter.",
  },
  {
    icon: SlidersHorizontal,
    title: "Simple Controls",
    body: "A clean interface that makes everyday eye-care controls easy to find and understand.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow mb-5">Features</span>
          </Reveal>
          <GooeyTextReveal
            mode="scroll"
            className="font-display text-3xl font-bold text-white sm:text-5xl"
          >
            <h2>Built around everyday screen comfort</h2>
          </GooeyTextReveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-mint/70">
              A focused set of tools that help make long hours in front of your screen feel a little
              easier — nothing more, nothing you don't need.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <article className="group h-full rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-teal-brand/40 hover:bg-white/[0.04] hover:shadow-glow">
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl border border-teal-brand/20 bg-teal-brand/10 text-teal-brand transition-transform duration-300 group-hover:scale-110">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mint/65">{f.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-10 max-w-2xl text-center text-xs text-mint/40">
            Feature descriptions are placeholders you can edit to match what Carevexa actually does.
            Carevexa is a software utility and is not a medical device or a substitute for
            professional eye care.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export default Features;
