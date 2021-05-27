import { LocizeTranslationByLang } from '@/modules/core/i18n/fetchLocizeTranslations';
import {
  fetchTranslations,
  I18nextResources,
} from '@/modules/core/i18n/i18nextLocize';
import { createLogger } from '@/modules/core/logging/logger';

const fileLabel = 'modules/core/i18n/getLocizeTranslations';
const logger = createLogger({
  fileLabel,
});

/**
 * Returns all translations (indexed by language), based on the app-wide static/shared/stale data fetched at build time.
 *
 * @example const allStaticLocizeTranslations = await getAllStaticLocizeTranslations();
 */
export const getAllStaticLocizeTranslations = async (): Promise<LocizeTranslationByLang> => {
  return (await import('@/modules/core/i18n/fetchLocizeTranslations.preval')) as unknown as LocizeTranslationByLang;
};

/**
 * Returns all translations for one language, based on the app-wide static/shared/stale data fetched at build time.
 *
 * @example const i18nTranslations: I18nextResources = await getStaticLocizeTranslations(lang);
 *
 * @param lang
 */
export const getStaticLocizeTranslations = async (lang: string): Promise<I18nextResources> => {
  const allStaticLocizeTranslations = await getAllStaticLocizeTranslations();
  const i18nTranslations: I18nextResources = allStaticLocizeTranslations?.[lang];

  if (!i18nTranslations) {
    logger.warn(`Locize translations don't contain the translations for the lang "${lang}"`, allStaticLocizeTranslations);
  }

  return i18nTranslations || {};
};

/**
 * Get the Locize translations by either resolving them from static cache, or fetching them in realtime.
 *
 * @param lang
 * @param isPreviewMode
 */
export const getLocizeTranslations = async (lang: string, isPreviewMode = false): Promise<I18nextResources> => {
  if (isPreviewMode || process.env.NODE_ENV === 'development') {
    return await fetchTranslations(lang);
  } else {
    return await getStaticLocizeTranslations(lang);
  }
};
