import { ECOSYSTEMS, MORE_SOURCES, TOTAL_SOURCES } from "@/content/site";

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
          SilkCite measures brand visibility across China&apos;s leading AI
          search and answer engines — and more, up to {TOTAL_SOURCES} AI and
          search sources.
        </p>

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {ECOSYSTEMS.map((ecosystem) => (
            <li
              key={ecosystem.name}
              className="flex flex-col rounded-2xl border border-hairline bg-surface p-5 shadow-soft transition-shadow duration-300 hover:shadow-lift"
            >
              <div className="flex h-11 items-center">
                {/* eslint-disable-next-line @next/next/no-img-element -- brand logos; next/image would add an inline style that conflicts with CSP */}
                <img
                  src={`/logos/${ecosystem.logo}`}
                  alt={`${ecosystem.name} logo`}
                  loading="lazy"
                  className="max-h-10 w-auto max-w-[140px] object-contain"
                />
              </div>
              <h3 className="mt-4 font-medium text-ink">{ecosystem.name}</h3>
              <p className="mt-1 text-sm leading-snug text-muted">
                {ecosystem.tagline}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap items-center gap-4 rounded-2xl border border-dashed border-hairline bg-surface/60 px-6 py-5">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink font-mono text-sm font-semibold text-surface">
            +{MORE_SOURCES}
          </span>
          <p className="text-sm leading-relaxed text-muted">
            And <span className="font-medium text-ink">{MORE_SOURCES} more</span>{" "}
            AI &amp; search sources — {TOTAL_SOURCES} monitored in total.
          </p>
        </div>

        <p className="mt-5 max-w-2xl font-mono text-xs leading-relaxed text-faint">
          Independent measurement — no partnerships or privileged access to any
          platform is implied.
        </p>
      </div>
    </section>
  );
}
