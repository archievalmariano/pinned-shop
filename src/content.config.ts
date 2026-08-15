import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Pinboard — the editorial journal. Markdown files loaded from src/content.
// Structured so a headless CMS could replace the loader without UI changes.
const pinboard = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pinboard' }),
  schema: z.object({
    title: z.string(),
    dek: z.string(),
    date: z.coerce.date(),
    author: z.string().default('The Pinned desk'),
    category: z.enum(['Collecting', 'Objects', 'Travel', 'Reading', 'Design', 'Notes']),
    readingMinutes: z.number().default(4),
    accent: z.string().default('#2450c8'),
    /** Optional loose tie-in to shop products. */
    relatedSlugs: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { pinboard };
