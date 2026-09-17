/**
 * The SilkCite brand mark (extracted from the logo). Rendered as a plain
 * <img>: next/image emits an inline style attribute that would be blocked by
 * our strict nonce-based CSP, and a tiny static PNG does not benefit from the
 * image optimizer. Explicit width/height avoids layout shift.
 */
export function BrandMark({ className = "h-4 w-auto" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- see JSDoc above.
    <img
      src="/mark.png"
      alt=""
      width={32}
      height={16}
      className={className}
    />
  );
}
