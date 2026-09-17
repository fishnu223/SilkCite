import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Next.js 16 Proxy (formerly Middleware): applies a strict Content-Security-
 * Policy with a fresh nonce on every HTML request.
 *
 * Nonce-based CSP requires dynamic rendering (see the layout, which opts out
 * of static generation), and Next.js automatically applies the nonce to its
 * own scripts, styles, and bundles when the `x-nonce` request header is set.
 *
 * Third-party directives (Cloudflare Turnstile) are added only when the site
 * key is configured, keeping the CSP minimal by default.
 */

function generateNonce(): string {
  // Web-Crypto + btoa (available in both Node and edge runtimes; no Buffer).
  return btoa(crypto.randomUUID()).replace(/=+$/, "");
}

function buildCsp(
  nonce: string,
  isDev: boolean,
  turnstileEnabled: boolean,
): string {
  const turnstileHost = "https://challenges.cloudflare.com";

  const directives = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ""}${turnstileEnabled ? ` ${turnstileHost}` : ""}`,
    `style-src 'self'${isDev ? " 'unsafe-inline'" : ` 'nonce-${nonce}'`}`,
    "img-src 'self' data: blob:",
    "font-src 'self'",
    `connect-src 'self'${turnstileEnabled ? ` ${turnstileHost}` : ""}`,
    turnstileEnabled ? `frame-src ${turnstileHost}` : "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ];

  if (!isDev) directives.push("upgrade-insecure-requests");

  return directives.join("; ");
}

export function proxy(request: NextRequest) {
  const nonce = generateNonce();
  const isDev = process.env.NODE_ENV === "development";
  const turnstileEnabled = Boolean(
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY &&
      process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY.length > 0,
  );

  const csp = buildCsp(nonce, isDev, turnstileEnabled);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });
  response.headers.set("Content-Security-Policy", csp);

  return response;
}

export const config = {
  matcher: [
    {
      // Apply to HTML pages; skip API routes, static assets, images, and
      // prefetches that never need a nonce.
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
