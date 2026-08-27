"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { EnterButton } from "./EnterButton";
import { GooeyTextReveal } from "./GooeyTextReveal";
import { APP_CONFIG } from "@/config";

/**
 * Cinematic landing overlay: the futuristic figure video plays behind an
 * animated title and an Enter button. The user chooses sound on / off,
 * then enters the site.
 */
export function IntroOverlay({ onEnter }: { onEnter: (withSound: boolean) => void }) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = React.useState(true);

  const enter = (withSound: boolean) => onEnter(withSound);

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center overflow-hidden bg-ink-950"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(12px)" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Video background */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover opacity-70"
        src="/intro.mp4"
        autoPlay
        loop
        muted={muted}
        playsInline
        aria-hidden
      />
      {/* Tint + vignette for legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/40 to-ink-950/90" />
      <div className="absolute inset-0 [background:radial-gradient(circle_at_center,transparent_35%,rgba(4,16,15,0.85))]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <span className="eyebrow mb-6 animate-floaty">Eye Care · Windows</span>

        <GooeyTextReveal
          mode="immediate"
          duration={1.6}
          stagger={0.12}
          className="font-display text-6xl font-bold leading-none text-white sm:text-8xl"
        >
          <span className="accent-text">Carevexa</span>
        </GooeyTextReveal>

        <GooeyTextReveal
          mode="immediate"
          delay={0.35}
          duration={1.4}
          className="mt-6 max-w-xl text-base text-mint/80 sm:text-lg"
        >
          <p>{APP_CONFIG.tagline}</p>
        </GooeyTextReveal>

        <motion.div
          className="mt-12 flex flex-col items-center gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8, ease: "easeOut" }}
        >
          <EnterButton onClick={() => enter(!muted)} aria-label="Enter Carevexa">
            Enter
          </EnterButton>

          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            className="inline-flex items-center gap-2 text-sm text-mint/60 transition-colors hover:text-white"
          >
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            {muted ? "Sound off" : "Sound on"}
          </button>

          <button
            type="button"
            onClick={() => enter(false)}
            className="text-xs uppercase tracking-[0.25em] text-mint/40 underline-offset-4 transition-colors hover:text-mint/80 hover:underline"
          >
            Enter without sound
          </button>
        </motion.div>
      </div>

      {/* Scroll/loading hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[0.7rem] uppercase tracking-[0.3em] text-mint/40">
        A calmer way to look at your screen
      </div>
    </motion.div>
  );
}

export default IntroOverlay;
