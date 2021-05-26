import { supportedLocales } from '@/modules/core/i18n/i18nConfig';
import {
  fetchTranslations,
  I18nextResources,
} from '@/modules/core/i18n/i18nextLocize';
import { I18nLocale } from '@/modules/core/i18n/types/I18nLocale';
import { createLogger } from '@/modules/core/logging/logger';

const fileLabel = 'modules/core/i18n/fetchLocizeTranslations';
const logger = createLogger({
  fileLabel,
});

export type LocizeTranslationByLang = {
  [lang: string]: I18nextResources;
}

/**
 * Fetches the Locize API.
 * Invoked by fetchLocizeTranslations.preval.preval.ts file at build time (during Webpack bundling).
 *
 * XXX Must be a single export file otherwise it can cause issues - See https://github.com/ricokahler/next-plugin-preval/issues/19#issuecomment-848799473
 *
 * XXX We opinionately decided to use the "lang" (e.g: 'en') as Locize index, but it could also be the "name" (e.g: 'en-US'), it depends on your business requirements!
 *  (lang is simpler)
 */
export const fetchLocizeTranslations = async (): Promise<LocizeTranslationByLang> => {
  const translationsByLocale: LocizeTranslationByLang = {};
  const promises: Promise<any>[] = [];

  supportedLocales.map((supportedLocale: I18nLocale) => {
    promises.push(fetchTranslations(supportedLocale?.lang));
  });

  // Run all promises in parallel and compute results into the dataset
  const results: I18nextResources[] = await Promise.all(promises);
  results.map((i18nextResources: I18nextResources, index) => translationsByLocale[supportedLocales[index]?.lang] = i18nextResources);

  return translationsByLocale;
};

export default fetchLocizeTranslations;
