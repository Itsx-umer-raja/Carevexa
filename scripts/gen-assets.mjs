// scripts/gen-assets.mjs
// Generates on-brand abstract PNG artwork used by the WebGL background,
// the scroll-dissolve reveal, and social/OG image. Zero external assets.
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, "../public/img");
mkdirSync(OUT, { recursive: true });

const PAL = {
  ink: "#04100f",
  ink2: "#061916",
  deep: "#0f766e",
  teal: "#2fd4b5",
  soft: "#5fe0c9",
  mint: "#a7f3e0",
  blue: "#123a5e",
};

/** soft blurred orb */
const orb = (cx, cy, r, color, op = 0.5) =>
  `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}" opacity="${op}" filter="url(#blur)"/>`;

function frame(w, h, inner, extraDefs = "") {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="70"/>
    </filter>
    <filter id="blurS" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="18"/>
    </filter>
    ${extraDefs}
  </defs>
  ${inner}
</svg>`;
}

async function save(name, svg) {
  await sharp(Buffer.from(svg)).png({ quality: 90 }).toFile(path.join(OUT, name));
  console.log("  ✓", name);
}

const W = 1920,
  H = 1080;

/* ---- Background slide 1: calm aurora ---- */
const bg1 = frame(
  W,
  H,
  `<rect width="${W}" height="${H}" fill="${PAL.ink}"/>
   <rect width="${W}" height="${H}" fill="url(#lg1)"/>
   ${orb(480, 300, 420, PAL.deep, 0.55)}
   ${orb(1500, 780, 520, PAL.teal, 0.35)}
   ${orb(1150, 220, 300, PAL.soft, 0.22)}
   ${orb(300, 950, 360, PAL.blue, 0.4)}`,
  `<linearGradient id="lg1" x1="0" y1="0" x2="1" y2="1">
     <stop offset="0" stop-color="${PAL.ink2}"/>
     <stop offset="1" stop-color="${PAL.ink}"/>
   </linearGradient>`
);

/* ---- Background slide 2: flowing waves ---- */
const bg2 = frame(
  W,
  H,
  `<rect width="${W}" height="${H}" fill="${PAL.ink}"/>
   ${orb(1400, 300, 480, PAL.deep, 0.5)}
   ${orb(500, 800, 460, PAL.teal, 0.3)}
   <g opacity="0.5" filter="url(#blurS)" fill="none" stroke-width="3">
     <path d="M0,700 C480,560 960,840 1920,640" stroke="${PAL.teal}" opacity="0.5"/>
     <path d="M0,780 C520,660 980,920 1920,720" stroke="${PAL.soft}" opacity="0.35"/>
     <path d="M0,860 C560,760 1000,980 1920,800" stroke="${PAL.mint}" opacity="0.25"/>
   </g>`
);

/* ---- Background slide 3: iris / eye motif ---- */
const bg3 = frame(
  W,
  H,
  `<rect width="${W}" height="${H}" fill="${PAL.ink}"/>
   ${orb(960, 540, 520, PAL.deep, 0.45)}
   <g transform="translate(960 540)">
     <circle r="360" fill="none" stroke="${PAL.teal}" stroke-width="2" opacity="0.35"/>
     <circle r="260" fill="none" stroke="${PAL.soft}" stroke-width="2" opacity="0.4"/>
     <circle r="150" fill="url(#ir)" opacity="0.9"/>
     <circle r="60" fill="${PAL.ink}"/>
     ${Array.from({ length: 48 })
       .map((_, i) => {
         const a = (i / 48) * Math.PI * 2;
         const x1 = Math.cos(a) * 165,
           y1 = Math.sin(a) * 165;
         const x2 = Math.cos(a) * 255,
           y2 = Math.sin(a) * 255;
         return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${PAL.soft}" stroke-width="2" opacity="0.3"/>`;
       })
       .join("")}
   </g>`,
  `<radialGradient id="ir" cx="45%" cy="40%" r="60%">
     <stop offset="0" stop-color="${PAL.mint}"/>
     <stop offset="55%" stop-color="${PAL.teal}"/>
     <stop offset="100%" stop-color="${PAL.deep}"/>
   </radialGradient>`
);

/* ---- Dissolve reveal: FRONT (harsh glare) & BACK (calm) ---- */
const dFront = frame(
  1600,
  1000,
  `<rect width="1600" height="1000" fill="#0a0f14"/>
   ${orb(800, 500, 520, "#7fb2ff", 0.5)}
   ${orb(800, 500, 240, "#ffffff", 0.35)}
   <g opacity="0.5" filter="url(#blurS)" stroke="#bcd4ff" stroke-width="2" fill="none">
     ${Array.from({ length: 14 })
       .map((_, i) => `<line x1="${100 + i * 110}" y1="0" x2="${100 + i * 110}" y2="1000"/>`)
       .join("")}
   </g>`
);
const dBack = frame(
  1600,
  1000,
  `<rect width="1600" height="1000" fill="${PAL.ink}"/>
   ${orb(800, 500, 520, PAL.deep, 0.55)}
   ${orb(560, 360, 260, PAL.teal, 0.4)}
   ${orb(1080, 640, 300, PAL.soft, 0.3)}
   <g transform="translate(800 500)">
     <path d="M-360,0 C-200,-160 200,-160 360,0 C200,160 -200,160 -360,0z" fill="none" stroke="${PAL.soft}" stroke-width="4" opacity="0.6"/>
     <circle r="96" fill="url(#ir2)"/>
     <circle r="40" fill="${PAL.ink}"/>
   </g>`,
  `<radialGradient id="ir2" cx="45%" cy="40%" r="60%">
     <stop offset="0" stop-color="${PAL.mint}"/>
     <stop offset="60%" stop-color="${PAL.teal}"/>
     <stop offset="100%" stop-color="${PAL.deep}"/>
   </radialGradient>`
);

/* ---- OG social image ---- */
const og = frame(
  1200,
  630,
  `<rect width="1200" height="630" fill="${PAL.ink}"/>
   ${orb(300, 200, 320, PAL.deep, 0.55)}
   ${orb(950, 480, 340, PAL.teal, 0.35)}
   <g transform="translate(150 250)">
     <text x="0" y="0" font-family="Segoe UI, Arial, sans-serif" font-size="92" font-weight="700" fill="#ffffff">Carevexa</text>
     <text x="0" y="70" font-family="Segoe UI, Arial, sans-serif" font-size="34" fill="${PAL.soft}">Eye Care for Windows</text>
   </g>
   <g transform="translate(980 315)">
     <path d="M-120,0 C-66,-54 66,-54 120,0 C66,54 -66,54 -120,0z" fill="none" stroke="${PAL.soft}" stroke-width="6"/>
     <circle r="40" fill="${PAL.teal}"/><circle r="16" fill="${PAL.ink}"/>
   </g>`
);

await save("bg-1.png", bg1);
await save("bg-2.png", bg2);
await save("bg-3.png", bg3);
await save("dissolve-front.png", dFront);
await save("dissolve-back.png", dBack);
await save("og.png", og);

/* ---- Comfort-mode preview cards (for the diagonal carousel) ---- */
function modeCard(title, sub, c1, c2, glyph) {
  return frame(
    900,
    900,
    `<rect width="900" height="900" rx="0" fill="${PAL.ink}"/>
     <rect width="900" height="900" fill="url(#mg)"/>
     ${orb(250, 240, 300, c1, 0.55)}
     ${orb(680, 700, 320, c2, 0.4)}
     <g transform="translate(450 380)" opacity="0.92">${glyph}</g>
     <text x="450" y="640" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="64" font-weight="700" fill="#ffffff">${title}</text>
     <text x="450" y="700" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="30" fill="${PAL.mint}" opacity="0.8">${sub}</text>`,
    `<linearGradient id="mg" x1="0" y1="0" x2="1" y2="1">
       <stop offset="0" stop-color="${PAL.ink2}"/><stop offset="1" stop-color="${PAL.ink}"/>
     </linearGradient>`
  );
}

const eyeGlyph = `<path d="M-150,0 C-82,-70 82,-70 150,0 C82,70 -82,70 -150,0z" fill="none" stroke="${PAL.soft}" stroke-width="7"/><circle r="52" fill="${PAL.teal}"/><circle r="20" fill="${PAL.ink}"/>`;
const sunGlyph = `<circle r="70" fill="${PAL.soft}"/>${Array.from({ length: 12 }).map((_, i) => { const a = (i / 12) * Math.PI * 2; return `<line x1="${(Math.cos(a) * 92).toFixed(1)}" y1="${(Math.sin(a) * 92).toFixed(1)}" x2="${(Math.cos(a) * 128).toFixed(1)}" y2="${(Math.sin(a) * 128).toFixed(1)}" stroke="${PAL.soft}" stroke-width="8" stroke-linecap="round"/>`; }).join("")}`;
const moonGlyph = `<path d="M60,-90 A110,110 0 1 0 60,90 A85,85 0 1 1 60,-90z" fill="${PAL.soft}"/>`;
const bookGlyph = `<rect x="-120" y="-80" width="240" height="160" rx="12" fill="none" stroke="${PAL.soft}" stroke-width="8"/><line x1="0" y1="-80" x2="0" y2="80" stroke="${PAL.soft}" stroke-width="6"/>`;

await save("mode-day.png", modeCard("Daylight", "Balanced clarity", PAL.teal, PAL.deep, eyeGlyph));
await save("mode-warm.png", modeCard("Warm", "Softer, gentler tones", "#e6a35c", PAL.deep, sunGlyph));
await save("mode-night.png", modeCard("Night", "Low-light comfort", PAL.blue, PAL.deep, moonGlyph));
await save("mode-reading.png", modeCard("Reading", "Calm, steady focus", PAL.soft, PAL.deep, bookGlyph));

console.log("Assets generated in public/img");
