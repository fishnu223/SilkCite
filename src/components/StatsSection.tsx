import { MetricCard } from "@/components/MetricCard";
import { SampleBadge } from "@/components/SampleBadge";
import { ShareChart } from "@/components/ShareChart";
import { CORE_METRICS, SHARE_CHART } from "@/content/metrics";

/**
 * The visual centerpiece: six core AI-visibility metrics plus a comparative
 * share chart. Every figure is explicitly labelled as sample data.
 */
export function StatsSection() {
  return (
    <section
      id="stats"
      className="border-t border-hairline bg-surface/60"
      aria-labelledby="stats-heading"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <h2
          id="stats-heading"
          className="display-tight max-w-3xl text-3xl font-medium text-ink sm:text-4xl md:text-5xl"
        >
          The six signals that decide AI visibility.
        </h2>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <SampleBadge />
          <p className="text-sm text-faint">
            Illustrative figures, not a live dataset.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CORE_METRICS.map((metric) => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </div>

        <div className="mt-16">
          <ShareChart title={SHARE_CHART.title} bars={SHARE_CHART.bars} />
        </div>
      </div>
    </section>
  );
}
