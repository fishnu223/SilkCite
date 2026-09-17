import { MetricCard } from "@/components/MetricCard";
import { SampleBadge } from "@/components/SampleBadge";
import { SECONDARY_METRICS } from "@/content/metrics";

/**
 * A secondary row of supplementary metrics — a fuller, still clearly-labelled
 * picture of AI visibility.
 */
export function AdditionalMetrics() {
  return (
    <section
      className="border-t border-hairline"
      aria-labelledby="additional-heading"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2
            id="additional-heading"
            className="display-tight text-2xl font-medium text-ink sm:text-3xl"
          >
            A fuller picture.
          </h2>
          <SampleBadge />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SECONDARY_METRICS.map((metric) => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </div>
      </div>
    </section>
  );
}
