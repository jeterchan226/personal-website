// The only way pages read content. Every getter first runs the cross-file validation once,
// so a broken content set fails the build no matter which page loads first.
import { getCollection, type CollectionEntry, type CollectionKey } from 'astro:content';
import type { Lang } from '../../i18n/ui';
import { validateContent, type ContentEntry } from './validate';

export type Project = CollectionEntry<'projects'>;
export type Experience = CollectionEntry<'experiences'>;
export type Service = CollectionEntry<'services'>;
export type About = CollectionEntry<'about'>;

const COLLECTIONS: CollectionKey[] = ['projects', 'experiences', 'services', 'about'];

// Entry ids look like `zh-tw/order-system`.
function splitId(id: string): { lang: string; slug: string } {
  const [lang = '', ...rest] = id.split('/');
  return { lang, slug: rest.join('/') };
}

export function slugOf(entry: { id: string }): string {
  return splitId(entry.id).slug;
}

let validation: Promise<void> | undefined;

function ensureValid(): Promise<void> {
  validation ??= (async () => {
    const entries: ContentEntry[] = [];
    for (const collection of COLLECTIONS) {
      for (const entry of await getCollection(collection)) {
        entries.push({ collection, ...splitId(entry.id), data: entry.data as Record<string, unknown> });
      }
    }
    const errors = validateContent(entries);
    if (errors.length > 0) {
      throw new Error(`Content validation failed:\n${errors.map((e) => `  - ${e}`).join('\n')}`);
    }
  })();
  return validation;
}

async function inLang<C extends CollectionKey>(collection: C, lang: Lang): Promise<CollectionEntry<C>[]> {
  await ensureValid();
  return getCollection(collection, (entry) => splitId(entry.id).lang === lang);
}

const newestFirst = (a: { data: { startDate: Date } }, b: { data: { startDate: Date } }) =>
  b.data.startDate.getTime() - a.data.startDate.getTime();

export async function getProjects(lang: Lang): Promise<Project[]> {
  return (await inLang('projects', lang)).sort(newestFirst);
}

export async function getProject(lang: Lang, slug: string): Promise<Project | undefined> {
  return (await getProjects(lang)).find((p) => slugOf(p) === slug);
}

export async function getExperiences(lang: Lang): Promise<Experience[]> {
  return (await inLang('experiences', lang)).sort(newestFirst);
}

export async function getExperience(lang: Lang, slug: string): Promise<Experience | undefined> {
  return (await getExperiences(lang)).find((e) => slugOf(e) === slug);
}

export async function getServices(lang: Lang): Promise<Service[]> {
  return (await inLang('services', lang)).sort((a, b) => a.data.order - b.data.order);
}

export async function getAbout(lang: Lang): Promise<About> {
  const [about] = await inLang('about', lang);
  if (!about) throw new Error(`Missing about/${lang}/about.md`);
  return about;
}

// All Tech labels used by Projects, most used first (ties alphabetical).
export function techsOf(projects: Project[]): string[] {
  const counts = new Map<string, number>();
  for (const tech of projects.flatMap((p) => p.data.tech)) counts.set(tech, (counts.get(tech) ?? 0) + 1);
  return [...counts.keys()].sort((a, b) => counts.get(b)! - counts.get(a)! || a.localeCompare(b));
}
