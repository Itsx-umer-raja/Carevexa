/**
 * ============================================================
 *  CAREVEXA — SINGLE SOURCE OF TRUTH
 * ============================================================
 *  Change these values whenever you ship a new installer.
 *  Nothing else in the codebase hard-codes the download link.
 * ------------------------------------------------------------
 *  HOW TO UPDATE THE DOWNLOAD:
 *  1. Upload the new .exe to Google Drive.
 *  2. Set sharing to "Anyone with the link".
 *  3. Copy the share link and paste it into `driveShareUrl`
 *     below (the full ".../file/d/<ID>/view..." URL is fine —
 *     the direct-download link is derived automatically).
 *  4. Bump `version` for the new release.
 * ============================================================
 */

const driveShareUrl =
  "https://drive.google.com/file/d/1aVm_d6XFouY4QJx2VF6tIA8LwjWvqt95/view?usp=drive_link";

/** Extracts the Drive file id from any standard Google Drive share URL. */
function driveIdFrom(url: string): string | null {
  const byPath = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (byPath) return byPath[1];
  const byQuery = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  return byQuery ? byQuery[1] : null;
}

/** Builds a "force download" Google Drive URL when possible. */
function directDownloadUrl(url: string): string {
  const id = driveIdFrom(url);
  return id ? `https://drive.google.com/uc?export=download&id=${id}` : url;
}

export const APP_CONFIG = {
  name: "Carevexa",
  tagline: "Protect Your Eyes. Care for Your Screen Time.",
  version: "1.0.0",
  platform: "Windows 10 / Windows 11",
  // Fill these in when you have them; empty strings render as placeholders.
  developer: "[Your Name / Company]",
  license: "[License — e.g. Freeware / Proprietary]",
  // The raw Google Drive share link (easy to swap):
  driveShareUrl,
  // Auto-derived. Used by every download button + manual fallback link.
  downloadUrl: directDownloadUrl(driveShareUrl),
  // Fallback that always opens the Drive page (in case the browser blocks
  // the direct download and shows a confirmation screen).
  manualUrl: driveShareUrl,
} as const;

export type AppConfig = typeof APP_CONFIG;
