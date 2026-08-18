# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Monorepo layout

Two apps under `apps/`, each with its own `node_modules` (no workspaces — keeps Strapi's strict peer deps out of the way of Next.js):

- [apps/web/](apps/web/) — Next.js 15 portfolio.
- [apps/cms/](apps/cms/) — Strapi 5 CMS (SQLite by default).

The root `package.json` orchestrates both via `concurrently`. Its `postinstall` cascades `npm install` to both apps, so `npm install` at the root is the single-command install.

## Commands (run from repo root)

- `npm install` — installs root + both apps (one-shot).
- `npm run dev` — starts Next.js (`:3000`) and Strapi (`:1337`) together. Ctrl-C kills both.
- `npm run dev:web` / `npm run dev:cms` — start one app only.
- `npm run build` — builds both. Strapi builds the admin panel; Next runs the full TypeScript typecheck.
- `npm run start` — runs both production builds together.
- `npm run lint` — `next lint` on the web app.

There is no test runner.

## Stack — web

Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS v4 + shadcn/ui. Animations via `motion/react` (the new package name for Framer Motion — import from `'motion/react'`, **not** `'framer-motion'`). Dark mode via `next-themes` (`attribute="class"`, `defaultTheme="dark"`).

Path alias: `@/*` → `./apps/web/src/*` (inside the web app's tsconfig).

## Stack — cms

Strapi 5 (TypeScript), SQLite via `better-sqlite3`. Admin panel at `http://localhost:1337/admin`. Content lives in `apps/cms/.tmp/data.db` (gitignored). Uploaded media in `apps/cms/public/uploads/` (gitignored).

## Content layer — Strapi with mock fallback

[apps/web/src/lib/content.ts](apps/web/src/lib/content.ts) is the single source of truth for fetching projects, the about page, and site settings. It dispatches based on env:

- If `STRAPI_URL` is set → fetch via [apps/web/src/lib/strapi.ts](apps/web/src/lib/strapi.ts).
- Otherwise → return seed data from [apps/web/src/lib/mock-data.ts](apps/web/src/lib/mock-data.ts).

This lets `npm run dev:web` work standalone without Strapi running. With the full monorepo `npm run dev`, both boot and the web app hits the local Strapi.

The shared `Project`/`AboutData`/`SiteSettings` types live in [apps/web/src/lib/types.ts](apps/web/src/lib/types.ts). The Strapi-shaped response is mapped to these types inside `strapi.ts` — if the Strapi schema changes, that's the only consumer-side file to update.

The two singleton fetchers (`fetchAboutFromStrapi`, `fetchSiteSettingsFromStrapi`) defensively fall back to mock data when Strapi returns `null` (i.e. the singleton hasn't been saved yet in the admin).

## Strapi content types

All four content types are pre-stamped as JSON so Strapi boots ready. Schemas live under [apps/cms/src/api/](apps/cms/src/api/) (one folder per content-type) with the schema, controller, route, and service files. Shared components live under [apps/cms/src/components/shared/](apps/cms/src/components/shared/).

- `project` (collection): title, slug (uid from title), description, buttonTitle, buttonUrl, archived, date, duration, mission, results, image (media), categories (relation → category, manyToMany), software/clientName (repeatable `shared.named-item`), phases (repeatable `shared.phase`), sections (repeatable `shared.section`).
- `category` (collection): name, slug, `categoryColor` + `categoryTextColor` (both `plugin::color-picker.color` custom fields — the badge background/border and its label color, one of each per category), projects (manyToMany back-relation).
- `about` (single): title, subtitle, description, tag, tags (repeatable `shared.tag-label`), cv (media file), availableForWork.
- `site-setting` (single): email, phone, linkedinUrl, partners (repeatable `shared.partner`). URL is `/api/site-settings` (Strapi pluralizes via `pluralName`).

[apps/cms/src/index.ts](apps/cms/src/index.ts) is a bootstrap hook that grants the Public role `find` + `findOne` permissions on every content-type the web app reads. It's idempotent — safe to re-run.

CORS is configured in [apps/cms/config/middlewares.ts](apps/cms/config/middlewares.ts) to allow `http://localhost:3000` and `WEB_PUBLIC_URL` (set this env var in production).

## Routes (web App Router)

- [apps/web/src/app/page.tsx](apps/web/src/app/page.tsx) — home (Header → Hero → Work → AboutMe → Contact → Footer). Fetches projects + about + settings in parallel via `Promise.all`.
- [apps/web/src/app/projects/[slug]/page.tsx](apps/web/src/app/projects/%5Bslug%5D/page.tsx) — project detail. SSG via `generateStaticParams`. Has `generateMetadata` for per-project OpenGraph. Illustrations don't get a detail page (they open the in-page `IllustrationModal` instead).
- [apps/web/src/app/sitemap.ts](apps/web/src/app/sitemap.ts), [apps/web/src/app/robots.ts](apps/web/src/app/robots.ts) — auto-generated.
- [apps/web/src/app/api/revalidate/route.ts](apps/web/src/app/api/revalidate/route.ts) — Strapi webhook target. Requires `REVALIDATE_SECRET` query param. Revalidates `/`, the `strapi` cache tag, and the matching `/projects/[slug]` if the payload includes a slug. Configure the webhook in Strapi admin → Settings → Webhooks.
- [apps/web/src/app/actions/contact.ts](apps/web/src/app/actions/contact.ts) — Server Action for the contact form. Uses `useActionState` on the client side. Sends via Resend if `RESEND_API_KEY` + `CONTACT_TO_EMAIL` are set, otherwise logs to the server console.

## Components

All under [apps/web/src/components/](apps/web/src/components/):
- **Section components** (`Header`, `Hero`, `Work`, `AboutMe`, `Contact`, `Footer`) — every one is `'use client'` because they use Motion / state / hooks. They take their content as props from the server-rendered page.
- **`Header`** uses `next-themes`'s `useTheme()`. The toggle is visually `hidden` but kept in the markup. On non-home routes, nav links route back to `/#section`; on home they smooth-scroll.
- **`Work`** uses `useRouter().push('/projects/[slug]')` for non-illustration cards. Illustration cards open `IllustrationModal` in place.
- **`ProjectCard`** — no `forwardRef` (React 19 doesn't need it; refs are regular props).
- [apps/web/src/components/ui/](apps/web/src/components/ui/) is shadcn/ui — Radix primitives wrapped with `cn()` from [apps/web/src/components/ui/utils.ts](apps/web/src/components/ui/utils.ts). Don't rebuild buttons/dialogs/etc. from scratch.
- [apps/web/src/components/OrganicShape.tsx](apps/web/src/components/OrganicShape.tsx) is referenced only inside JSX comment blocks. Kept around because the user is likely to restore the flower decorations.

## Styling

- **Tailwind CSS v4** via `@tailwindcss/postcss` (config is CSS-driven in [apps/web/src/app/globals.css](apps/web/src/app/globals.css); no `tailwind.config.js`).
- Design tokens (brand palette, shadcn variables, light/dark variants) all live in `globals.css`. Brand colors: `--color-green-dark`, `--color-green-medium`, `--color-green-light`, `--color-orange`, `--color-orange-light`, `--color-purple`.
- Hard-coded hex backgrounds (`#001616`, `#0C2723`, `#58CF80`, `#B1F2B2`, etc.) still appear inline in many components — they mirror the token values. Prefer using the CSS variables / Tailwind theme colors for new code.
- Fonts: `Space Grotesk` (body, `--font-space-grotesk`) and `Fascinate Inline` (display, `--font-fascinate`) loaded via `next/font/google` in [apps/web/src/app/layout.tsx](apps/web/src/app/layout.tsx). The `.fascinate-title` class in `globals.css` maps to the Fascinate variable.
- The `dark` class lands on `<html>` via `next-themes`. The home `<div>` in `layout.tsx` has the `bg-neutral-50 dark:bg-[#001616]` shell; section components add their own gradients.

## Images

Use `next/image`, never raw `<img>` for content images. Remote hosts must be allow-listed in [apps/web/next.config.ts](apps/web/next.config.ts) → `images.remotePatterns`. The Strapi pattern is built from `NEXT_PUBLIC_STRAPI_URL` / `STRAPI_URL` and scoped to `/uploads/**`. Currently allow-listed: `images.unsplash.com` plus whatever the Strapi env points at.

## First-boot setup (after `npm install`)

1. `npm run dev` from the root.
2. Open `http://localhost:1337/admin` → create the first admin user. The bootstrap hook auto-grants Public read on all content types.
3. Settings → Webhooks → create a webhook pointing at `http://localhost:3000/api/revalidate?secret=<value>` where `<value>` matches `REVALIDATE_SECRET` in `apps/web/.env.local`. Events: entry create/update/delete/publish/unpublish.
4. Content Manager: create at least one Category, then start adding Projects. Save the About and Site Settings singletons (mock fallback covers them until you do).

## Adding a new project

Add it via Strapi admin. The webhook revalidates the home and detail page within seconds. No code change required.

To work frontend-only without Strapi running, unset `STRAPI_URL` in `apps/web/.env.local`; the dispatcher then falls back to [apps/web/src/lib/mock-data.ts](apps/web/src/lib/mock-data.ts). Append projects there if you want to seed more.

## Adding/changing a `Project` field

If you change the `Project` interface in [apps/web/src/lib/types.ts](apps/web/src/lib/types.ts), update in lockstep: the seed data in [apps/web/src/lib/mock-data.ts](apps/web/src/lib/mock-data.ts), the Strapi mapper in [apps/web/src/lib/strapi.ts](apps/web/src/lib/strapi.ts), the renderers (`ProjectCard.tsx`, `apps/web/src/app/projects/[slug]/page.tsx`), and the Strapi schema in [apps/cms/src/api/project/content-types/project/schema.json](apps/cms/src/api/project/content-types/project/schema.json). There's no schema generator.
