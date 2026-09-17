import { getPrisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";
import type { StoredLeadInput } from "@/lib/leads/schema";

/**
 * Persistence for qualified leads. Uses the parameterized Prisma client only —
 * no raw SQL is ever built from user input.
 *
 * NOTE: values are stored verbatim (after input validation). Any future admin
 * or reporting view that renders them MUST HTML-encode/escape them on output;
 * no output encoding exists here because nothing renders them today.
 */

export type CreateLeadResult =
  | { ok: true; id: string; duplicate: boolean }
  | { ok: false; reason: "unavailable" };

function errorCode(error: unknown): string {
  if (typeof error === "object" && error !== null && "code" in error) {
    const code = (error as { code?: unknown }).code;
    if (typeof code === "string") return code;
  }
  return "UNKNOWN";
}

function isUniqueViolation(error: unknown): boolean {
  return errorCode(error) === "P2002";
}

export async function createLead(
  input: StoredLeadInput,
): Promise<CreateLeadResult> {
  const prisma = getPrisma();
  if (!prisma) return { ok: false, reason: "unavailable" };

  try {
    const existing = await prisma.lead.findUnique({
      where: { email: input.email },
      select: { id: true },
    });

    if (existing) {
      return { ok: true, id: existing.id, duplicate: true };
    }

    const created = await prisma.lead.create({
      data: {
        name: input.name,
        email: input.email,
        company: input.company,
        website: input.website,
      },
      select: { id: true },
    });

    return { ok: true, id: created.id, duplicate: false };
  } catch (error) {
    // Handle the small race where two requests insert the same email at once.
    if (isUniqueViolation(error)) {
      const existing = await prisma.lead
        .findUnique({ where: { email: input.email }, select: { id: true } })
        .catch(() => null);
      if (existing) return { ok: true, id: existing.id, duplicate: true };
    }

    // Log only the error code (never the message, which could contain
    // connection details) and return a generic failure to the caller.
    logger.error("lead_create_failed", { code: errorCode(error) });
    return { ok: false, reason: "unavailable" };
  }
}
