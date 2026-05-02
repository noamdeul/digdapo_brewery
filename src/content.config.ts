import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const beers = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/beers",
    generateId: ({ entry }) => entry.replace(/\.md$/, ""),
  }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    style: z.string(),
    batchDate: z.string(),
    abv: z.number().optional(),
    ibu: z.number().optional(),
    status: z.enum(["brewing", "on tap", "conditioning", "archived"]),
    shortDescription: z.string(),
    tastingNotes: z.string().optional(),
    ingredients: z.array(z.string()).optional(),
    heroImage: z.string().optional(),
    logoImage: z.string().optional(),
    gallery: z.array(z.string()).optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { beers };
