import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-14 sm:px-8 md:flex-row md:items-start md:justify-between">
        <div className="flex items-center gap-2.5">
          <BrandMark />
          <span className="font-serif text-xl leading-none tracking-tight">
            SilkCite
          </span>
        </div>

        <p className="max-w-sm text-sm leading-relaxed text-muted">
          AI visibility intelligence. We measure how AI search engines discover,
          recommend, and represent your brand.
        </p>

        <div className="flex items-center gap-6 text-sm text-muted">
          <Link
            href="/privacy"
            className="underline-offset-4 transition-colors hover:text-accent-strong hover:underline"
          >
            Privacy
          </Link>
          <span aria-hidden="true">·</span>
          <span>© {year} SilkCite</span>
        </div>
      </div>
    </footer>
  );
}
