import { MEASURES } from "@/content/site";

export function MeasuresSection() {
  return (
    <section
      className="border-t border-hairline"
      aria-labelledby="measures-heading"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <h2
          id="measures-heading"
          className="display-tight max-w-2xl text-3xl font-semibold text-ink sm:text-4xl md:text-5xl"
        >
          What SilkCite measures.
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MEASURES.map((measure) => (
            <article
              key={measure.title}
              className="rounded-2xl border border-hairline bg-surface p-6 shadow-soft transition-shadow duration-300 hover:shadow-lift sm:p-7"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent-strong">
                {measure.title}
              </p>
              <h3 className="mt-3 text-lg font-medium text-ink">
                {measure.question}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {measure.detail}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
