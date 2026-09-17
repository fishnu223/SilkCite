# SilkCite

**AI visibility intelligence.** SilkCite measures how AI search engines
discover, recommend, and represent your brand.

A minimal, static marketing site with a single conversion action:
**Schedule a Call** (opens your Calendly page in a new tab).

> **Data integrity.** All statistics on the site are clearly labelled
> **“Sample analysis — not live data”** — illustrative only, never presented
> as real client results.

## Stack

Next.js 16 (App Router, static) · React 19 · TypeScript · Tailwind CSS v4.

No database, no API routes, no forms — Calendly handles scheduling and lead
capture.

## Local development

```bash
pnpm install
cp .env.example .env.local   # then fill in your Calendly URL
pnpm dev
```

Open http://localhost:3000.

## Environment variables

Only two, both public (inlined at build time):

| Variable                   | Purpose                                        |
| -------------------------- | ---------------------------------------------- |
| `NEXT_PUBLIC_CALENDLY_URL` | Your public Calendly page (must be `https://`) |
| `NEXT_PUBLIC_SITE_URL`     | Canonical origin, used for SEO metadata        |

The Calendly URL is never hardcoded in source.

## Deploy to Vercel

1. Push this repo to GitHub and import it in Vercel (preset: **Next.js**).
2. Set `NEXT_PUBLIC_CALENDLY_URL` and `NEXT_PUBLIC_SITE_URL` in
   **Project → Settings → Environment Variables**.
3. Deploy.

The site builds to a fully static bundle (CDN-cached on Vercel) and ships
security headers (CSP, HSTS, X-Frame-Options, etc.) configured in
`next.config.ts`.

## Scripts

| Command            | Purpose             |
| ------------------ | ------------------- |
| `pnpm dev`         | Dev server          |
| `pnpm build`       | Production build    |
| `pnpm start`       | Serve the build     |
| `pnpm lint`        | ESLint              |
| `pnpm typecheck`   | TypeScript check    |

## Structure

```
src/app/          routes: page, /privacy, sitemap, robots, og-image
src/components/   UI sections and animated stats
src/content/      sample metric data (clearly labelled)
src/lib/config.ts public site config (env-driven)
public/           brand assets (logo, mark)
```

© SilkCite.
