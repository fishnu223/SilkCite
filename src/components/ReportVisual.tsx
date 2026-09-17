import { AnimatedCounter } from "@/components/AnimatedCounter";
import { SampleBadge } from "@/components/SampleBadge";
import { REPORT_METRICS } from "@/content/site";

export function ReportVisual() {
  return (
    <section
      className="border-t border-hairline"
      aria-labelledby="report-heading"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2
              id="report-heading"
              className="display-tight text-3xl font-semibold text-ink sm:text-4xl"
            >
              A report that reads like intelligence.
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
              Every analysis turns raw AI answers into a clear, decision-ready
              view of your Chinese AI visibility.
            </p>
          </div>

          <div className="glass rounded-3xl p-6 shadow-lift sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
                  AI Visibility Analysis
                </p>
                <p className="mt-1 text-xl font-semibold text-ink">
                  Example Health
                </p>
              </div>
              <SampleBadge />
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {REPORT_METRICS.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-xl bg-surface/70 p-4"
                >
                  <dt className="font-mono text-[11px] uppercase tracking-wide text-faint">
                    {metric.label}
                  </dt>
                  <dd className="mt-1 text-2xl font-semibold text-ink">
                    <AnimatedCounter
                      value={metric.value}
                      suffix={metric.suffix}
                      decimals={0}
                    />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
