/**
 * Minimal site configuration. Values are public and provided at build time
 * (NEXT_PUBLIC_* vars are inlined by Next.js on Vercel).
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://silkcite.io"
).replace(/\/+$/, "");

export const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL ?? "";
