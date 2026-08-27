"use client";
import { MonitorCheck, Info } from "lucide-react";
import { DownloadButton } from "./DownloadButton";
import { GooeyTextReveal } from "./GooeyTextReveal";
import { Reveal } from "./Reveal";
import { APP_CONFIG } from "@/config";

export function DownloadSection() {
  return (
    <section id="download" className="relative py-24 sm:py-32">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-3xl border border-teal-brand/20 bg-gradient-to-b from-ink-800/60 to-ink-900/60 px-6 py-16 text-center shadow-card sm:px-12">
          <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-teal-brand/20 blur-3xl" />

          <div className="relative mx-auto max-w-2xl">
            <Reveal>
              <span className="eyebrow mb-5">Download</span>
            </Reveal>
            <GooeyTextReveal mode="scroll" className="font-display text-3xl font-bold text-white sm:text-5xl">
              <h2>Get Carevexa for Windows</h2>
            </GooeyTextReveal>

            <Reveal delay={0.1}>
              <p className="mt-4 text-mint/70">
                Free download · {APP_CONFIG.platform} · Latest version {APP_CONFIG.version}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-9 flex justify-center">
                <DownloadButton className="px-8 py-4 text-lg" />
              </div>
            </Reveal>

            {/* Manual fallback */}
            <Reveal delay={0.2}>
              <div className="mx-auto mt-8 max-w-md rounded-xl border border-white/10 bg-white/[0.02] p-5 text-sm">
                <p className="font-medium text-white">Download doesn't start automatically?</p>
                <p className="mt-1 text-mint/70">
                  Click here to{" "}
                  <a
                    href={APP_CONFIG.manualUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-teal-brand underline underline-offset-4 hover:text-teal-soft"
                  >
                    start the download manually
                  </a>
                  .
                </p>
                <div className="mt-4 flex items-center justify-center gap-4 text-xs text-mint/55">
                  <span className="inline-flex items-center gap-1.5">
                    <MonitorCheck className="h-4 w-4 text-teal-brand" /> Windows 10 / Windows 11
                  </span>
                  <span className="h-3 w-px bg-white/15" />
                  <span>Latest Version: {APP_CONFIG.version}</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <p className="mx-auto mt-6 flex max-w-md items-start gap-2 text-left text-xs text-mint/40">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span>
                  Google Drive may show a confirmation page for some files. If your browser asks you
                  to confirm, use the manual link above to continue the download.
                </span>
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DownloadSection;
