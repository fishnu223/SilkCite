import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How SilkCite handles information on this website.",
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
      <h1 className="display-tight text-4xl font-medium text-ink sm:text-5xl">
        Privacy
      </h1>

      <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-muted">
        <section>
          <h2 className="mb-3 text-base font-medium text-ink">What we collect</h2>
          <p>
            This website does not collect or store personal information directly.
            There are no forms and no marketing trackers on the site itself.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-medium text-ink">Scheduling a call</h2>
          <p>
            The “Book a Consultation” button opens Calendly, a third-party scheduling
            service. When you book through Calendly, the information you submit
            there is processed by Calendly according to{" "}
            <a
              href="https://calendly.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-accent-strong"
            >
              Calendly&apos;s privacy policy
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-medium text-ink">Contact</h2>
          <p>
            Questions about this notice? Email{" "}
            <a
              href="mailto:info@silkcite.io"
              className="underline underline-offset-2 hover:text-accent-strong"
            >
              info@silkcite.io
            </a>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
