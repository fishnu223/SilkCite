import { AiChatVisual } from "@/components/AiChatVisual";
import { ScheduleCallButton } from "@/components/ScheduleCallButton";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-grid">
      <div className="mx-auto max-w-6xl px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="animate-fade-up">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              Chinese AI visibility intelligence
            </p>

            <h1 className="display-tight text-5xl font-semibold text-ink sm:text-6xl lg:text-7xl">
              Is Chinese AI recommending your brand?
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
              SilkCite measures how international brands are discovered,
              represented, recommended, and cited across China&apos;s leading AI
              search and answer engines.
            </p>

            <p className="mt-5 font-mono text-sm tracking-wide text-faint">
              DeepSeek · Qwen · Kimi · Doubao · Baidu
            </p>

            <div className="mt-9">
              <ScheduleCallButton />
            </div>
          </div>

          <AiChatVisual />
        </div>
      </div>
    </section>
  );
}
