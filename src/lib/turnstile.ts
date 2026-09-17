import "server-only";
import { serverEnv } from "@/lib/env";

/**
 * Optional Cloudflare Turnstile bot protection.
 *
 * Turnstile is only active when both keys are configured. When disabled, the
 * form omits the widget and the server skips verification, keeping the normal
 * user experience friction-free. This keeps the third-party CSP surface empty
 * by default.
 */

export function isTurnstileEnabled(): boolean {
  return Boolean(
    serverEnv.turnstileSecretKey && serverEnv.turnstileSiteKey,
  );
}

interface TurnstileResponse {
  success?: boolean;
}

/**
 * Verify a Turnstile token server-side. Returns true only when Cloudflare
 * confirms the token. External data is treated as untrusted: only the
 * `success` boolean is read.
 */
export async function verifyTurnstile(
  token: string,
  remoteIp?: string | null,
): Promise<boolean> {
  const secret = serverEnv.turnstileSecretKey;
  if (!secret || !token) return false;

  try {
    const body = new FormData();
    body.set("secret", secret);
    body.set("response", token);
    if (remoteIp) body.set("remoteip", remoteIp);

    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body, cache: "no-store" },
    );

    if (!response.ok) return false;

    const data = (await response.json()) as TurnstileResponse;
    return data.success === true;
  } catch {
    return false;
  }
}
