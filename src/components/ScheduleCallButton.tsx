import type { ReactNode } from "react";
import { CALENDLY_URL } from "@/lib/config";

/**
 * The single conversion action used across the site. Renders as a plain anchor
 * (no JavaScript) that opens the environment-configured Calendly URL in a new
 * tab. The URL is read from `NEXT_PUBLIC_CALENDLY_URL` — never hardcoded.
 */

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 focus-visible:outline-accent";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-ink hover:bg-accent-deep px-7 py-3.5 text-base",
  primarySm: "bg-accent text-ink hover:bg-accent-deep px-5 py-2.5 text-sm",
  outline:
    "border border-hairline bg-transparent text-ink hover:border-accent-strong hover:text-accent-strong px-5 py-2.5 text-sm",
};

type Variant = "primary" | "primarySm" | "outline";

export function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={`${className} transition-transform duration-200 group-hover:translate-x-0.5`}
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ScheduleCallButton({
  label = "Schedule a Call",
  variant = "primary",
  className = "",
}: {
  label?: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  // If the Calendly URL is not configured, don't render a dead link.
  if (!CALENDLY_URL) return null;

  return (
    <a
      href={CALENDLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${variants[variant]} ${className}`}
    >
      <span>{label}</span>
      <ArrowIcon />
    </a>
  );
}
