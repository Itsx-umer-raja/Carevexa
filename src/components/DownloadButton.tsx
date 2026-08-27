"use client";
import * as React from "react";
import { Download, Loader2 } from "lucide-react";
import { APP_CONFIG } from "@/config";
import { cn } from "@/lib/utils";

/**
 * The single download action for the whole site.
 * Attempts the direct Google-Drive download, shows a short "Preparing…" state,
 * and never fakes progress. The manual fallback link lives in DownloadSection.
 */
export function DownloadButton({
  className,
  label = "Download for Windows",
  variant = "primary",
  showIcon = true,
}: {
  className?: string;
  label?: string;
  variant?: "primary" | "ghost";
  showIcon?: boolean;
}) {
  const [preparing, setPreparing] = React.useState(false);

  const start = () => {
    if (preparing) return;
    setPreparing(true);
    // Trigger the download in a new tab so the site stays put.
    const a = document.createElement("a");
    a.href = APP_CONFIG.downloadUrl;
    a.rel = "noopener";
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.setTimeout(() => setPreparing(false), 2600);
  };

  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold tracking-wide transition-all duration-200 focus-visible:outline-none disabled:opacity-80";
  const styles =
    variant === "primary"
      ? "bg-gradient-to-br from-teal-soft via-teal-brand to-teal-deep text-ink-950 shadow-glow hover:shadow-[0_0_60px_-10px_rgba(47,212,181,0.85)] hover:-translate-y-0.5"
      : "glass text-white hover:border-teal-brand/50 hover:bg-white/[0.06]";

  return (
    <button
      type="button"
      onClick={start}
      disabled={preparing}
      aria-live="polite"
      className={cn(base, styles, className)}
    >
      {preparing ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
          Preparing your download…
        </>
      ) : (
        <>
          {showIcon && <Download className="h-5 w-5" aria-hidden />}
          {label}
        </>
      )}
    </button>
  );
}

export default DownloadButton;
