import { ECOSYSTEMS } from "@/content/site";

export function EcosystemSection() {
  return (
    <section
      id="ecosystems"
      className="border-t border-hairline"
      aria-labelledby="ecosystems-heading"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <h2
          id="ecosystems-heading"
          className="display-tight max-w-2xl text-3xl font-semibold text-ink sm:text-4xl md:text-5xl"
        >
          One brand. Multiple AI ecosystems.
        </h2>
        <p className="mt-5 max-w-2xl text-lg text-muted">
          SilkCite measures and tests brand visibility across China&apos;s
          leading AI search and answer engines.
        </p>

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {ECOSYSTEMS.map((ecosystem) => (
            <li
              key={ecosystem.name}
              className="rounded-2xl border border-hairline bg-surface p-5 shadow-soft transition-shadow duration-300 hover:shadow-lift"
            >
              <span
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-soft font-semibold text-ink"
              >
                {ecosystem.name[0]}
              </span>
              <h3 className="mt-4 font-medium text-ink">{ecosystem.name}</h3>
              <p className="mt-1 text-sm leading-snug text-muted">
                {ecosystem.tagline}
              </p>
            </li>
          ))}
        </ul>

        <p className="mt-5 max-w-2xl font-mono text-xs leading-relaxed text-faint">
          Independent measurement — no partnerships or privileged access to any
          platform is implied.
        </p>
      </div>
    </section>
  );
}
