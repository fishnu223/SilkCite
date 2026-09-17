import { z } from "zod";

/**
 * Strict server-side validation for the lead form.
 *
 * The schema rejects unknown fields (`.strictObject`), bounds every string,
 * strips control characters, and normalizes email/website. Messages are
 * written to be safe to echo back to the client (no internal detail).
 */

export const LEAD_FIELD_LIMITS = {
  name: 120,
  email: 254,
  company: 160,
  website: 300,
  turnstileToken: 4096,
} as const;

function stripControlChars(value: string): string {
  return value
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeWebsite(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  // Prepend https:// when the user omitted a scheme.
  return /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;
}

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export const leadInputSchema = z.strictObject({
  name: z
    .string()
    .trim()
    .min(2, "Enter your full name.")
    .max(
      LEAD_FIELD_LIMITS.name,
      `Name must be ${LEAD_FIELD_LIMITS.name} characters or fewer.`,
    )
    .transform(stripControlChars),

  email: z
    .string()
    .transform((value) => value.trim())
    .pipe(z.email("Enter a valid work email address."))
    .transform((value) => value.toLowerCase())
    .refine(
      (value) => value.length <= LEAD_FIELD_LIMITS.email,
      `Email must be ${LEAD_FIELD_LIMITS.email} characters or fewer.`,
    ),

  company: z
    .string()
    .trim()
    .min(2, "Enter your company name.")
    .max(
      LEAD_FIELD_LIMITS.company,
      `Company must be ${LEAD_FIELD_LIMITS.company} characters or fewer.`,
    )
    .transform(stripControlChars),

  website: z
    .string()
    .trim()
    .min(4, "Enter your website.")
    .transform(normalizeWebsite)
    .pipe(
      z.string().max(
        LEAD_FIELD_LIMITS.website,
        `Website must be ${LEAD_FIELD_LIMITS.website} characters or fewer.`,
      ),
    )
    .refine(isHttpUrl, "Enter a valid website (e.g. acme.com)."),

  // Honeypot: hidden from humans, tempting to automated form fillers. A
  // non-empty value is silently dropped by the route and never stored.
  phone: z.string().max(500).optional(),

  // Present only when Cloudflare Turnstile is enabled.
  turnstileToken: z.string().max(LEAD_FIELD_LIMITS.turnstileToken).optional(),
});

export type LeadInput = z.infer<typeof leadInputSchema>;

/** A LeadInput with the anti-abuse fields removed. */
export type StoredLeadInput = Pick<
  LeadInput,
  "name" | "email" | "company" | "website"
>;

export type FieldErrors = Record<string, string>;

/**
 * Convert a ZodError into a safe, field-keyed message map. Fields with empty
 * paths (e.g. rejected unknown keys) are intentionally omitted so the client
 * is never told which internal keys exist.
 */
export function toFieldErrors(error: z.ZodError): FieldErrors {
  const fields: FieldErrors = {};
  for (const issue of error.issues) {
    const key = typeof issue.path[0] === "string" ? issue.path[0] : undefined;
    if (key && !(key in fields)) {
      fields[key] = issue.message;
    }
  }
  return fields;
}
