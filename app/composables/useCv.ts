import { cvByLocale, formatCvMonth, isCvLocale } from '#shared/cv';
import type { CvLocale } from '#shared/cv';

/**
 * The CV for the active language, plus a month formatter bound to it.
 *
 * Data lives in shared/cv so the Nitro routes (/cv.md, /llms.txt) render the
 * exact same facts as the page - one source, no drift between what a human
 * reads and what an AI crawler is fed.
 */
export function useCv() {
  const { locale, t } = useI18n();

  const cvLocale = computed<CvLocale>(() => (isCvLocale(locale.value) ? locale.value : 'de'));
  const cv = computed(() => cvByLocale[cvLocale.value]);

  const month = (iso: string | null) => formatCvMonth(iso, cvLocale.value, t('cv.present'));

  /** 'Dez. 2022 – heute' */
  const range = (from: string, to: string | null) =>
    from === to ? month(from) : `${month(from)} – ${month(to)}`;

  return { cv, cvLocale, month, range };
}
