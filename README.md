# Eco-Design Portfolio

Portfolio site for an eco-design freelancer. Next.js 15 (App Router) + React 19 + Tailwind v4, with a Strapi CMS as the content source (and a built-in mock fallback so the site works without Strapi during local development).

## Getting started

```bash
npm i
npm run dev
```

Open <http://localhost:3000>. Content comes from `src/lib/mock-data.ts` by default — no backend required.

## Connecting Strapi

1. Set up the content types described in [CLAUDE.md](CLAUDE.md) (`project`, `category`, single types `about` and `site-settings`).
2. Copy `.env.example` to `.env.local` and fill in `STRAPI_URL` (+ `STRAPI_TOKEN` if needed).
3. Add a Strapi webhook pointing at `https://your-site/api/revalidate?secret=<REVALIDATE_SECRET>` so edits trigger ISR.

## Build & deploy

```bash
npm run build   # production build (runs TypeScript typecheck)
npm start       # serve the build on port 3000
```

Deploy as a Next.js standalone Node process behind Nginx on the same VPS as Strapi (see the plan in `/home/cpellat/.claude/plans/`).
