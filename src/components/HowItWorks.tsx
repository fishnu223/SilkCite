import { STEPS } from "@/content/site";

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="border-t border-hairline"
      aria-labelledby="how-heading"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <h2
          id="how-heading"
          className="display-tight text-3xl font-semibold text-ink sm:text-4xl"
        >
          How it works.
        </h2>

        <ol className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {STEPS.map((step) => (
            <li
              key={step.num}
              className="rounded-2xl border border-hairline bg-surface p-7 shadow-soft transition-shadow duration-300 hover:shadow-lift"
            >
              <span className="font-mono text-sm text-faint">
                {step.num} —
              </span>
              <h3 className="mt-3 text-lg font-semibold uppercase tracking-wide text-ink">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.detail}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
