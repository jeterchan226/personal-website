import { describe, expect, it } from 'vitest';
import { formatPeriod } from './format';

describe('formatPeriod', () => {
  const start = new Date('2024-03-01');
  const end = new Date('2025-11-01');

  it('formats an ongoing period in Chinese', () => {
    expect(formatPeriod('zh-tw', start)).toBe('2024.03 – 至今');
  });

  it('formats an ongoing period in English', () => {
    expect(formatPeriod('en', start)).toBe('Mar 2024 – Present');
  });

  it('formats a finished period', () => {
    expect(formatPeriod('zh-tw', start, end)).toBe('2024.03 – 2025.11');
    expect(formatPeriod('en', start, end)).toBe('Mar 2024 – Nov 2025');
  });
});
