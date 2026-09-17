import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How SilkCite handles the small amount of information collected on this website.",
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
      <h1 className="display-tight text-4xl font-medium text-ink sm:text-5xl">
        Privacy
      </h1>

      <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-muted">
        <section>
          <h2 className="mb-3 text-base font-medium text-ink">
            What we collect
          </h2>
          <p>
            This website collects as little personal information as possible. If
            you choose to use the contact form, we collect only what you provide:
            your name, work email, company, and website. We do not collect this
            information unless you submit it.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-medium text-ink">Why we collect it</h2>
          <p>
            We use this information solely to respond to your enquiry — for
            example, to email you about scheduling a call. We do not use it for
            marketing unrelated to your request, and we do not sell or share it
            with third parties.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-medium text-ink">Scheduling calls</h2>
          <p>
            The “Schedule a Call” button opens Calendly, a third-party scheduling
            service. When you book through Calendly, Calendly processes the
            information you submit there according to{" "}
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
          <h2 className="mb-3 text-base font-medium text-ink">Storage & retention</h2>
          <p>
            Enquiry details are stored securely and retained only as long as
            needed to respond to you and keep a record of the enquiry. You may
            ask us to delete your information at any time.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-base font-medium text-ink">Contact</h2>
          <p>
            Questions about this notice or your data? Email{" "}
            <a
              href="mailto:privacy@silkcite.io"
              className="underline underline-offset-2 hover:text-accent-strong"
            >
              privacy@silkcite.io
            </a>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
