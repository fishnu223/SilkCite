import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { serverEnv } from "@/lib/env";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const description =
  "SilkCite measures how AI search engines discover, recommend, and represent your brand.";

export const metadata: Metadata = {
  metadataBase: new URL(serverEnv.siteUrl),
  title: {
    default: "SilkCite — AI visibility intelligence",
    template: "%s · SilkCite",
  },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "SilkCite",
    title: "SilkCite — AI visibility intelligence",
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SilkCite — AI visibility intelligence",
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#e26969",
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SilkCite",
  url: serverEnv.siteUrl,
  logo: `${serverEnv.siteUrl}/logo.png`,
  description,
  sameAs: [],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Reading headers opts the layout into dynamic rendering, which is required
  // for per-request nonce-based CSP (see src/proxy.ts).
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-paper text-ink">
        <Header calendlyUrl={serverEnv.calendlyUrl} />
        <main className="flex-1">{children}</main>
        <Footer />

        {/* Structured data. The `<` is escaped to prevent XSS via JSON. */}
        <script
          type="application/ld+json"
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
