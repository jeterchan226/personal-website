import { t, type Lang } from './ui';

// Content dates are calendar dates, so format in UTC to avoid shifting a month near midnight.
const enMonth = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });

function formatMonth(lang: Lang, date: Date): string {
  if (lang === 'en') return enMonth.format(date);
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  return `${date.getUTCFullYear()}.${month}`;
}

// "2024.03 – 至今" / "Mar 2024 – Present"; a missing end date means ongoing.
export function formatPeriod(lang: Lang, start: Date, end?: Date): string {
  const endText = end ? formatMonth(lang, end) : t(lang, 'period.present');
  return `${formatMonth(lang, start)} – ${endText}`;
}
