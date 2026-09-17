import { ScheduleCallButton } from "@/components/ScheduleCallButton";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 pb-24 pt-20 sm:px-8 sm:pb-32 sm:pt-28">
        <p className="mb-8 font-mono text-xs uppercase tracking-[0.22em] text-muted">
          AI visibility intelligence
        </p>

        <h1 className="display-tight max-w-4xl text-5xl font-medium text-ink sm:text-6xl md:text-7xl">
          Your customers are asking AI.
          <br />
          <span className="text-accent-strong">
            What does AI say about you?
          </span>
        </h1>

        <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
          SilkCite measures how AI search engines discover, recommend, and
          represent your brand.
        </p>

        <div className="mt-10">
          <ScheduleCallButton />
        </div>
      </div>
    </section>
  );
}
