import { describe, expect, it } from 'vitest';
import { switchLang } from './paths';

describe('switchLang', () => {
  it('swaps the language prefix and keeps the rest of the path', () => {
    expect(switchLang('/zh-tw/projects/order-system', 'en')).toBe('/en/projects/order-system');
    expect(switchLang('/en/', 'zh-tw')).toBe('/zh-tw/');
  });

  it('falls back to the language home for paths without a language', () => {
    expect(switchLang('/', 'en')).toBe('/en/');
  });
});
