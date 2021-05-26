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

const fileLabel = 'modules/core/airtable/getSharedAirtableDataset';
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
 * @param props
 */
export const getSharedAirtableDataset = async (preferredLocalesOrLanguages: string[], props?: GetAirtableSchemaProps): Promise<SanitizedAirtableDataset> => {
  const rawAirtableRecordsSets: RawAirtableRecordsSet[] = await getSharedRawAirtableDataset();
  const airtableSchema: AirtableSchema = getAirtableSchema(props);
  const datasets: AirtableDatasets = prepareAndSanitizeAirtableDataset(rawAirtableRecordsSets, airtableSchema, preferredLocalesOrLanguages);

  return consolidateSanitizedAirtableDataset(airtableSchema, datasets.sanitized);
};

export default getSharedAirtableDataset;
