import { NextRequest } from "next/server";
import {
  apiError,
  apiOk,
  GENERIC_ERROR_MESSAGE,
  getClientIp,
  getRateLimitIdentifier,
  isSameOriginRequest,
  readJsonBody,
} from "@/lib/http";
import { logger } from "@/lib/logger";
import { checkLeadRateLimit } from "@/lib/rate-limit";
import { isTurnstileEnabled, verifyTurnstile } from "@/lib/turnstile";
import {
  leadInputSchema,
  toFieldErrors,
  type StoredLeadInput,
} from "@/lib/leads/schema";
import { createLead } from "@/lib/leads/repository";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  // 1. CSRF: accept state-changing requests only from our own origin.
  if (!isSameOriginRequest(request)) {
    logger.security("lead_origin_rejected");
    return apiError(403, "forbidden", "Request origin is not allowed.");
  }

  // 2. Only JSON is accepted.
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return apiError(415, "unsupported_media_type", "Unsupported content type.");
  }

  // 3. Rate limit (per client IP, or a best-effort fingerprint when no
  //    trusted proxy is configured).
  const clientIp = getClientIp(request);
  const identifier = getRateLimitIdentifier(request);
  const rateLimit = await checkLeadRateLimit(identifier);
  if (!rateLimit.ok) {
    logger.security(
      "lead_rate_limited",
      { retryAfterSeconds: rateLimit.retryAfterSeconds },
      clientIp ?? undefined,
    );
    return apiError(429, "rate_limited", "Too many requests. Please try again later.", {
      retryAfterSeconds: rateLimit.retryAfterSeconds,
    });
  }

  // 4. Read and size-cap the body.
  const body = await readJsonBody(request);
  if (!body.ok) {
    if (body.reason === "too_large") {
      return apiError(413, "payload_too_large", "Request is too large.");
    }
    return apiError(400, "invalid_input", "The request could not be processed.");
  }

  // 5. Strict schema validation (rejects unexpected fields).
  const parsed = leadInputSchema.safeParse(body.value);
  if (!parsed.success) {
    const fields = toFieldErrors(parsed.error);
    logger.security(
      "lead_validation_failed",
      { fieldCount: Object.keys(fields).length },
      clientIp ?? undefined,
    );
    return apiError(400, "invalid_input", "Please review the highlighted fields.", {
      fields,
    });
  }

  const input = parsed.data;

  // 6. Honeypot: silently drop bot submissions (do not store them).
  if (input.phone && input.phone.trim().length > 0) {
    logger.security("lead_honeypot_triggered", {}, clientIp ?? undefined);
    return apiOk({ received: true });
  }

  // 7. Optional Turnstile verification.
  if (isTurnstileEnabled()) {
    if (!input.turnstileToken) {
      return apiError(400, "invalid_input", "Please complete the verification.");
    }
    const verified = await verifyTurnstile(input.turnstileToken, clientIp ?? undefined);
    if (!verified) {
      logger.security(
        "lead_turnstile_failed",
        {},
        clientIp ?? undefined,
      );
      return apiError(400, "invalid_input", "Verification failed. Please try again.");
    }
  }

  // 8. Persist (only the four explicitly collected fields).
  const storedInput: StoredLeadInput = {
    name: input.name,
    email: input.email,
    company: input.company,
    website: input.website,
  };

  try {
    const result = await createLead(storedInput);
    if (!result.ok) {
      return apiError(503, "unavailable", "We couldn't save your details right now. Please try again shortly.");
    }
    logger.security(
      "lead_created",
      { duplicate: result.duplicate },
      clientIp ?? undefined,
    );
    return apiOk({ received: true });
  } catch (error) {
    // Defence in depth: never surface the underlying error.
    logger.error("lead_unexpected_error", {
      code: typeof error === "object" && error !== null && "code" in error ? String((error as { code?: unknown }).code) : "UNKNOWN",
    });
    return apiError(500, "internal_error", GENERIC_ERROR_MESSAGE);
  }
}
