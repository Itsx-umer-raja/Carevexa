"use client";
import type { ReactNode } from "react";
import { Eye, ShieldCheck, SunMedium, Timer, Settings, Minus, Square, X } from "lucide-react";

/**
 * Illustrative HTML/CSS mockup of the Carevexa desktop app.
 * NOTE: This is a visual placeholder to convey the concept — it does not
 * claim these exact features are implemented. Edit freely to match the app.
 */
export function AppMockup() {
  return (
    <div className="relative w-full max-w-lg animate-floaty">
      {/* glow */}
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-teal-brand/20 blur-3xl" aria-hidden />

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink-900/90 shadow-card backdrop-blur-xl">
        {/* window bar */}
        <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-3">
          <div className="flex items-center gap-2 text-sm font-medium text-white">
            <Eye className="h-4 w-4 text-teal-brand" />
            Carevexa
          </div>
          <div className="flex items-center gap-3 text-mint/40">
            <Minus className="h-3.5 w-3.5" />
            <Square className="h-3 w-3" />
            <X className="h-3.5 w-3.5" />
          </div>
        </div>

        {/* body */}
        <div className="space-y-4 p-5">
          {/* status hero */}
          <div className="flex items-center gap-4 rounded-xl border border-teal-brand/20 bg-teal-brand/5 p-4">
            <div className="relative grid h-14 w-14 place-items-center rounded-full bg-teal-brand/15">
              <span className="absolute inset-0 animate-pulseRing rounded-full ring-2 ring-teal-brand/40" />
              <ShieldCheck className="h-6 w-6 text-teal-brand" />
            </div>
            <div>
              <p className="text-sm text-mint/60">Eye-care status</p>
              <p className="text-lg font-semibold text-white">Active &amp; Comfortable</p>
            </div>
          </div>

          {/* metric grid */}
          <div className="grid grid-cols-2 gap-3">
            <MetricCard icon={<SunMedium className="h-4 w-4" />} label="Blue-light" value="Warm" bar={72} />
            <MetricCard icon={<Timer className="h-4 w-4" />} label="Break timer" value="18:24" bar={46} />
          </div>

          {/* toggles */}
          <div className="space-y-2 rounded-xl border border-white/10 bg-white/[0.02] p-3">
            <ToggleRow label="Screen protection" on />
            <ToggleRow label="Gentle reminders" on />
            <ToggleRow label="Auto night shift" on={false} />
          </div>

          <div className="flex items-center justify-between pt-1 text-xs text-mint/40">
            <span className="inline-flex items-center gap-1">
              <Settings className="h-3.5 w-3.5" /> Settings
            </span>
            <span>v1.0.0 · Windows</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon, label, value, bar }: { icon: ReactNode; label: string; value: string; bar: number }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
      <div className="flex items-center gap-2 text-mint/60">
        <span className="text-teal-brand">{icon}</span>
        <span className="text-xs">{label}</span>
      </div>
      <p className="mt-1 text-lg font-semibold text-white">{value}</p>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-gradient-to-r from-teal-deep to-teal-soft" style={{ width: `${bar}%` }} />
      </div>
    </div>
  );
}

function ToggleRow({ label, on }: { label: string; on: boolean }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-sm text-mint/80">{label}</span>
      <span
        className={`relative h-5 w-9 rounded-full transition-colors ${on ? "bg-teal-brand" : "bg-white/15"}`}
        aria-hidden
      >
        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${on ? "left-4" : "left-0.5"}`} />
      </span>
    </div>
  );
}

export default AppMockup;
