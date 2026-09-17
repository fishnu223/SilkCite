/**
 * Minimal site configuration. Values are public and provided at build time
 * (NEXT_PUBLIC_* vars are inlined by Next.js on Vercel).
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://silkcite.io"
).replace(/\/+$/, "");

// Public Calendly booking page. The env var can override the default, so the
// button always renders even if NEXT_PUBLIC_CALENDLY_URL isn't set.
export const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ??
  "https://calendly.com/vishnu-silkcite/30min";
