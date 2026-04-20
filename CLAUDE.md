# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Digdapo Brewery — a craft beer showcase website built with **Astro 5** (static output) and deployed to **GitHub Pages** at `noamdeul.github.io/digdapo_brewery/`.

## Commands

```bash
npm run dev       # Dev server at localhost:4321
npm run build     # Static build to dist/
npm run preview   # Preview production build
```

No linter, formatter, or test suite is configured.

## Architecture

- **Astro Content Collections**: Each beer is a Markdown file in `src/content/beers/` with Zod-validated frontmatter (schema in `src/content.config.ts`). Adding a beer = adding a `.md` file; no code changes needed.
- **Static generation**: All pages are pre-rendered. Beer detail pages use `getStaticPaths()` in `src/pages/beers/[slug].astro`.
- **No UI framework**: All client-side interactivity (beer filters, mobile nav, lightbox) is vanilla JS in `<script>` tags inside `.astro` files.
- **Styling**: Global CSS custom properties in `src/styles/global.css` — dark theme with cream/amber/rust palette, Playfair Display headings + Inter body text.

## Content Model

Beer frontmatter fields: `title`, `slug`, `style`, `batchDate`, `status` (brewing | on tap | conditioning | archived), `shortDescription`, `abv?`, `ibu?`, `tastingNotes?`, `ingredients?`, `heroImage?`, `logoImage?`, `gallery?`, `featured?`. Template at `beer_templates/BEER_TEMPLATE.md`.

## Key Conventions

- Image paths in frontmatter are relative to `public/` (e.g. `images/beers/my-beer-hero.jpg` → `public/images/beers/my-beer-hero.jpg`).
- The `base` path in `astro.config.mjs` is `/digdapo_brewery/` — all asset references must account for this.
- Deployment is automatic via GitHub Actions (`.github/workflows/deploy.yml`) on push to `main`.
