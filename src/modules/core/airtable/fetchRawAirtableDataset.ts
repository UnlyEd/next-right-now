import {
  getAirtableSchema,
  GetAirtableSchemaProps,
} from '@/modules/core/airtable/airtableSchema';
import { supportedLocales } from '@/modules/core/i18n/i18nConfig';
import { I18nLocale } from '@/modules/core/i18n/types/I18nLocale';
import { createLogger } from '@/modules/core/logging/logger';
import uniq from 'lodash.uniq';
import fetchAirtableDataset from './fetchAirtableDataset';
import { AirtableSchema } from './types/AirtableSchema';
import { RawAirtableRecordsSet } from './types/RawAirtableRecordsSet';

const fileLabel = 'modules/core/airtable/fetchRawAirtableDataset';
const logger = createLogger({
  fileLabel,
});

/**
 * Fetches the airtable dataset.
 * Invoked by fetchRawAirtableDataset.preval.ts file at build time (during Webpack bundling).
 *
 * Disabled during development, because it invokes too many API calls, the SSG pages are configured to fetch real-time data during development.
 * If enabled during development, it worsen the developer experience, because Next.js isn't optimized for "next-plugin-preval" and re-fetches multiple times (~11 times).
 * This causes the Airtable API to block our requests and we get only partial data.
 * See https://github.com/ricokahler/next-plugin-preval/issues/27
 *
 * XXX Must be a single export file otherwise it can cause issues - See https://github.com/ricokahler/next-plugin-preval/issues/19#issuecomment-848799473
 */
export const fetchRawAirtableDataset = async (airtableSchemaProps?: GetAirtableSchemaProps): Promise<RawAirtableRecordsSet[]> => {
  if (process.env.NEXT_PUBLIC_APP_STAGE !== 'development') {
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

export default fetchRawAirtableDataset;
