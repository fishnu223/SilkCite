/**
 * Secondary message: the positioning statement that contrasts SilkCite with
 * traditional SEO.
 */
export function SecondaryMessage() {
  return (
    <section className="border-t border-hairline" aria-labelledby="secondary-heading">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <h2
          id="secondary-heading"
          className="display-tight max-w-4xl text-3xl font-medium leading-tight text-ink sm:text-4xl md:text-5xl"
        >
          Traditional SEO tells you where you rank.
          <br />
          <span className="font-serif italic text-accent-strong">
            SilkCite tells you whether AI recommends you.
          </span>
        </h2>
      </div>
    </section>
  );
}
