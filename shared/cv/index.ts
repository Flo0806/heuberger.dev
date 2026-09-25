import { cvDe } from './de';
import { cvEn } from './en';
import type { CvData, CvLocale } from './types';

export type { CvData, CvEntry, CvLocale, CvTrack } from './types';

export const cvByLocale: Record<CvLocale, CvData> = { de: cvDe, en: cvEn };

export const isCvLocale = (value: unknown): value is CvLocale => value === 'de' || value === 'en';

/** '2022-12' -> 'Dez. 2022' / 'Dec 2022'; null -> the localized "today". */
export function formatCvMonth(iso: string | null, locale: CvLocale, present: string) {
  if (!iso) return present;
  const [year, month] = iso.split('-').map(Number);
  return new Intl.DateTimeFormat(locale === 'de' ? 'de-DE' : 'en-GB', {
    month: 'short',
    year: 'numeric',
  }).format(new Date(year!, (month ?? 1) - 1, 1));
}
