import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { serverEnv } from "@/lib/env";

/**
 * HTTP helpers for API routes: safe responses, client-IP derivation, CSRF
 * origin checks, and size-capped body reading. Responses never include stack
 * traces, internal paths, or database details.
 */

export type ApiErrorCode =
  | "invalid_input"
  | "rate_limited"
  | "forbidden"
  | "method_not_allowed"
  | "unsupported_media_type"
  | "payload_too_large"
  | "unavailable"
  | "internal_error";

export const MAX_BODY_BYTES = 8 * 1024; // 8 KiB is plenty for a 4-field lead form.

function noStore(response: NextResponse): NextResponse {
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export function apiOk<T>(data: T, init?: ResponseInit): NextResponse {
  return noStore(NextResponse.json({ data }, { status: 200, ...init }));
}

export function apiError(
  status: number,
  code: ApiErrorCode,
  message: string,
  extra?: Record<string, unknown>,
): NextResponse {
  return noStore(
    NextResponse.json(
      { error: { code, message, ...(extra ?? {}) } },
      { status },
    ),
  );
}

/** A generic, safe message for unexpected server errors. */
export const GENERIC_ERROR_MESSAGE =
  "Something went wrong. Please try again shortly.";

/**
 * Derive a client IP for rate limiting. Only trusts proxy headers when running
 * behind a trusted proxy (auto-enabled on Vercel). Prefers headers that a
 * trusted edge proxy *overwrites* (and therefore a client cannot influence)
 * before the appended `X-Forwarded-For` list, where the rightmost hop is the
 * one appended by our own proxy.
 */
export function getClientIp(request: NextRequest): string | null {
  if (!serverEnv.trustProxyHeaders) return null;

  const direct =
    request.headers.get("cf-connecting-ip") ?? request.headers.get("x-real-ip");
  if (direct) return direct;

  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const parts = forwarded
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean);
    const last = parts[parts.length - 1];
    if (last) return last;
  }

  return null;
}

/**
 * Build a rate-limit identifier for a request. Uses the trusted client IP when
 * available; otherwise falls back to a best-effort fingerprint of request
 * attributes so clients do not all collapse into a single shared bucket (which
 * would let one abuser 429 the endpoint for everyone). The fallback is
 * untrusted and spoofable, but strictly safer than one global bucket.
 */
export function getRateLimitIdentifier(request: NextRequest): string {
  const ip = getClientIp(request);
  if (ip) return ip;

  const seed = [
    request.headers.get("x-forwarded-for") ?? "",
    request.headers.get("user-agent") ?? "",
    request.headers.get("accept-language") ?? "",
  ].join("|");

  return `anon:${createHash("sha256").update(seed).digest("hex").slice(0, 24)}`;
}

/**
 * CSRF defence for state-changing JSON endpoints.
 *
 * Browsers send an `Origin` header on cross-origin POSTs; we accept only when
 * the Origin matches the request's own Host (or an explicitly allowed origin).
 * This blocks browser-based cross-site requests. There is no cookie/session to
 * hijack, so this is defence-in-depth rather than a session-protection check.
 */
export function isSameOriginRequest(request: NextRequest): boolean {
  // Modern browsers send Sec-Fetch-Site; a cross-site request is rejected.
  if (request.headers.get("sec-fetch-site") === "cross-site") return false;

  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin || !host) return false;

  let originUrl: URL;
  try {
    originUrl = new URL(origin);
  } catch {
    return false;
  }

  if (originUrl.host.toLowerCase() === host.toLowerCase()) return true;

  return serverEnv.allowedOrigins.some((allowed) => {
    try {
      return new URL(allowed).host.toLowerCase() === originUrl.host.toLowerCase();
    } catch {
      return false;
    }
  });
}

/**
 * Read and parse a JSON body with a hard size cap, streaming the body so an
 * over-limit payload is rejected *before* it is fully buffered in memory.
 */
export async function readJsonBody(
  request: NextRequest,
): Promise<
  { ok: true; value: unknown } | { ok: false; reason: "too_large" | "invalid_json" }
> {
  const declaredLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return { ok: false, reason: "too_large" };
  }

  const body = request.body;
  if (!body) return { ok: false, reason: "invalid_json" };

  const reader = body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;

  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      if (!value) continue;

      total += value.byteLength;
      if (total > MAX_BODY_BYTES) {
        await reader.cancel().catch(() => {});
        return { ok: false, reason: "too_large" };
      }
      chunks.push(value);
    }
  } catch {
    return { ok: false, reason: "invalid_json" };
  }

  const text = Buffer.concat(chunks.map((chunk) => Buffer.from(chunk))).toString("utf8");

  try {
    return { ok: true, value: JSON.parse(text) };
  } catch {
    return { ok: false, reason: "invalid_json" };
  }
}
