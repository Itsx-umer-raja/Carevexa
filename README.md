# Carevexa — Eye Care for Windows (Website)

A production-ready, animated marketing + download website for **Carevexa**, a lightweight
Windows eye-care application. Built with **React + Vite + TypeScript + Tailwind CSS**, with
3D/WebGL and scroll animation powered by **three.js**, **@react-three/fiber**, **GSAP
(ScrollTrigger + SplitText)** and **Framer Motion**.

> Carevexa is a software utility and is **not** a medical device or a substitute for
> professional eye care.

## ✨ What's inside

- **Cinematic intro** — a futuristic background video with an animated title and an **Enter** button (sound on/off).
- **Living WebGL hero** — an auto-cycling ripple-displacement background.
- **Scroll storytelling** — a shader-based "harsh glare → calm comfort" dissolve reveal.
- **Gooey text reveals** and scroll fade-ins throughout.
- Features, How It Works, Download (with manual fallback), Software Info, System Requirements, Footer.
- Fully **responsive**, **accessible**, `prefers-reduced-motion` aware, and **SEO/OG** ready.

## 🚀 Run locally

```bash
git clone YOUR_REPOSITORY_URL
cd carevexa-website
npm install
npm run dev        # start the dev server (http://localhost:5173)
```

Other scripts:

```bash
npm run build      # type-check + production build into /dist
npm run preview    # preview the production build locally
npm run gen:assets # regenerate the abstract brand artwork in /public/img
```

## 🔧 Change the download link (Google Drive)

Everything download-related lives in **one file**: [`src/config.ts`](src/config.ts).

1. Upload your new `.exe` to Google Drive and set sharing to **"Anyone with the link"**.
2. Copy the share URL and paste it into `driveShareUrl`:

   ```ts
   const driveShareUrl =
     "https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=drive_link";
   ```

   The direct-download URL is derived automatically — no need to edit anything else.

## 🏷️ Change the version / details

Also in `src/config.ts`:

```ts
export const APP_CONFIG = {
  version: "1.0.0",
  platform: "Windows 10 / Windows 11",
  developer: "[Your Name / Company]",
  license: "[License]",
  // ...
};
```

## 🎬 Replace the intro video

Drop your `.mp4` in `public/intro.mp4` (replacing the existing file). Keep the filename the same.

## ☁️ Deploy to Vercel

### Option A — via GitHub (recommended)

```bash
git init
git add .
git commit -m "Initial commit: Carevexa website"
git branch -M main
git remote add origin YOUR_REPOSITORY_URL
git push -u origin main
```

Then on **vercel.com**:

1. **Add New… → Project** and import your GitHub repository.
2. Vercel auto-detects **Vite**. Confirm the defaults:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Click **Deploy**. Your site goes live at `your-project.vercel.app`.

(`vercel.json` in this repo already sets the framework, build command, and output directory.)

### Option B — Vercel CLI

```bash
npm i -g vercel
vercel        # follow the prompts
vercel --prod # deploy to production
```

## 📁 Project structure

```
carevexa-website/
├── index.html            # SEO/OG meta, fonts, root
├── public/
│   ├── intro.mp4         # intro background video
│   ├── favicon.svg
│   └── img/              # generated brand artwork (npm run gen:assets)
├── scripts/
│   └── gen-assets.mjs    # generates public/img/*.png
├── src/
│   ├── config.ts         # ⭐ single source of truth (download URL + version)
│   ├── App.tsx
│   ├── index.css
│   └── components/       # Intro, Hero, Features, Download, WebGL/GSAP pieces…
├── tailwind.config.js
├── vite.config.ts
└── vercel.json
```

## ♿ Notes

- Respects `prefers-reduced-motion` (WebGL cycling and reveals are disabled/instant).
- The in-app dashboard is an **illustrative HTML/CSS mockup** — edit `AppMockup.tsx` to match
  the real application. Feature copy is written in responsible, non-medical language and is
  meant to be edited to reflect what the app actually does.

© 2026 Carevexa. All rights reserved.
