import { ScheduleCallButton } from "@/components/ScheduleCallButton";

export function FinalCTA() {
  return (
    <section
      id="book"
      className="border-t border-hairline bg-grid"
      aria-labelledby="cta-heading"
    >
      <div className="mx-auto max-w-4xl px-5 py-24 text-center sm:px-8 sm:py-32">
        <h2
          id="cta-heading"
          className="display-tight text-4xl font-semibold text-ink sm:text-5xl md:text-6xl"
        >
          Find out what Chinese AI says about your brand.
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          See where your brand appears, which competitors appear instead, and
          what sources shape AI&apos;s understanding of your company.
        </p>

        <div className="mt-10 flex justify-center">
          <ScheduleCallButton />
        </div>

        <p className="mt-5 font-mono text-xs uppercase tracking-[0.16em] text-faint">
          Private 30-minute consultation
        </p>
      </div>
    </section>
  );
}
