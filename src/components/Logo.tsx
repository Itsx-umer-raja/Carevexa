import { cn } from "@/lib/utils";

/** Carevexa wordmark + eye mark. */
export function Logo({ className, showText = true }: { className?: string; showText?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg viewBox="0 0 64 64" className="h-8 w-8 shrink-0" aria-hidden>
        <defs>
          <radialGradient id="logoG" cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor="#5fe0c9" />
            <stop offset="60%" stopColor="#2fd4b5" />
            <stop offset="100%" stopColor="#0f766e" />
          </radialGradient>
        </defs>
        <path
          d="M8 32c6-11 16-17 24-17s18 6 24 17c-6 11-16 17-24 17S14 43 8 32z"
          fill="none"
          stroke="url(#logoG)"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <circle cx="32" cy="32" r="9" fill="url(#logoG)" />
        <circle cx="32" cy="32" r="4" fill="#04100f" />
        <circle cx="35" cy="29" r="1.6" fill="#a7f3e0" />
      </svg>
      {showText && (
        <span className="font-display text-lg font-semibold tracking-tight text-white">Carevexa</span>
      )}
    </span>
  );
}

export default Logo;
