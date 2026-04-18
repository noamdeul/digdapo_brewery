# Digdapo Brewery

Craft beer website built with [Astro](https://astro.build) and deployed to GitHub Pages.

## Local Development

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static output in dist/
npm run preview   # preview the production build
```

## Adding a New Beer

1. Create a Markdown file in `src/content/beers/` (e.g. `my-new-beer.md`).
2. Add the required frontmatter at the top:

```yaml
---
title: "My New Beer"
slug: "my-new-beer"
style: "Pale Ale"
batchDate: "2026-04-01"
abv: 5.2
ibu: 30
status: "on tap"           # "brewing" | "on tap" | "conditioning" | "archived"
shortDescription: "A short sentence about the beer."
tastingNotes: "What it tastes like."
ingredients:
  - Pale malt
  - Cascade hops
  - American ale yeast
heroImage: "images/beers/my-new-beer-hero.jpg"
logoImage: "images/beers/my-new-beer-label.png"   # optional
gallery:                                            # optional
  - "images/beers/my-new-beer-pour.jpg"
  - "images/beers/my-new-beer-glass.jpg"
featured: true              # show on the home page
---

Write any additional story or brew notes here in Markdown.
```

3. Drop images into `public/images/beers/` using the paths you referenced in the frontmatter.
4. Commit and push — the GitHub Actions workflow builds and deploys automatically.

## Deployment

The site deploys to GitHub Pages via `.github/workflows/deploy.yml` on every push to `main`.

Before your first deploy, enable **GitHub Pages** in your repo settings:
- Go to **Settings → Pages**
- Set source to **GitHub Actions**

Update `astro.config.mjs` with your actual GitHub username and repo name:

```js
export default defineConfig({
  site: "https://YOUR_USERNAME.github.io",
  base: "/digdapo_brewery/",
});
```

## Project Structure

```
src/
  content/beers/   ← one Markdown file per beer
  pages/           ← home, beers index, beer detail
  components/      ← BeerCard and other reusable pieces
  layouts/         ← shared page shell
  styles/          ← global theme tokens
public/
  images/brand/    ← brewery logo and brand assets
  images/beers/    ← beer photos, labels, gallery images
```
