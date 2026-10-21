import { describe, expect, it } from 'vitest';
import { validateContent, type ContentEntry } from './validate';

const project = (lang: 'zh-tw' | 'en', slug: string, data: Record<string, unknown> = {}): ContentEntry => ({
  collection: 'projects',
  lang,
  slug,
  data: {
    startDate: new Date('2024-03-01'),
    tech: ['Go'],
    confidential: false,
    featured: false,
    ...data,
  },
});

const bothLangs = (make: (lang: 'zh-tw' | 'en') => ContentEntry) => [make('zh-tw'), make('en')];

describe('validateContent', () => {
  it('accepts a complete, consistent set', () => {
    const entries = [
      ...bothLangs((lang) => ({ collection: 'experiences', lang, slug: 'acme', data: { startDate: new Date('2020-01-01') } })),
      ...bothLangs((lang) => project(lang, 'order-system', { experience: 'acme' })),
      ...bothLangs((lang) => ({ collection: 'services', lang, slug: 'backend', data: { order: 1, projects: ['order-system'] } })),
    ];
    expect(validateContent(entries)).toEqual([]);
  });

  it('reports a missing English version', () => {
    const errors = validateContent([project('zh-tw', 'order-system')]);
    expect(errors).toEqual(['projects/order-system: missing "en" version']);
  });

  it('reports a missing Chinese version', () => {
    const errors = validateContent([project('en', 'order-system')]);
    expect(errors).toEqual(['projects/order-system: missing "zh-tw" version']);
  });

  it('reports structural fields that differ between languages', () => {
    const errors = validateContent([
      project('zh-tw', 'order-system', { tech: ['Go', 'Kafka'] }),
      project('en', 'order-system', { tech: ['Go'] }),
    ]);
    expect(errors).toEqual(['projects/order-system: "tech" differs between "zh-tw" and "en"']);
  });

  it('reports a Project pointing to a missing Experience', () => {
    const errors = validateContent(bothLangs((lang) => project(lang, 'order-system', { experience: 'acmee' })));
    expect(errors).toEqual(['projects/order-system: experience "acmee" does not exist']);
  });

  it('reports a Service pointing to a missing Project', () => {
    const errors = validateContent([
      ...bothLangs((lang) => project(lang, 'order-system')),
      ...bothLangs((lang) => ({ collection: 'services', lang, slug: 'backend', data: { order: 1, projects: ['oder-system'] } })),
    ]);
    expect(errors).toEqual(['services/backend: project "oder-system" does not exist']);
  });

  it('allows the same Project under several Services', () => {
    const errors = validateContent([
      ...bothLangs((lang) => project(lang, 'order-system')),
      ...bothLangs((lang) => ({ collection: 'services', lang, slug: 'backend', data: { order: 1, projects: ['order-system'] } })),
      ...bothLangs((lang) => ({ collection: 'services', lang, slug: 'architecture', data: { order: 2, projects: ['order-system'] } })),
    ]);
    expect(errors).toEqual([]);
  });

  it('rejects links on a Confidential Project', () => {
    const errors = validateContent(
      bothLangs((lang) =>
        project(lang, 'payments', { confidential: true, clientIndustry: 'Finance', github: 'https://github.com/x/y' }),
      ),
    );
    expect(errors).toEqual(['projects/payments: confidential project must not have "github"']);
  });

  it('requires a client industry on a Confidential Project', () => {
    const errors = validateContent(bothLangs((lang) => project(lang, 'payments', { confidential: true })));
    expect(errors).toEqual([
      'projects/payments (zh-tw): confidential project needs "clientIndustry"',
      'projects/payments (en): confidential project needs "clientIndustry"',
    ]);
  });

  it('reports an unknown language folder', () => {
    const errors = validateContent([...bothLangs((lang) => project(lang, 'order-system')), { ...project('en', 'order-system'), lang: 'zh-TW' }]);
    expect(errors).toEqual(['projects/order-system: unknown language folder "zh-TW"']);
  });
});
