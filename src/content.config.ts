// Content Collections: each collection is a folder of Markdown files, one per language,
// at `src/content/<collection>/<lang>/<slug>.md`. Zod checks every file's frontmatter at build time.
// Rules that span several files (both languages present, references exist, ...) live in
// `src/lib/content/validate.ts`.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Entry id = path without extension, e.g. `zh-tw/order-system`.
const markdownIn = (collection: string) =>
  glob({
    pattern: '*/*.md',
    base: `./src/content/${collection}`,
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  });

const projects = defineCollection({
  loader: markdownIn('projects'),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      startDate: z.coerce.date(),
      // Missing endDate means the Project is ongoing.
      endDate: z.coerce.date().optional(),
      role: z.string(),
      tech: z.array(z.string()).min(1),
      outcomes: z.array(z.string()).min(1),
      confidential: z.boolean().default(false),
      // Replaces the client's name on a Confidential Project, e.g. "金融業" / "Finance".
      clientIndustry: z.string().optional(),
      featured: z.boolean().default(false),
      // Slug of the Experience this Project belongs to.
      experience: z.string().optional(),
      github: z.url().optional(),
      demo: z.url().optional(),
      cover: image().optional(),
    }),
});

const experiences = defineCollection({
  loader: markdownIn('experiences'),
  schema: z.object({
    organization: z.string(),
    title: z.string(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date().optional(),
    location: z.string().optional(),
    description: z.string(),
  }),
});

const services = defineCollection({
  loader: markdownIn('services'),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number().int(),
    // Slugs of Projects that show this Service in action.
    projects: z.array(z.string()).min(1),
  }),
});

// Single entry per language (`about/<lang>/about.md`); the Markdown body is the self-introduction.
const about = defineCollection({
  loader: markdownIn('about'),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      headline: z.string(),
      photo: image(),
      photoAlt: z.string(),
    }),
});

export const collections = { projects, experiences, services, about };
