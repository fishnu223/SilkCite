import type { NextConfig } from "next";

// Static, nonce-independent security headers. The Content-Security-Policy
// header (which needs a per-request nonce) is set in `src/proxy.ts`.
const securityHeaders: { key: string; value: string }[] = [
  // MIME-type sniffing protection.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Clickjacking protection (belt-and-braces alongside CSP frame-ancestors).
  { key: "X-Frame-Options", value: "DENY" },
  // Referrer policy: only send the origin on cross-origin navigations.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Disable browser features the site does not use.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  // Disable DNS prefetching (reduces privacy exposure).
  { key: "X-DNS-Prefetch-Control", value: "off" },
  // HSTS — only meaningful over HTTPS; ignored on plaintext/localhost.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  // Next.js adds an x-powered-by header by default; remove it.
  poweredByHeader: false,

  reactStrictMode: true,

  // Prisma Client (v7) and the PostgreSQL driver must run in Node and must not
  // be bundled into the serverless function.
  serverExternalPackages: ["@prisma/client", "@prisma/adapter-pg", "pg"],

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
