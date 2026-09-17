import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { ScheduleCallButton } from "@/components/ScheduleCallButton";

/**
 * Minimal sticky header: brand mark, two anchor links, and the booking CTA.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-hairline/70 bg-paper/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-sm"
          aria-label="SilkCite — home"
        >
          <BrandMark />
          <span className="text-[20px] font-semibold tracking-tight">
            SilkCite
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="flex items-center gap-6 sm:gap-8"
        >
          <a
            href="#ecosystems"
            className="hidden text-sm text-muted transition-colors hover:text-ink sm:block"
          >
            Chinese AI
          </a>
          <a
            href="#how-it-works"
            className="hidden text-sm text-muted transition-colors hover:text-ink sm:block"
          >
            How It Works
          </a>
          <ScheduleCallButton variant="primarySm" />
        </nav>
      </div>
    </header>
  );
}
