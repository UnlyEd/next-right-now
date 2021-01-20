import groupBy from 'lodash.groupby';
import map from 'lodash.map';
import size from 'lodash.size';
import { AirtableSchema } from './types/AirtableSchema';
import { TableSchema } from './types/TableSchema';
import { RawAirtableRecordsSet } from './types/RawAirtableRecordsSet';
import { AirtableDatasets } from '../data/types/AirtableDatasets';
import { RawAirtableDataset } from '../data/types/RawAirtableDataset';
import fetchAirtableDS from './fetchAirtableDS';
import prepareAirtableDS from './prepareAirtableDS';
import sanitizeRawAirtableDS from './sanitizeRawAirtableDS';

const printAirtableDatasetStatistics = (airtableDataset: RawAirtableDataset, label: string): void => {
  const rawDatasetGroupedByTable = groupBy(airtableDataset, '__typename');

  console.log(label, // eslint-disable-line no-console
    `size: ${size(airtableDataset)}`,
    map(rawDatasetGroupedByTable, (tableSchemas: TableSchema[], tableName) => `${tableName}: ${size(tableSchemas)}`),
  );
};

/**
 * Fetches the Airtable API (once per table)
 * Main entry point of the Airtable Dataset consolidation.
 *
 * Performs the consolidation in the following order:
 *  1) Fetches all tables and their records as described in the schema.
 *  2) Prepare the datasets (raw and sanitized).
 *  3) Sanitize the raw dataset.
 *
 * @param airtableSchema
 * @param preferredLocalesOrLanguages Those locales will be used to fetch i18n variant fields and resolve the missing translations
 * @param filterByPredicate Optional lodash.filter predicate to filter the whole raw dataset (after it's been fetched).
 *  Different than per-table filterByFormula which is applied directly by the Airtable API).
 *  See https://lodash.com/docs/4.17.15#filter
 */
export const fetchAndSanitizeAirtableDatasets = async (airtableSchema: AirtableSchema, preferredLocalesOrLanguages: string[], filterByPredicate?: any): Promise<AirtableDatasets> => {
  const rawAirtableRecordsSets: RawAirtableRecordsSet[] = await fetchAirtableDS(airtableSchema, preferredLocalesOrLanguages);
  const airtableDatasets: AirtableDatasets = prepareAirtableDS(rawAirtableRecordsSets);
  printAirtableDatasetStatistics(airtableDatasets.raw, 'Raw dataset metadata:');

  airtableDatasets.sanitized = sanitizeRawAirtableDS(airtableSchema, airtableDatasets, preferredLocalesOrLanguages, filterByPredicate);

  return airtableDatasets;
};

export default fetchAndSanitizeAirtableDatasets;
