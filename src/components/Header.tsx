import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { ScheduleCallButton } from "@/components/ScheduleCallButton";

/**
 * Minimal sticky header: brand mark + one conversion action. No complicated
 * navigation, per the brief.
 */
export function Header({ calendlyUrl }: { calendlyUrl: string }) {
  return (
    <header className="sticky top-0 z-50 border-b border-hairline/80 bg-paper/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-sm"
          aria-label="SilkCite — home"
        >
          <BrandMark />
          <span className="font-serif text-[22px] leading-none tracking-tight">
            SilkCite
          </span>
        </Link>

        <nav aria-label="Primary">
          <ScheduleCallButton href={calendlyUrl} variant="primarySm" />
        </nav>
      </div>
    </header>
  );
}
