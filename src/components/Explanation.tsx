/**
 * A short, plain-language explanation of what the statistics mean and why
 * they matter to a buyer.
 */
export function Explanation() {
  return (
    <section className="border-t border-hairline" aria-labelledby="explanation-heading">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <h2
          id="explanation-heading"
          className="display-tight max-w-2xl text-3xl font-medium text-ink sm:text-4xl"
        >
          What these numbers mean.
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <p className="text-lg leading-relaxed text-muted">
            AI answers are generated, not ranked. When a customer asks an AI for
            a recommendation, it doesn&apos;t show ten blue links — it names a
            few companies and explains why. If your brand is missing from that
            answer, or described incorrectly, you effectively don&apos;t exist
            for that buyer.
          </p>

          <dl className="space-y-6">
            {[
              {
                term: "Mention → Recommendation → Citation",
                detail:
                  "Being mentioned is table stakes. Visibility only converts when an AI actively recommends you — and grounds that recommendation in a source it can cite.",
              },
              {
                term: "Entity accuracy",
                detail:
                  "How faithfully AI understands what you do, what you sell, and who you serve. A confident, wrong answer is worse than no answer.",
              },
              {
                term: "Competitor share & source coverage",
                detail:
                  "AI picks winners from what it has read. These two signals show who it is choosing instead of you — and whether authoritative sources are telling your story.",
              },
            ].map((item) => (
              <div key={item.term} className="border-t border-hairline pt-5">
                <dt className="font-medium text-ink">{item.term}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted">
                  {item.detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
