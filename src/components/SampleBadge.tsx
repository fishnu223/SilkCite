/**
 * Explicit "illustrative data" label. Every demonstration figure on the site
 * carries one of these so visitors can never mistake it for real client data.
 */
export function SampleBadge({
  label = "Illustrative data",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted ${className}`}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
      {label}
    </span>
  );
}
