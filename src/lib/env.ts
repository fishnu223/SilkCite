import "server-only";
import { z } from "zod";

/**
 * Typed, validated access to environment configuration.
 *
 * Only `NEXT_PUBLIC_*` variables are ever available to the browser. This
 * module is imported exclusively from server-side code (Server Components,
 * Route Handlers, and the build-time sitemap/robots generators), so server
 * secrets never reach the client bundle.
 *
 * The schema fails fast (throws) on misconfiguration so that a broken deploy
 * is caught at build/start time instead of silently rendering a broken CTA.
 */

const DEFAULTS = {
  siteUrl: "https://silkcite.io",
  poolMax: 3,
};

function raw(name: string): string | undefined {
  const value = process.env[name];
  if (value === undefined) return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function httpsUrl(label: string) {
  return z
    .url(`${label} must be a valid URL.`)
    .refine((value) => {
      try {
        return new URL(value).protocol === "https:";
      } catch {
        return false;
      }
    }, `${label} must use the https:// scheme.`);
}

const schema = z.object({
  calendlyUrl: httpsUrl("NEXT_PUBLIC_CALENDLY_URL"),
  siteUrl: z.url("NEXT_PUBLIC_SITE_URL must be a valid URL.").optional(),
  databaseUrl: z.string().min(1).optional(),
  turnstileSecretKey: z.string().min(1).optional(),
  turnstileSiteKey: z.string().min(1).optional(),
  upstashRedisUrl: z.url().optional(),
  upstashRedisToken: z.string().min(1).optional(),
  trustProxyHeaders: z.boolean().optional(),
  logHashSalt: z.string().optional(),
  allowedOrigins: z.array(z.url()).optional(),
});

const parsed = schema.safeParse({
  calendlyUrl: raw("NEXT_PUBLIC_CALENDLY_URL"),
  siteUrl: raw("NEXT_PUBLIC_SITE_URL"),
  databaseUrl: raw("DATABASE_URL"),
  turnstileSecretKey: raw("TURNSTILE_SECRET_KEY"),
  turnstileSiteKey: raw("NEXT_PUBLIC_TURNSTILE_SITE_KEY"),
  upstashRedisUrl: raw("UPSTASH_REDIS_REST_URL"),
  upstashRedisToken: raw("UPSTASH_REDIS_REST_TOKEN"),
  trustProxyHeaders:
    raw("TRUST_PROXY_HEADERS") === undefined
      ? undefined
      : raw("TRUST_PROXY_HEADERS") === "true",
  logHashSalt: raw("LOG_HASH_SALT"),
  allowedOrigins: raw("ALLOWED_ORIGINS")
    ?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
});

if (!parsed.success) {
  // Fail fast on misconfiguration. This is a developer-facing error, so the
  // details are fine here (they are never returned to end users).
  throw new Error(
    `Invalid environment configuration:\n${parsed.error.issues
      .map((issue) => `- ${issue.path.join(".") || "(root)"}: ${issue.message}`)
      .join("\n")}`,
  );
}

const env = parsed.data;

export const serverEnv = {
  /** Public Calendly scheduling URL for every "Schedule a Call" CTA. */
  calendlyUrl: env.calendlyUrl,
  /** Canonical public origin (no trailing slash). */
  siteUrl: (env.siteUrl ?? DEFAULTS.siteUrl).replace(/\/+$/, ""),
  /** PostgreSQL connection string, or undefined when no DB is configured. */
  databaseUrl: env.databaseUrl,
  /** Cloudflare Turnstile secret (server-only). */
  turnstileSecretKey: env.turnstileSecretKey,
  /** Cloudflare Turnstile site key (public). */
  turnstileSiteKey: env.turnstileSiteKey,
  /** Upstash Redis URL for distributed rate limiting. */
  upstashRedisUrl: env.upstashRedisUrl,
  /** Upstash Redis token for distributed rate limiting. */
  upstashRedisToken: env.upstashRedisToken,
  /** Whether proxy headers (X-Forwarded-For, etc.) are trusted for client IP. */
  trustProxyHeaders: env.trustProxyHeaders ?? process.env.VERCEL === "1",
  /** Salt for hashing identifiers before logging. */
  logHashSalt: env.logHashSalt,
  /** Additional origins allowed to call state-changing API routes. */
  allowedOrigins: env.allowedOrigins ?? [],
  /** Max connections in the PostgreSQL pool. */
  poolMax: (() => {
    const value = Number.parseInt(raw("DATABASE_POOL_MAX") ?? "", 10);
    if (Number.isInteger(value) && value >= 1 && value <= 50) return value;
    return DEFAULTS.poolMax;
  })(),
} as const;

export const isProduction = process.env.NODE_ENV === "production";
export const isDevelopment = process.env.NODE_ENV === "development";

export type ServerEnv = typeof serverEnv;
