"use client";
import { DiagonalCarousel, type DiagonalCarouselItem } from "./DiagonalCarousel";
import { GooeyTextReveal } from "./GooeyTextReveal";
import { Reveal } from "./Reveal";

const MODES: DiagonalCarouselItem[] = [
  { src: "/img/mode-day.png", title: "Daylight — balanced clarity", alt: "Daylight comfort mode preview" },
  { src: "/img/mode-warm.png", title: "Warm — softer, gentler tones", alt: "Warm comfort mode preview" },
  { src: "/img/mode-night.png", title: "Night — low-light comfort", alt: "Night comfort mode preview" },
  { src: "/img/mode-reading.png", title: "Reading — calm, steady focus", alt: "Reading comfort mode preview" },
];

export function ModesSection() {
  return (
    <section id="modes" className="relative py-24 sm:py-32">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="eyebrow mb-5">Comfort modes</span>
          </Reveal>
          <GooeyTextReveal
            mode="scroll"
            className="font-display text-3xl font-bold text-white sm:text-5xl"
          >
            <h2>A look that fits the moment</h2>
          </GooeyTextReveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-base leading-relaxed text-mint/65">
              Switch between viewing presets to keep the screen easy on your eyes across the day.
              Browse the previews below.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="mx-auto mt-14 h-[520px] max-w-4xl">
            <DiagonalCarousel
              items={MODES}
              loop
              slideSize={280}
              labelClassName="text-mint/80"
              className="text-teal-brand"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default ModesSection;
