import { AnimatedCounter } from "@/components/AnimatedCounter";
import { SampleBadge } from "@/components/SampleBadge";
import { STATS } from "@/content/site";

export function StatsSection() {
  return (
    <section
      className="border-t border-hairline bg-surface/50"
      aria-labelledby="stats-heading"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <h2 id="stats-heading" className="sr-only">
          AI visibility at a glance
        </h2>

        <SampleBadge label="Illustrative SilkCite Analysis" />

        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-hairline bg-hairline lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="bg-surface p-7 sm:p-9">
              <dd className="font-mono text-5xl font-semibold tracking-tight text-ink sm:text-6xl">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={0}
                />
              </dd>
              <dt className="mt-3 text-sm leading-snug text-muted">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>

        <p className="mt-4 max-w-2xl font-mono text-xs leading-relaxed text-faint">
          Example data shown for demonstration purposes. Actual results vary by
          brand, category, query, market, and AI system.
        </p>
      </div>
    </section>
  );
}
