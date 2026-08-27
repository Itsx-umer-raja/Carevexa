"use client";
import { Reveal } from "./Reveal";
import { APP_CONFIG } from "@/config";

const INFO = [
  { label: "Application", value: "Carevexa" },
  { label: "Type", value: "Windows Desktop Application" },
  { label: "Version", value: APP_CONFIG.version },
  { label: "Platform", value: APP_CONFIG.platform },
  { label: "License", value: APP_CONFIG.license },
  { label: "Developer", value: APP_CONFIG.developer },
];

const REQS = [
  "Windows 10 or later",
  "A compatible Windows PC",
  "Internet connection required to download the installer",
];

export function TrustInfo() {
  return (
    <section id="info" className="relative py-24 sm:py-32">
      <div className="container-x grid gap-6 lg:grid-cols-2">
        {/* Software information */}
        <Reveal>
          <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-8">
            <h2 className="text-2xl font-semibold text-white">Software information</h2>
            <p className="mt-2 text-sm text-mint/60">Straightforward details about the application.</p>
            <dl className="mt-6 divide-y divide-white/5">
              {INFO.map((row) => (
                <div key={row.label} className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-sm text-mint/55">{row.label}</dt>
                  <dd className="text-sm font-medium text-white">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>

        {/* System requirements */}
        <Reveal delay={0.1}>
          <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-8">
            <h2 className="text-2xl font-semibold text-white">System requirements</h2>
            <p className="mt-2 text-sm text-mint/60">What you need to run Carevexa.</p>
            <ul className="mt-6 space-y-3">
              {REQS.map((r) => (
                <li key={r} className="flex items-start gap-3 text-sm text-mint/80">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-brand" />
                  {r}
                </li>
              ))}
            </ul>
            <p className="mt-8 rounded-xl border border-white/10 bg-ink-900/60 p-4 text-xs leading-relaxed text-mint/50">
              Carevexa is a software utility and is not a medical device or a substitute for
              professional eye care. It is designed to make everyday screen use more comfortable.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default TrustInfo;
