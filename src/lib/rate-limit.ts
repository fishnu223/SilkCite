import "server-only";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { serverEnv } from "@/lib/env";
import { logger } from "@/lib/logger";

/**
 * Rate limiting for public API endpoints.
 *
 * Uses Upstash Redis (a durable, shared store that works across serverless
 * instances) when configured. Otherwise falls back to an in-memory sliding
 * window, which is per-instance only and therefore suitable for local
 * development and single-instance deployments.
 */

const LEAD_LIMIT = 5; // allowed requests
const LEAD_WINDOW_SECONDS = 600; // per 10 minutes

export interface RateLimitResult {
  ok: boolean;
  limit: number;
  /** Whole seconds until the next request is allowed (when !ok). */
  retryAfterSeconds?: number;
}

let upstashRatelimit: Ratelimit | null | undefined;
let warnedInMemory = false;

function safeErrorCode(error: unknown): string {
  if (typeof error === "object" && error !== null && "code" in error) {
    const code = (error as { code?: unknown }).code;
    if (typeof code === "string") return code;
  }
  return "UNKNOWN";
}

function getUpstashRatelimit(): Ratelimit | null {
  if (upstashRatelimit !== undefined) return upstashRatelimit;

  const { upstashRedisUrl, upstashRedisToken } = serverEnv;
  if (!upstashRedisUrl || !upstashRedisToken) {
    upstashRatelimit = null;
    return null;
  }

  try {
    const redis = new Redis({
      url: upstashRedisUrl,
      token: upstashRedisToken,
    });
    upstashRatelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(LEAD_LIMIT, `${LEAD_WINDOW_SECONDS} s`),
      prefix: "silkcite:rl:lead",
    });
  } catch (error) {
    // Log only a safe code — never the error message, which for SDK/network
    // errors can contain connection details.
    logger.error("rate_limiter_init_failed", { code: safeErrorCode(error) });
    upstashRatelimit = null;
  }

  return upstashRatelimit;
}

// --- In-memory sliding window (fallback) -----------------------------------

const hits = new Map<string, number[]>();
const MAX_TRACKED_KEYS = 20_000;

function inMemoryLimit(identifier: string): RateLimitResult {
  const now = Date.now();
  const windowMs = LEAD_WINDOW_SECONDS * 1000;
  const recent = (hits.get(identifier) ?? []).filter((t) => now - t < windowMs);

  if (recent.length >= LEAD_LIMIT) {
    const oldest = recent[0] ?? now;
    hits.set(identifier, recent);
    return {
      ok: false,
      limit: LEAD_LIMIT,
      retryAfterSeconds: Math.max(1, Math.ceil((oldest + windowMs - now) / 1000)),
    };
  }

  recent.push(now);
  hits.set(identifier, recent);

  // Opportunistic pruning to bound memory.
  if (hits.size > MAX_TRACKED_KEYS) {
    const cutoff = now - windowMs;
    for (const [key, timestamps] of hits) {
      if (timestamps.every((t) => t < cutoff)) hits.delete(key);
    }
  }

  return { ok: true, limit: LEAD_LIMIT };
}

/**
 * Enforce the lead-submission rate limit for an identifier (usually the client
 * IP). Never throws: a failure of the rate limiter itself is surfaced as a
 * conservative denial plus an error log, so abuse protection fails closed.
 */
export async function checkLeadRateLimit(identifier: string): Promise<RateLimitResult> {
  const limiter = getUpstashRatelimit();
  if (!limiter) {
    if (process.env.NODE_ENV === "production" && !warnedInMemory) {
      warnedInMemory = true;
      logger.warn("rate_limiter_in_memory_fallback", {
        note: "In-memory limiting is per-instance; configure Upstash Redis for multi-instance deployments.",
      });
    }
    return inMemoryLimit(identifier);
  }

  try {
    const result = await limiter.limit(identifier);
    if (result.success) {
      return { ok: true, limit: result.limit };
    }
    return {
      ok: false,
      limit: result.limit,
      retryAfterSeconds: Math.max(
        1,
        Math.ceil((result.reset - Date.now()) / 1000),
      ),
    };
  } catch (error) {
    // Fail closed: an unavailable limiter must not open the floodgates.
    logger.error("rate_limiter_check_failed", { code: safeErrorCode(error) });
    return { ok: false, limit: LEAD_LIMIT, retryAfterSeconds: 60 };
  }
}
