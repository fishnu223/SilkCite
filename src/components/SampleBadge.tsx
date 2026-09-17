import { SAMPLE_DATA_LABEL } from "@/content/metrics";

/**
 * An explicit "sample / illustrative data" badge. Every demonstration stat on
 * the site is labelled with this so visitors can never mistake it for real
 * client results.
 */
export function SampleBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted ${className}`}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
      {SAMPLE_DATA_LABEL}
    </span>
  );
}
