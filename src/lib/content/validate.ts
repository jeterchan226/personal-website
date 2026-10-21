// Cross-file content rules that Zod (which sees one file at a time) cannot check.
// Pure function: takes every content entry, returns human-readable errors. Empty array = valid.

export const LANGS = ['zh-tw', 'en'] as const;

export type ContentEntry = {
  collection: string;
  lang: string;
  slug: string;
  data: Record<string, unknown>;
};

// Non-text fields that must be identical in both language versions of the same slug.
const STRUCTURAL_FIELDS: Record<string, string[]> = {
  projects: ['startDate', 'endDate', 'tech', 'confidential', 'featured', 'experience', 'github', 'demo'],
  experiences: ['startDate', 'endDate'],
  services: ['order', 'projects'],
  about: [],
};

const CONFIDENTIAL_FORBIDDEN_LINKS = ['github', 'demo'];

export function validateContent(entries: ContentEntry[]): string[] {
  const errors = new Set<string>();
  const bySlug = groupBySlug(entries);

  for (const entry of entries) {
    if (!(LANGS as readonly string[]).includes(entry.lang)) {
      errors.add(`${entry.collection}/${entry.slug}: unknown language folder "${entry.lang}"`);
    }
  }

  for (const [key, versions] of bySlug) {
    for (const lang of LANGS) {
      if (!versions.has(lang)) errors.add(`${key}: missing "${lang}" version`);
    }

    const [first, second] = LANGS.map((lang) => versions.get(lang));
    if (first && second) {
      for (const field of STRUCTURAL_FIELDS[first.collection] ?? []) {
        if (JSON.stringify(first.data[field]) !== JSON.stringify(second.data[field])) {
          errors.add(`${key}: "${field}" differs between "${LANGS[0]}" and "${LANGS[1]}"`);
        }
      }
    }
  }

  const slugsOf = (collection: string) =>
    new Set(entries.filter((e) => e.collection === collection).map((e) => e.slug));
  const experienceSlugs = slugsOf('experiences');
  const projectSlugs = slugsOf('projects');

  for (const entry of entries) {
    const key = `${entry.collection}/${entry.slug}`;
    const { data } = entry;

    if (entry.collection === 'projects') {
      if (typeof data.experience === 'string' && !experienceSlugs.has(data.experience)) {
        errors.add(`${key}: experience "${data.experience}" does not exist`);
      }
      if (data.confidential === true) {
        for (const link of CONFIDENTIAL_FORBIDDEN_LINKS) {
          if (data[link] !== undefined) errors.add(`${key}: confidential project must not have "${link}"`);
        }
        if (!data.clientIndustry) {
          errors.add(`${key} (${entry.lang}): confidential project needs "clientIndustry"`);
        }
      }
    }

    if (entry.collection === 'services') {
      for (const slug of (data.projects as string[] | undefined) ?? []) {
        if (!projectSlugs.has(slug)) errors.add(`${key}: project "${slug}" does not exist`);
      }
    }
  }

  return [...errors];
}

function groupBySlug(entries: ContentEntry[]) {
  const groups = new Map<string, Map<string, ContentEntry>>();
  for (const entry of entries) {
    const key = `${entry.collection}/${entry.slug}`;
    if (!groups.has(key)) groups.set(key, new Map());
    groups.get(key)!.set(entry.lang, entry);
  }
  return groups;
}
