"use client";
import { Logo } from "./Logo";
import { APP_CONFIG } from "@/config";

const COLS = [
  {
    heading: "Product",
    links: [
      { label: "Home", href: "#home" },
      { label: "Features", href: "#features" },
      { label: "How It Works", href: "#how" },
      { label: "Download", href: "#download" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Privacy", href: "#privacy" },
      { label: "Contact", href: "#contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink-950/80">
      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-mint/60">{APP_CONFIG.tagline}</p>
          </div>
          {COLS.map((col) => (
            <div key={col.heading}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-mint/50">
                {col.heading}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm text-mint/70 transition-colors hover:text-white">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-xs text-mint/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Carevexa. All rights reserved.</p>
          <p>
            Carevexa is a software utility — not a medical device. Built for everyday screen comfort.
          </p>
        </div>
      </div>

      {/* Placeholder anchor targets for footer links (editable routes later) */}
      <div id="privacy" className="sr-only">Privacy policy — placeholder. Add your privacy content here.</div>
      <div id="contact" className="sr-only">Contact — placeholder. Add your contact details here.</div>
    </footer>
  );
}

export default Footer;
