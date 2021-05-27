import {
  getAirtableSchema,
  GetAirtableSchemaProps,
} from '@/modules/core/airtable/airtableSchema';
import fetchAirtableDataset from '@/modules/core/airtable/fetchAirtableDataset';
import { AirtableSchema } from '@/modules/core/airtable/types/AirtableSchema';
import { RawAirtableRecordsSet } from '@/modules/core/airtable/types/RawAirtableRecordsSet';
import { supportedLocales } from '@/modules/core/i18n/i18nConfig';
import { I18nLocale } from '@/modules/core/i18n/types/I18nLocale';
import { createLogger } from '@/modules/core/logging/logger';
import uniq from 'lodash.uniq';
import preval from 'next-plugin-preval';

const fileLabel = 'modules/core/airtable/fetchStaticRawAirtableDataset';
const logger = createLogger({
  fileLabel,
});

/**
 * Fetches the airtable dataset.
 *
 * Disabled during development, because it invokes too many API calls, the SSG pages are configured to fetch real-time data during development.
 * If enabled during development, it worsen the developer experience, because Next.js isn't optimized for "next-plugin-preval" and re-fetches multiple times (~11 times).
 * This causes the Airtable API to block our requests and we get only partial data.
 * See https://github.com/ricokahler/next-plugin-preval/issues/27
 *
 * XXX Must use default exports, otherwise it can cause issues - See https://github.com/ricokahler/next-plugin-preval/issues/19#issuecomment-848799473
 */
export const fetchStaticRawAirtableDataset = async (airtableSchemaProps?: GetAirtableSchemaProps): Promise<RawAirtableRecordsSet[]> => {
  if (process.env.NODE_ENV !== 'development') {
    logger.debug(`Pre-evaluation (prefetching of the static dataset at build time) is starting.`);
    const airtableSchema: AirtableSchema = getAirtableSchema(airtableSchemaProps);

    // Resolves the languages we want to fetch the fields for (all supported languages configured in the app)
    // We want to fetch all fields (for all language variations) during the initial dataset fetch
    const localesOfLanguagesToFetch = uniq<string>(supportedLocales.map((supportedLocale: I18nLocale) => supportedLocale.lang));

    return await fetchAirtableDataset(airtableSchema, localesOfLanguagesToFetch);
  } else {
    logger.debug(`Pre-evaluation (prefetching of the static dataset at build time) is disabled in development mode for a better developer experience.`);
    return [];
  }
};

/**
 * Pre-fetches the Airtable dataset and stores the result in an cached internal JSON file.
 * Overall, this approach allows us to have some static app-wide data that will never update, and have real-time data wherever we want.
 *
 * This is very useful to avoid fetching the same data for each page during the build step.
 * By default, Next.js would call the Airtable API once per page built.
 * This was a huge pain for many reasons, because our app uses mostly static pages and we don't want those static pages to be updated.
 *
 * Also, even considering built time only, it was very inefficient, because Next was triggering too many API calls:
 * - More than 120 fetch attempts (locales * pages)
 *    - 3 locales (in supportedLocales)
 *    - lots of static pages (40+ demo pages)
 * - Our in-memory cache was helping but wouldn't completely conceal the over-fetching caused by Next.js
 * - Airtable API requires 1 API request per table (we fetch 9 tables for the demo)
 * - We were generating pages for all supportedLocales, even if the customer hadn't enabled some languages (longer build + undesired pages leading to bad UX)
 * - We weren't able to auto-redirect only to one of the enabled customer locales, not without fetching Airtable (which is slow and has strong rate limits)
 *
 * The shared/static dataset is accessible to:
 * - All components
 * - All pages (both getStaticProps and getStaticPaths, and even in getServerSideProps is you wish to!)
 * - All API endpoints
 *
 * XXX The data are therefore STALE, they're not fetched in real-time.
 *  They won't update (the app won't display up-to-date data until the next deployment, for static pages).
 *
 * @example const rawAirtableRecordsSets: RawAirtableRecordsSet[] = await getStaticRawAirtableDataset();
 *
 * @see https://github.com/ricokahler/next-plugin-preval
 */
export default preval(fetchStaticRawAirtableDataset());
