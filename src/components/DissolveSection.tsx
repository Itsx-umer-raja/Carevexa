"use client";
import { ScrollDissolveReveal } from "./ScrollDissolveReveal";

/**
 * Full-bleed scroll storytelling moment: as you scroll, a harsh, glaring
 * screen dissolves into a calm, eye-friendly view — a visual metaphor for
 * what Carevexa is designed to do.
 */
export function DissolveSection() {
  return (
    <section aria-label="From harsh glare to calm comfort" className="relative bg-ink-950">
      <ScrollDissolveReveal />

      {/* Sticky text overlay pinned over the dissolving canvas */}
      <div className="pointer-events-none absolute inset-0">
        <div className="sticky top-0 flex h-screen flex-col items-center justify-center px-6 text-center">
          <span className="eyebrow mb-5">The Carevexa difference</span>
          <h2 className="max-w-3xl font-display text-3xl font-bold leading-tight text-white drop-shadow-[0_2px_20px_rgba(4,16,15,0.9)] sm:text-5xl">
            From harsh glare to <span className="accent-text">calm, comfortable</span> screen time.
          </h2>
          <p className="mt-5 max-w-xl text-mint/80 drop-shadow-[0_2px_12px_rgba(4,16,15,0.9)]">
            Keep scrolling — watch the difference a gentler screen environment can make.
          </p>
        </div>
      </div>
    </section>
  );
}

export default DissolveSection;
