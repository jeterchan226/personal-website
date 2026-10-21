import { isLang, type Lang } from './ui';

// Same page in another language: `/zh-tw/projects/x` → `/en/projects/x`.
export function switchLang(pathname: string, target: Lang): string {
  const [, first, ...rest] = pathname.split('/');
  if (!isLang(first)) return `/${target}/`;
  return `/${[target, ...rest].join('/')}`;
}

// Build a path inside a language: localePath('en', 'projects', 'x') → `/en/projects/x/`.
export function localePath(lang: Lang, ...segments: string[]): string {
  return `/${[lang, ...segments].join('/')}/`;
}
