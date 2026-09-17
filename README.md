# SilkCite

**AI visibility intelligence.** SilkCite measures how AI search engines
discover, recommend, and represent your brand.

This repository is a production-ready, full-stack foundation: a premium,
minimal public website centered on one conversion action — **Schedule a Call** —
plus a small, secured lead-capture API backed by PostgreSQL.

> **Data integrity.** All statistics on the public site are clearly labelled
> **“Sample analysis — not live data”**. They are illustrative only and are
> never presented as real SilkCite client results. When live data is connected,
> the UI must keep live data visually distinct from demonstration data.

---

## Stack

| Layer        | Technology                                                        |
| ------------ | ----------------------------------------------------------------- |
| Frontend     | Next.js 16 (App Router, Turbopack), React 19, TypeScript          |
| Styling      | Tailwind CSS v4                                                    |
| Database     | PostgreSQL via Prisma 7 (driver-adapter architecture, `pg`)        |
| Validation   | Zod 4 (strict schemas, rejects unknown fields)                     |
| Rate limiting| Upstash Redis (distributed) with an in-memory fallback             |
| Bot protection | Honeypot field + optional Cloudflare Turnstile                   |
| Security     | Strict nonce-based CSP, security headers, CSRF origin checks       |

---

## Getting started

Prerequisites: Node.js 20+, [pnpm](https://pnpm.io) 10+.

```bash
# 1. Install dependencies (also runs `prisma generate`)
pnpm install

# 2. Create your local env file
cp .env.example .env.local

# 3. Run the dev server
pnpm dev
```

Open http://localhost:3000.

> The marketing site runs **without a database**. When `DATABASE_URL` is empty,
> `/api/leads` returns a safe `503` (“unavailable”) instead of crashing, so you
> can develop the whole site before provisioning PostgreSQL.

### Scripts

| Command              | Purpose                                          |
| -------------------- | ------------------------------------------------ |
| `pnpm dev`           | Start the dev server                              |
| `pnpm build`         | Production build                                  |
| `pnpm start`         | Serve the production build                        |
| `pnpm lint`          | ESLint                                            |
| `pnpm typecheck`     | TypeScript check (`tsc --noEmit`)                 |
| `pnpm db:generate`   | Regenerate the Prisma client                      |
| `pnpm db:migrate`    | Create/apply dev migrations against your database |
| `pnpm db:deploy`     | Apply migrations (production)                     |
| `pnpm db:studio`     | Open Prisma Studio                                |

---

## Environment variables

Copy `.env.example` to `.env.local` (local) or configure these in your host.
Only `NEXT_PUBLIC_*` variables are exposed to the browser.

| Variable                        | Required | Notes |
| ------------------------------- | -------- | ----- |
| `NEXT_PUBLIC_CALENDLY_URL`      | ✅       | Public Calendly page used by every **Schedule a Call** button. Must be `https://`. Opened in a new tab. |
| `NEXT_PUBLIC_SITE_URL`          | ✅       | Canonical origin (no trailing slash). Drives canonical URLs, `sitemap.xml`, `robots.txt`, and Open Graph metadata. |
| `DATABASE_URL`                  | optional | PostgreSQL connection string (server-only). Use a pooled endpoint on serverless. |
| `TURNSTILE_SECRET_KEY`          | optional | Cloudflare Turnstile secret (server-only). Enables Turnstile when set together with the site key. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`| optional | Cloudflare Turnstile site key (public). |
| `UPSTASH_REDIS_REST_URL`        | optional | Enables distributed rate limiting. |
| `UPSTASH_REDIS_REST_TOKEN`      | optional | Enables distributed rate limiting. |
| `TRUST_PROXY_HEADERS`           | optional | Set to `"true"` to trust `X-Forwarded-For` for client IP. Auto-enabled on Vercel. |
| `LOG_HASH_SALT`                 | optional | Salt used to hash identifiers before they are logged. |
| `ALLOWED_ORIGINS`               | optional | Comma-separated extra origins allowed to call the API. |
| `DATABASE_POOL_MAX`             | optional | PostgreSQL pool size (default `3`). |

The Calendly URL is **never hardcoded** in source — the server reads and
validates it at runtime and fails loudly if it is missing or not `https://`.

---

## Database

The schema is in [`prisma/schema.prisma`](prisma/schema.prisma); the initial
migration is in [`prisma/migrations`](prisma/migrations). The `Lead` model
stores exactly four fields (`name`, `email`, `company`, `website`) plus
timestamps, uses a UUID primary key, and has a unique index on `email` (for
duplicate suppression) and an index on `createdAt`.

```bash
# Point DATABASE_URL at your database, then:
pnpm db:deploy        # apply migrations (any environment)
# or, for dev with migration authoring:
pnpm db:migrate
```

Prisma 7 notes: the connection string lives in [`prisma7.config.ts`](prisma7.config.ts)
(CLI) and [`src/lib/prisma.ts`](src/lib/prisma.ts) (runtime), **not** in
`schema.prisma`. Run `pnpm db:generate` after editing the schema.

---

## Deployment (Vercel)

1. Push this repository to Git.
2. In Vercel, import the project. Framework preset: **Next.js**; package manager: **pnpm**.
3. Set the environment variables from the table above (at minimum
   `NEXT_PUBLIC_CALENDLY_URL` and `NEXT_PUBLIC_SITE_URL`).
4. Provision PostgreSQL (e.g. Neon/Supabase/RDS) and set `DATABASE_URL` to a
   **pooled** connection string with `sslmode=require`.
5. Deploy, then run `pnpm db:deploy` once (or add it as the build command's
   final step: `prisma migrate deploy && next build`) to apply the migration.

The build already runs `prisma generate` via `postinstall`.

---

## Security

Implemented and enforced from day one:

- **Strict CSP** with a per-request nonce (`src/proxy.ts`). `script-src` uses
  `'strict-dynamic'`; `style-src` uses the nonce (no `'unsafe-inline'`). This
  requires dynamic rendering — the homepage and `/privacy` are server-rendered
  per request (see “tradeoff” below).
- **Security headers** (`next.config.ts`): `X-Content-Type-Options`,
  `X-Frame-Options` + `frame-ancestors 'none'`, `Referrer-Policy`,
  `Permissions-Policy`, `Strict-Transport-Security`, `X-DNS-Prefetch-Control`.
- **CSRF** via strict same-origin checks (`Origin` + `Sec-Fetch-Site`) on
  state-changing requests. No CORS headers are emitted, so cross-origin reads
  are blocked by the browser by default.
- **Rate limiting** on the API (per client IP; distributed via Upstash when
  configured, in-memory fallback otherwise). Fails closed if the limiter errors.
- **Bot protection**: a honeypot field (non-empty submissions are silently
  dropped, never stored) and optional Cloudflare Turnstile.
- **Strict input validation** with Zod (`z.strictObject` rejects unknown
  fields), length bounds, control-character stripping, and email/URL
  normalization. `javascript:` and other non-http(s) schemes are rejected.
- **Parameterized database access only** (Prisma); no raw SQL from user input.
- **No secret exposure**: server secrets are read only from the environment and
  never imported by client components. `.env.example` contains names only.
- **Safe errors**: clients receive generic messages; details are logged
  server-side as structured JSON. Identifiers are hashed before logging.
- **XSS**: no user content is ever rendered; the only `dangerouslySetInnerHTML`
  (JSON-LD) escapes `<` characters.
- **Dependency vulnerabilities**: `pnpm audit` is clean. Two vulnerable
  transitive deps of the Prisma CLI were pinned to patched versions via
  `overrides` in `pnpm-workspace.yaml`.

### Nonce-CSP tradeoff

A nonce-based CSP is stricter than `'unsafe-inline'`, but it means pages cannot
be statically prerendered or CDN-cached — they are server-rendered per request.
For a small, fast landing page this is the recommended, hardened default. If
you later need full static caching, see the Next.js
[Content Security Policy guide](https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy)
for the SRI/hash alternative and switch accordingly.

### Enabling Turnstile

Turnstile is **off by default** so the normal experience has no friction and no
third-party CSP surface. To enable it: set both `TURNSTILE_SECRET_KEY` and
`NEXT_PUBLIC_TURNSTILE_SITE_KEY`. The proxy automatically adds
`challenges.cloudflare.com` to the CSP only when the site key is configured.

---

## Project structure

```
prisma/                 schema + migrations
public/                 logo.png, mark.png (brand assets)
src/
  app/                  routes: page, /privacy, /api/leads, sitemap, robots, og-image
  components/           UI (server + client components)
  content/metrics.ts    sample/illustrative metric data (clearly labelled)
  lib/                  env, prisma, rate-limit, http, logger, turnstile, leads/
  proxy.ts              per-request nonce + Content-Security-Policy
  types/                ambient types (Turnstile)
```

An authenticated admin system can be added later without restructuring: the
API layer (`src/lib/leads`, `src/lib/http`) is already separated from the UI,
and `Lead` has the indexes a future admin view needs. When that happens, use an
established auth library (e.g. Auth.js/NextAuth) — never hand-rolled password
handling.

---

## License

Private. © SilkCite.
