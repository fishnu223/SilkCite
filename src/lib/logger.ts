import { createHash, randomUUID } from "node:crypto";

/**
 * Structured server-side logging.
 *
 * Logs are emitted as single-line JSON to stdout/stderr so they can be
 * captured by Vercel / Datadog / etc. Security-relevant events are logged with
 * a stable `event` name. Raw secrets and personal data are NEVER logged:
 * identifiers (such as client IPs) are hashed with a salt before being
 * written.
 */

function hashIdentifier(value: string): string {
  // When LOG_HASH_SALT is unset, use a random per-process salt so identifiers
  // cannot be reversed with a known constant. Set LOG_HASH_SALT to get stable,
  // cross-instance correlation.
  const salt = process.env.LOG_HASH_SALT ?? `__ephemeral__${randomUUID()}`;
  return createHash("sha256")
    .update(`${salt}:${value.toLowerCase()}`)
    .digest("hex")
    .slice(0, 16);
}

function emit(level: "info" | "warn" | "error", event: string, fields: Record<string, unknown> = {}) {
  const entry = {
    ts: new Date().toISOString(),
    level,
    event,
    ...fields,
  };

  const line = JSON.stringify(entry);

  if (level === "error") {
    console.error(line);
  } else {
    console.log(line);
  }
}

export const logger = {
  info(event: string, fields?: Record<string, unknown>) {
    emit("info", event, fields);
  },
  warn(event: string, fields?: Record<string, unknown>) {
    emit("warn", event, fields);
  },
  error(event: string, fields?: Record<string, unknown>) {
    emit("error", event, fields);
  },
  /**
   * Log a security-relevant event. Accepts an optional identifier (e.g. client
   * IP) that is hashed before it is written, so raw identifiers never appear
   * in logs.
   */
  security(event: string, fields: Record<string, unknown> = {}, identifier?: string) {
    emit("info", event, {
      ...fields,
      ...(identifier ? { identHash: hashIdentifier(identifier) } : {}),
    });
  },
};
