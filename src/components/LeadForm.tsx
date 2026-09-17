"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";

type FieldErrors = Record<string, string>;

interface LeadFormProps {
  /** Present only when Cloudflare Turnstile is enabled. */
  turnstileSiteKey?: string;
  /** Request nonce for the Turnstile script (keeps strict CSP working). */
  turnstileNonce?: string;
}

const INITIAL = {
  name: "",
  email: "",
  company: "",
  website: "",
  phone: "",
};

export function LeadForm({ turnstileSiteKey, turnstileNonce }: LeadFormProps) {
  const [values, setValues] = useState(INITIAL);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileContainer = useRef<HTMLDivElement>(null);

  const renderTurnstile = useCallback(() => {
    if (!turnstileSiteKey || !turnstileContainer.current) return;
    window.turnstile?.render(turnstileContainer.current, {
      sitekey: turnstileSiteKey,
      callback: (token: string) => setTurnstileToken(token),
      "expired-callback": () => setTurnstileToken(""),
      "error-callback": () => setTurnstileToken(""),
    });
  }, [turnstileSiteKey]);

  useEffect(() => {
    if (!turnstileSiteKey) return;
    // If the API script is already loaded, render immediately.
    if (window.turnstile) renderTurnstile();
  }, [turnstileSiteKey, renderTurnstile]);

  function setField(field: keyof typeof INITIAL, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => {
      if (!(field in prev)) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    if (turnstileSiteKey && !turnstileToken) {
      setStatus("error");
      setErrorMessage("Please complete the verification.");
      return;
    }

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          company: values.company,
          website: values.website,
          phone: values.phone,
          turnstileToken: turnstileToken || undefined,
        }),
      });

      if (response.status === 429) {
        setStatus("error");
        setErrorMessage("Too many attempts. Please try again in a few minutes.");
        return;
      }

      const payload = (await response.json()) as {
        error?: { message?: string; fields?: FieldErrors; retryAfterSeconds?: number };
      };

      if (!response.ok) {
        setStatus("error");
        const message = payload.error?.message;
        setErrorMessage(message ?? "Something went wrong. Please try again.");
        setFieldErrors(payload.error?.fields ?? {});
        return;
      }

      setStatus("success");
      setValues(INITIAL);
      setTurnstileToken("");
      setFieldErrors({});
      if (window.turnstile) window.turnstile.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-hairline bg-surface p-8">
        <p className="text-lg font-medium text-ink">Thanks — we&apos;ll be in touch.</p>
        <p className="mt-2 text-sm text-muted">
          We&apos;ll reply to the work email you provided, usually within one
          business day.
        </p>
      </div>
    );
  }

  const inputClasses =
    "w-full rounded-lg border border-hairline bg-paper px-3.5 py-2.5 text-sm text-ink placeholder:text-faint focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-hairline bg-surface p-6 sm:p-8">
      <h3 className="text-lg font-medium text-ink">Prefer we reach out?</h3>
      <p className="mt-1 text-sm text-muted">
        Leave your details and we&apos;ll email you to arrange a time.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="lead-name" className="mb-1.5 block text-sm font-medium text-ink">
            Name
          </label>
          <input
            id="lead-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={120}
            value={values.name}
            onChange={(e) => setField("name", e.target.value)}
            className={inputClasses}
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? "lead-name-error" : undefined}
          />
          {fieldErrors.name ? (
            <p id="lead-name-error" className="mt-1.5 text-xs text-accent-strong">
              {fieldErrors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="lead-email" className="mb-1.5 block text-sm font-medium text-ink">
            Work email
          </label>
          <input
            id="lead-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            value={values.email}
            onChange={(e) => setField("email", e.target.value)}
            className={inputClasses}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "lead-email-error" : undefined}
          />
          {fieldErrors.email ? (
            <p id="lead-email-error" className="mt-1.5 text-xs text-accent-strong">
              {fieldErrors.email}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="lead-company" className="mb-1.5 block text-sm font-medium text-ink">
            Company
          </label>
          <input
            id="lead-company"
            name="company"
            type="text"
            autoComplete="organization"
            required
            maxLength={160}
            value={values.company}
            onChange={(e) => setField("company", e.target.value)}
            className={inputClasses}
            aria-invalid={Boolean(fieldErrors.company)}
            aria-describedby={fieldErrors.company ? "lead-company-error" : undefined}
          />
          {fieldErrors.company ? (
            <p id="lead-company-error" className="mt-1.5 text-xs text-accent-strong">
              {fieldErrors.company}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="lead-website" className="mb-1.5 block text-sm font-medium text-ink">
            Website
          </label>
          <input
            id="lead-website"
            name="website"
            type="text"
            autoComplete="url"
            placeholder="acme.com"
            maxLength={300}
            value={values.website}
            onChange={(e) => setField("website", e.target.value)}
            className={inputClasses}
            aria-invalid={Boolean(fieldErrors.website)}
            aria-describedby={fieldErrors.website ? "lead-website-error" : undefined}
          />
          {fieldErrors.website ? (
            <p id="lead-website-error" className="mt-1.5 text-xs text-accent-strong">
              {fieldErrors.website}
            </p>
          ) : null}
        </div>
      </div>

      {/* Honeypot — visually hidden from humans, tempting to bots. */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="lead-phone">Phone</label>
        <input
          id="lead-phone"
          name="phone"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.phone}
          onChange={(e) => setField("phone", e.target.value)}
        />
      </div>

      {turnstileSiteKey ? (
        <>
          {turnstileNonce ? (
            <Script
              src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
              strategy="afterInteractive"
              nonce={turnstileNonce}
              onLoad={renderTurnstile}
            />
          ) : null}
          <div ref={turnstileContainer} className="mt-6" />
        </>
      ) : null}

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-surface transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Request a call"}
        </button>

        <p className="text-xs leading-relaxed text-faint">
          We collect only your name, work email, company, and website to respond
          to your request. We never sell or share it. See our{" "}
          <a
            href="/privacy"
            className="underline underline-offset-2 transition-colors hover:text-accent-strong"
          >
            privacy notice
          </a>
          .
        </p>
      </div>

      {errorMessage ? (
        <p role="alert" className="mt-4 text-sm text-accent-strong">
          {errorMessage}
        </p>
      ) : null}
    </form>
  );
}
