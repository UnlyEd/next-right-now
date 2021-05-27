import { supportedLocales } from '@/modules/core/i18n/i18nConfig';
import {
  fetchTranslations,
  I18nextResources,
} from '@/modules/core/i18n/i18nextLocize';
import { I18nLocale } from '@/modules/core/i18n/types/I18nLocale';
import { LocizeTranslationByLang } from '@/modules/core/i18n/types/LocizeTranslationByLang';
import { createLogger } from '@/modules/core/logging/logger';
import preval from 'next-plugin-preval';

const fileLabel = 'modules/core/i18n/fetchStaticLocizeTranslations.preval';
const logger = createLogger({
  fileLabel,
});

/**
 * Fetches the Locize API.
 *
 * Disabled during development, because it invokes too many API calls, the SSG pages are configured to fetch real-time data during development.
 * See https://github.com/ricokahler/next-plugin-preval/issues/27
 *
 * XXX Must use default exports, otherwise it can cause issues - See https://github.com/ricokahler/next-plugin-preval/issues/19#issuecomment-848799473
 *
 * XXX We opinionately decided to use the "lang" (e.g: 'en') as Locize index, but it could also be the "name" (e.g: 'en-US'), it depends on your business requirements!
 *  (lang is simpler)
 */
export const fetchStaticLocizeTranslations = async (): Promise<LocizeTranslationByLang> => {
  if (process.env.NODE_ENV !== 'development') {
    logger.debug(`Pre-evaluation (prefetching of the static translations at build time) is starting.`);
    const translationsByLocale: LocizeTranslationByLang = {};
    const promises: Promise<any>[] = [];

    supportedLocales.map((supportedLocale: I18nLocale) => {
      promises.push(fetchTranslations(supportedLocale?.lang));
    });

    // Run all promises in parallel and compute results into the dataset
    const results: I18nextResources[] = await Promise.all(promises);
    results.map((i18nextResources: I18nextResources, index) => translationsByLocale[supportedLocales[index]?.lang] = i18nextResources);

    return translationsByLocale;
  } else {
    logger.debug(`Pre-evaluation (prefetching of the static translations at build time) is disabled in development mode for a better developer experience.`);
    return {};
  }
};

/**
 * Pre-fetches the Locize translations for all languages and stores the result in an cached internal JSON file.
 * Overall, this approach allows us to have some static app-wide data that will never update, and have real-time data wherever we want.
 *
 * This is very useful to avoid fetching the same data for each page during the build step.
 * By default, Next.js would call the Locize API once per page built.
 * This was a huge pain for many reasons, because our app uses mostly static pages and we don't want those static pages to be updated.
 *
 * Also, even considering built time only, it was very inefficient, because Next was triggering too many API calls:
 * - More than 40 fetch attempts (40+ demo pages)
 * - Our in-memory cache was helping but wouldn't completely conceal the over-fetching caused by Next.js
 * - Locize API has on-demand pricing, each call costs us money
 *
 * The shared/static dataset is accessible to:
 * - All components
 * - All pages (both getStaticProps and getStaticPaths, and even in getServerSideProps is you wish to!)
 * - All API endpoints
 *
 * XXX The data are therefore STALE, they're not fetched in real-time.
 *  They won't update (the app won't display up-to-date data until the next deployment, for static pages).
 *
 * @example const allStaticLocizeTranslations = await getAllStaticLocizeTranslations();
 *
 * @see https://github.com/ricokahler/next-plugin-preval
 */
export default preval(fetchStaticLocizeTranslations());
