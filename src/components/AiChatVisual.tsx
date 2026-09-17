import { CHAT } from "@/content/site";

/**
 * Simulated DeepSeek-style answer, styled like a proprietary intelligence
 * report rather than a chatbot. Clearly labelled as illustrative.
 */
export function AiChatVisual() {
  return (
    <div className="relative animate-fade-up [animation-delay:120ms]">
      {/* Ambient glow behind the glass card */}
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[40px] bg-accent/20 blur-3xl"
      />

      <div className="glass rounded-3xl p-5 shadow-lift sm:p-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-hairline/70 pb-4">
          <div className="flex items-center gap-2.5">
            <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-deepseek" />
            <span className="text-sm font-medium">{CHAT.model}</span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
            Simulated answer
          </span>
        </div>

        {/* Query */}
        <p className="mt-5 rounded-2xl rounded-tl-sm bg-slate-soft px-4 py-3 text-sm leading-relaxed text-ink">
          <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
            Query
          </span>
          {CHAT.query}
        </p>

        {/* Answer intro */}
        <p className="mt-4 text-sm leading-relaxed text-muted">{CHAT.intro}</p>

        {/* Ranked brands */}
        <ol className="mt-4 space-y-2">
          {CHAT.brands.map((brand) => (
            <li
              key={brand.rank}
              className={
                brand.yours
                  ? "flex items-center gap-3 rounded-xl bg-accent-soft/50 px-3.5 py-2.5 ring-1 ring-accent/40"
                  : "flex items-center gap-3 rounded-xl bg-surface/60 px-3.5 py-2.5"
              }
            >
              <span
                className={
                  brand.yours
                    ? "font-mono text-xs font-semibold text-accent-strong"
                    : "font-mono text-xs text-faint"
                }
              >
                #{brand.rank}
              </span>
              <span
                className={
                  brand.yours
                    ? "flex-1 text-sm font-semibold text-ink"
                    : "flex-1 text-sm text-muted"
                }
              >
                {brand.name}
              </span>
              {brand.yours ? (
                <span className="rounded-full bg-surface px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-accent-strong">
                  Your brand
                </span>
              ) : null}
            </li>
          ))}
        </ol>

        {/* Data indicators */}
        <dl className="mt-5 grid grid-cols-5 gap-1.5 border-t border-hairline/70 pt-4">
          {CHAT.indicators.map((indicator) => (
            <div
              key={indicator.label}
              className="rounded-xl bg-surface/70 px-2 py-2 text-center"
            >
              <dt className="font-mono text-[9px] uppercase tracking-[0.12em] text-faint">
                {indicator.label}
              </dt>
              <dd className="mt-0.5 text-sm font-semibold text-ink">
                {indicator.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
        Illustrative SilkCite Analysis
      </p>
    </div>
  );
}
