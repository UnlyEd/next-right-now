import {
  getAirtableSchema,
  GetAirtableSchemaProps,
} from '@/modules/core/airtable/airtableSchema';
import consolidateSanitizedAirtableDataset from '@/modules/core/airtable/consolidateSanitizedAirtableDataset';
import fetchAirtableDataset from '@/modules/core/airtable/fetchAirtableDataset';
import prepareAndSanitizeAirtableDataset from '@/modules/core/airtable/prepareAndSanitizeAirtableDataset';
import { AirtableDatasets } from '@/modules/core/data/types/AirtableDatasets';
import { SanitizedAirtableDataset } from '@/modules/core/data/types/SanitizedAirtableDataset';
import { createLogger } from '@/modules/core/logging/logger';
import { AirtableSchema } from './types/AirtableSchema';
import { RawAirtableRecordsSet } from './types/RawAirtableRecordsSet';

const fileLabel = 'modules/core/airtable/getAirtableDataset';
const logger = createLogger({
  fileLabel,
});

/**
 * Returns the whole dataset (raw), based on the app-wide static/shared/stale data fetched at build time.
 *
 * @example const rawAirtableRecordsSets: RawAirtableRecordsSet[] = await getStaticRawAirtableDataset();
 */
export const getStaticRawAirtableDataset = async (): Promise<RawAirtableRecordsSet[]> => {
  return (await import('@/modules/core/airtable/fetchStaticRawAirtableDataset.preval')) as unknown as RawAirtableRecordsSet[];
};

/**
 * Returns the whole dataset (sanitized), based on the app-wide static/shared/stale data fetched at build time.
 *
 * This dataset is STALE. It will not update, ever.
 * The dataset is created at build time, using the "next-plugin-preval" webpack plugin.
 *
 * @example const dataset: SanitizedAirtableDataset = await getStaticAirtableDataset(bestCountryCodes);
 *
 * @param preferredLocalesOrLanguages
 * @param airtableSchemaProps
 */
export const getStaticAirtableDataset = async (preferredLocalesOrLanguages: string[], airtableSchemaProps?: GetAirtableSchemaProps): Promise<SanitizedAirtableDataset> => {
  const rawAirtableRecordsSets: RawAirtableRecordsSet[] = await getStaticRawAirtableDataset();
  const airtableSchema: AirtableSchema = getAirtableSchema(airtableSchemaProps);
  const datasets: AirtableDatasets = prepareAndSanitizeAirtableDataset(rawAirtableRecordsSets, airtableSchema, preferredLocalesOrLanguages);

  return consolidateSanitizedAirtableDataset(airtableSchema, datasets.sanitized);
};

/**
 * Returns the airtable dataset by fetching it in real-time.
 *
 * This operation is expensive and might take a lot of time (several seconds).
 * Unless absolutely necessary, using the static dataset is usually preferred.
 *
 * @param preferredLocalesOrLanguages
 * @param airtableSchemaProps
 */
export const getLiveAirtableDataset = async (preferredLocalesOrLanguages: string[], airtableSchemaProps?: GetAirtableSchemaProps): Promise<SanitizedAirtableDataset> => {
  const airtableSchema: AirtableSchema = getAirtableSchema(airtableSchemaProps);
  const rawAirtableRecordsSets: RawAirtableRecordsSet[] = await fetchAirtableDataset(airtableSchema, preferredLocalesOrLanguages);
  const datasets: AirtableDatasets = prepareAndSanitizeAirtableDataset(rawAirtableRecordsSets, airtableSchema, preferredLocalesOrLanguages);

  return consolidateSanitizedAirtableDataset(airtableSchema, datasets.sanitized);
};

/**
 * Returns the Airtable dataset by either returning the static dataset (stale data) or performing a live query (real-time).
 *
 * @param preferredLocalesOrLanguages
 * @param forceRealTimeFetch
 * @param airtableSchemaProps
 */
export const getAirtableDataset = async (preferredLocalesOrLanguages: string[], forceRealTimeFetch = false, airtableSchemaProps?: GetAirtableSchemaProps): Promise<SanitizedAirtableDataset> => {
  if (forceRealTimeFetch || process.env.NODE_ENV === 'development') {
    // When preview mode is enabled or working locally, we want to make real-time API requests to get up-to-date data
    // Because using the "next-plugin-preval" plugin worsen developer experience in dev - See https://github.com/UnlyEd/next-right-now/discussions/335#discussioncomment-792821
    return await getLiveAirtableDataset(preferredLocalesOrLanguages, airtableSchemaProps);
  } else {
    // Otherwise, we fallback to the app-wide shared/static data (stale)
    return await getStaticAirtableDataset(preferredLocalesOrLanguages);
  }
};
