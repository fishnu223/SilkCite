import { AnimatedCounter } from "@/components/AnimatedCounter";
import type { StatMetric } from "@/content/metrics";

/**
 * A single metric card: label, large animated value, and a thin decorative
 * meter drawn as SVG (so it stays CSP-safe without inline styles).
 */
export function MetricCard({ metric }: { metric: StatMetric }) {
  const fill = Math.max(0, Math.min(100, metric.value));

  return (
    <article className="rounded-2xl border border-hairline bg-surface p-6 sm:p-7">
      <h3 className="text-sm font-medium text-muted">{metric.label}</h3>

      <p className="mt-4 font-mono text-4xl font-semibold tracking-tight text-ink">
        <AnimatedCounter
          value={metric.value}
          decimals={metric.decimals}
          suffix={metric.suffix}
        />
      </p>

      <div className="mt-5" aria-hidden="true">
        <svg
          viewBox="0 0 100 2"
          preserveAspectRatio="none"
          className="h-0.5 w-full"
        >
          <rect x="0" y="0" width="100" height="2" className="fill-hairline" />
          <rect x="0" y="0" width={fill} height="2" className="fill-accent" />
        </svg>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted">
        {metric.description}
      </p>
    </article>
  );
}
