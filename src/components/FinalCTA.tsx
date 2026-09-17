import { LeadForm } from "@/components/LeadForm";
import { ScheduleCallButton } from "@/components/ScheduleCallButton";

export function FinalCTA({
  calendlyUrl,
  turnstileSiteKey,
  nonce,
}: {
  calendlyUrl: string;
  turnstileSiteKey?: string;
  nonce?: string;
}) {
  return (
    <section
      id="schedule"
      className="border-t border-hairline"
      aria-labelledby="cta-heading"
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <h2
              id="cta-heading"
              className="display-tight text-4xl font-medium text-ink sm:text-5xl"
            >
              See how AI sees your brand.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
              A short call, a custom AI-visibility report, and a clear picture
              of where your brand stands — and where to close the gap.
            </p>
            <div className="mt-8">
              <ScheduleCallButton href={calendlyUrl} />
            </div>
          </div>

          <LeadForm
            turnstileSiteKey={turnstileSiteKey}
            turnstileNonce={nonce}
          />
        </div>
      </div>
    </section>
  );
}
