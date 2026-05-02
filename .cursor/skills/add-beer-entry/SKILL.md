---
name: add-beer-entry
description: Create a new beer entry in the Digdapo Brewery Astro site, including the Markdown content file, frontmatter that matches the Zod schema, and the image folder layout under public/. Use when the user asks to add, create, draft, or scaffold a new beer, batch, or brew entry on this site.
---

# Add a New Beer Entry

This skill creates a new beer for the Digdapo Brewery Astro site. Each beer is a single Markdown file in `src/content/beers/` validated by the Zod schema in `src/content.config.ts`. No code changes are required to add a beer.

## Workflow

Copy this checklist and track progress:

```
- [ ] Step 1: Gather required info from the user
- [ ] Step 2: Decide filename, slug, and image folder
- [ ] Step 3: Create the Markdown file with frontmatter
- [ ] Step 4: Create the public image folder (if images provided)
- [ ] Step 5: Verify against the schema
```

### Step 1: Gather required info

Required fields (ask the user if missing): `title`, `style`, `batchDate` (YYYY-MM-DD), `status`, `shortDescription`.

Optional fields: `abv`, `ibu`, `tastingNotes`, `ingredients`, `heroImage`, `logoImage`, `gallery`, `featured` (defaults to `false`).

Sensible defaults you may apply without asking:
- `featured: false` (only set `true` if the user wants it on the home page)
- Omit optional fields entirely if the user has no info — do not write empty strings or `0` placeholders

### Step 2: Filename, slug, and image folder

- **Filename**: `src/content/beers/YYYY-MM-<kebab-slug>.md` (year-month prefix from `batchDate`).
  - Example: `batchDate: 2026-04-17` and title `Red Grapefruit Hazy IPA` → `src/content/beers/2026-04-red-grapefruit-hazy-ipa.md`.
- **Frontmatter `slug`**: kebab-case from the title, **without** the `YYYY-MM-` prefix (e.g. `red-grapefruit-hazy-ipa`).
  - For re-brews of the same name, disambiguate with a suffix like `-batch-12` (see `2024-12-elvis-juice.md` → slug `elvis-juice-batch-12`).
- **Image folder**: `public/images/beers/YYYY-MM-<kebab-slug>/` — same prefix as the filename. Image paths in frontmatter are relative to `public/` (no leading slash).

### Step 3: Create the Markdown file

Use this template. **Remove any optional field the user did not provide**; do not leave empty strings or zero values for unknown specs.

```markdown
---
title: "Beer Name"
slug: "beer-name"
style: "IPA"
batchDate: "YYYY-MM-DD"
abv: 5.2
ibu: 30
status: "brewing"
shortDescription: "One or two sentences about the beer."
tastingNotes: "Aroma, flavor, mouthfeel, finish."
ingredients:
  - 6 kg Pale Ale Malt
  - 30 g Citra dry hop
  - Verdant IPA yeast
heroImage: "images/beers/YYYY-MM-beer-name/hero.jpg"
logoImage: "images/beers/YYYY-MM-beer-name/label.png"
gallery:
  - "images/beers/YYYY-MM-beer-name/photo1.jpg"
featured: false
---

## The Story

What inspired this beer? Why was it brewed?

## Brew Notes

OG, FG, fermentation notes, dry-hop schedule, bottling date, anything worth remembering.
```

### Step 4: Create the public image folder

If the user references images in `heroImage`, `logoImage`, or `gallery`, create the folder `public/images/beers/YYYY-MM-<kebab-slug>/` so the paths resolve. Do not invent image filenames the user did not mention. If no images are available yet, omit those frontmatter fields.

### Step 5: Verify against the schema

The schema lives at `src/content.config.ts`. Confirm:

- `title`, `slug`, `style`, `batchDate`, `shortDescription` are non-empty strings.
- `status` is exactly one of: `brewing`, `on tap`, `conditioning`, `archived`.
- `abv` and `ibu` are numbers (not strings) when present.
- `ingredients` and `gallery` are arrays of strings when present.
- `featured` is a boolean (defaults to `false`).
- Image paths start with `images/beers/...` (no leading slash, no `/public/` prefix).

After creating the file, run `npm run build` if the user wants to confirm the schema validates — Astro will fail the build on any mismatch.

## Field Reference

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | yes | Display name. |
| `slug` | string | yes | Kebab-case, no `YYYY-MM-` prefix. Used in URL `/beers/<slug>`. |
| `style` | string | yes | Free-form (e.g. `IPA`, `NEIPA`, `Belgian Tripel`). |
| `batchDate` | string | yes | `YYYY-MM-DD`. |
| `status` | enum | yes | `brewing` \| `on tap` \| `conditioning` \| `archived`. |
| `shortDescription` | string | yes | One-line summary used on cards. |
| `abv` | number | no | e.g. `6.4`. |
| `ibu` | number | no | e.g. `30`. |
| `tastingNotes` | string | no | Single string, not a list. |
| `ingredients` | string[] | no | Free-form lines; quantities are welcome. |
| `heroImage` | string | no | Path under `public/`, e.g. `images/beers/2026-04-foo/hero.jpg`. |
| `logoImage` | string | no | Label art path under `public/`. |
| `gallery` | string[] | no | List of image paths under `public/`. |
| `featured` | boolean | no | `true` to surface on the home page. Defaults to `false`. |

## Examples from the Repo

- Minimal recent batch with images: `src/content/beers/2025-10-tall-tale.md`
- Re-brewed name disambiguated with batch suffix: `src/content/beers/2024-12-elvis-juice.md` (slug `elvis-juice-batch-12`)
- Rich entry with ingredients, hero, gallery, and prose: `src/content/beers/2026-04-red-grapefruit-hazy-ipa.md`
- Bare template: `beer_templates/BEER_TEMPLATE.md`
