import {
  getAirtableSchema,
  GetAirtableSchemaProps,
} from '@/modules/core/airtable/airtableSchema';
import consolidateSanitizedAirtableDataset from '@/modules/core/airtable/consolidateSanitizedAirtableDataset';
import prepareAndSanitizeAirtableDataset from '@/modules/core/airtable/prepareAndSanitizeAirtableDataset';
import { AirtableDatasets } from '@/modules/core/data/types/AirtableDatasets';
import { AirtableRecord } from '@/modules/core/data/types/AirtableRecord';
import { Customer } from '@/modules/core/data/types/Customer';
import { SanitizedAirtableDataset } from '@/modules/core/data/types/SanitizedAirtableDataset';
import { createLogger } from '@/modules/core/logging/logger';
import find from 'lodash.find';
import { AirtableSchema } from './types/AirtableSchema';
import { RawAirtableRecordsSet } from './types/RawAirtableRecordsSet';

const fileLabel = 'modules/core/airtable/getAirtableDataset';
const logger = createLogger({
  fileLabel,
});

/**
 * Finds the customer within the dataset.
 *
 * @param dataset
 */
export const getCustomer = (dataset: SanitizedAirtableDataset): AirtableRecord<Customer> => {
  return find(dataset, { __typename: 'Customer' }) as AirtableRecord<Customer>;
};

/**
 * Returns the whole dataset (raw), based on the app-wide static/shared/stale data fetched at build time.
 *
 * @example const rawAirtableRecordsSets: RawAirtableRecordsSet[] = await getSharedRawAirtableDataset();
 */
export const getSharedRawAirtableDataset = async (): Promise<RawAirtableRecordsSet[]> => {
  return (await import('@/modules/core/airtable/fetchRawAirtableDataset.preval')) as unknown as RawAirtableRecordsSet[];
};

/**
 * Returns the whole dataset (sanitized), based on the app-wide static/shared/stale data fetched at build time.
 *
 * This dataset is STALE. It will not update, ever.
 * The dataset is created at build time, using the "next-plugin-preval" webpack plugin.
 *
 * @example const dataset: SanitizedAirtableDataset = await getSharedAirtableDataset(bestCountryCodes);
 *
 * @param preferredLocalesOrLanguages
 * @param airtableSchemaProps
 */
export const getSharedAirtableDataset = async (preferredLocalesOrLanguages: string[], airtableSchemaProps?: GetAirtableSchemaProps): Promise<SanitizedAirtableDataset> => {
  const rawAirtableRecordsSets: RawAirtableRecordsSet[] = await getSharedRawAirtableDataset();
  const airtableSchema: AirtableSchema = getAirtableSchema(airtableSchemaProps);
  const datasets: AirtableDatasets = prepareAndSanitizeAirtableDataset(rawAirtableRecordsSets, airtableSchema, preferredLocalesOrLanguages);

  return consolidateSanitizedAirtableDataset(airtableSchema, datasets.sanitized);
};

/**
 * WIP Not working
 *
 * @param preferredLocalesOrLanguages
 * @param airtableSchemaProps
 */
export const getLiveAirtableDataset = async (preferredLocalesOrLanguages: string[], airtableSchemaProps?: GetAirtableSchemaProps): Promise<SanitizedAirtableDataset> => {
  // const airtableSchema: AirtableSchema = getAirtableSchema(airtableSchemaProps);
  // XXX Importing fetchAirtableDataset in the file causes a crash, while doing exactly the same from the Next.js page works fine (claiming "fs" module cannot be found)
  //  This is most likely related to the "next-plugin-preval" package, which messes up with the Webpack configuration
  // const rawAirtableRecordsSets: RawAirtableRecordsSet[] = await fetchAirtableDataset(airtableSchema, preferredLocalesOrLanguages);
  // const datasets: AirtableDatasets = prepareAndSanitizeAirtableDataset(rawAirtableRecordsSets, airtableSchema, preferredLocalesOrLanguages);
  //
  // return consolidateSanitizedAirtableDataset(airtableSchema, datasets.sanitized);
  return {};
};

/**
 * WIP not used because getLiveAirtableDataset isn't working
 *
 * Meant to make code more reusable and avoid bloating pages with too much logic
 *
 * @param isPreviewMode
 * @param preferredLocalesOrLanguages
 * @param airtableSchemaProps
 */
export const getAirtableDataset = async (isPreviewMode: boolean, preferredLocalesOrLanguages: string[], airtableSchemaProps?: GetAirtableSchemaProps): Promise<SanitizedAirtableDataset> => {
  if (isPreviewMode) {
    // When preview mode is enabled, we want to make real-time API requests to get up-to-date data
    return await getLiveAirtableDataset(preferredLocalesOrLanguages, airtableSchemaProps);
  } else {
    // When preview mode is not enabled, we fallback to the app-wide shared/static data (stale)
    return await getSharedAirtableDataset(preferredLocalesOrLanguages);
  }
};
