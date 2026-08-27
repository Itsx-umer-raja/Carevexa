"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Coords = { x: number; y: number };

interface EnterButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  coverClassName?: string;
}

/**
 * Animated "Enter" button — adapted from the provided CreepyButton.
 * Restyled with an eye-care teal identity: living eyes that track the cursor
 * (a wink to the product), a springy tilting cover, and a soft glow.
 */
export const EnterButton = ({
  children,
  className,
  coverClassName,
  onClick,
  ...props
}: EnterButtonProps) => {
  const eyesRef = useRef<HTMLSpanElement>(null);
  const [eye, setEye] = useState<Coords>({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const updateEyes = (e: React.MouseEvent | React.TouchEvent) => {
    const src = "touches" in e ? e.touches[0] : (e as React.MouseEvent);
    if (!eyesRef.current || !src) return;
    const r = eyesRef.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = src.clientX - cx;
    const dy = src.clientY - cy;
    const angle = Math.atan2(-dy, dx) + Math.PI / 2;
    const rangeX = 180;
    const rangeY = 75;
    const dist = Math.hypot(dx, dy);
    setEye({
      x: (Math.sin(angle) * Math.min(dist, rangeX)) / rangeX,
      y: (Math.cos(angle) * Math.min(dist, rangeY)) / rangeY,
    });
  };

  const reset = () => {
    setEye({ x: 0, y: 0 });
    setHovered(false);
  };

  const pupil = {
    transform: `translate(calc(-50% + ${eye.x * 50}%), calc(-50% + ${eye.y * 50}%))`,
  };

  return (
    <button
      className={cn(
        "relative min-w-[11em] rounded-2xl bg-ink-950 text-[1.05rem] cursor-pointer outline-none select-none group",
        "shadow-[0_0_50px_-12px_rgba(47,212,181,0.7)]",
        className
      )}
      onClick={onClick}
      onMouseMove={(e) => {
        updateEyes(e);
        setHovered(true);
      }}
      onTouchMove={updateEyes}
      onMouseLeave={reset}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      {...props}
    >
      {/* Eyes */}
      <span
        ref={eyesRef}
        className="absolute z-0 flex items-center gap-[0.4em] right-[1.05em] bottom-[0.55em] h-[0.8em] pointer-events-none"
      >
        {[0, 1].map((i) => (
          <motion.span
            key={i}
            className="relative w-[0.8em] bg-white rounded-full overflow-hidden"
            animate={{ height: ["0.8em", "0.8em", "0em", "0.8em"] }}
            transition={{ duration: 3.4, times: [0, 0.92, 0.96, 1], repeat: Infinity, ease: "linear" }}
          >
            <span
              className="absolute top-1/2 left-1/2 w-[0.4em] h-[0.4em] bg-ink-950 rounded-full transition-transform duration-75 ease-out"
              style={pupil}
            />
          </motion.span>
        ))}
      </span>

      {/* Cover */}
      <motion.span
        className={cn(
          "absolute inset-0 flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5",
          "bg-gradient-to-br from-teal-soft via-teal-brand to-teal-deep text-ink-950 font-semibold tracking-wide",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.5),inset_0_0_0_1px_rgba(4,16,15,0.25)]",
          "origin-[1.3em_50%]",
          coverClassName
        )}
        animate={{ rotate: hovered ? -11 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 18, mass: 0.8 }}
      >
        {children}
      </motion.span>

      {/* size placeholder */}
      <span className="block opacity-0 px-6 py-3.5 font-semibold tracking-wide min-w-[11em]">{children}</span>
    </button>
  );
};

export default EnterButton;
