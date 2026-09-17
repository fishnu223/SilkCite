import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SITE_URL } from "@/lib/config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description =
  "See how Chinese AI discovers, recommends, and represents your brand across DeepSeek, Qwen, Kimi, Doubao, and Baidu.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SilkCite — Chinese AI Visibility Intelligence",
    template: "%s · SilkCite",
  },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "SilkCite",
    title: "SilkCite — Chinese AI Visibility Intelligence",
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SilkCite — Chinese AI Visibility Intelligence",
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
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable}`}>
      <body className="flex min-h-screen flex-col bg-paper text-ink">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />

        {/* Structured data. The `<` is escaped to prevent XSS via JSON. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
