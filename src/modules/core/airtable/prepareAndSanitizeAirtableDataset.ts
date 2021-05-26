import { RawAirtableRecord } from '@/modules/core/airtable/types/RawAirtableRecord';
import { createLogger } from '@/modules/core/logging/logger';
import groupBy from 'lodash.groupby';
import map from 'lodash.map';
import size from 'lodash.size';
import { AirtableDatasets } from '../data/types/AirtableDatasets';
import { RawAirtableDataset } from '../data/types/RawAirtableDataset';
import { sanitizeRawAirtableDS } from './sanitizeRawAirtableDS';
import { AirtableSchema } from './types/AirtableSchema';
import { RawAirtableRecordsSet } from './types/RawAirtableRecordsSet';
import { TableSchema } from './types/TableSchema';

const fileLabel = 'modules/core/airtable/prepareAndSanitizeAirtableDataset';
const logger = createLogger({
  fileLabel,
});

/**
 * Prints stats metadata about the dataset.
 * Useful for debugging.
 *
 * @param airtableDataset
 * @param label
 */
const printAirtableDatasetStatistics = (airtableDataset: RawAirtableDataset, label: string): void => {
  const rawDatasetGroupedByTable = groupBy(airtableDataset, '__typename');

  logger.info(label,
    `size: ${size(airtableDataset)}`,
    map(rawDatasetGroupedByTable, (tableSchemas: TableSchema[], tableName) => `${tableName}: ${size(tableSchemas)}`),
  );
};

/**
 * Prepare the raw and sanitized airtable datasets.
 *
 * Each RawAirtableRecordsSet is basically the result of a full table fetch (a list of records sharing the same data structure).
 *
 * @param rawAirtableRecordsSets
 */
export const prepareAirtableDS = (rawAirtableRecordsSets: RawAirtableRecordsSet[]): AirtableDatasets => {
  const datasets: AirtableDatasets = {
    raw: {},
    sanitized: {},
  };

  map(rawAirtableRecordsSets, (rawRecordsSet: RawAirtableRecordsSet) => {
    map(rawRecordsSet.records, (record: RawAirtableRecord) => {
      datasets.raw[record.id] = {
        ...record,
        __typename: rawRecordsSet.__typename,
      };
    });
  });

  return datasets;
};

/**
 * Performs the consolidation in the following order:
 *  1) Prepare the datasets (raw and sanitized).
 *  2) Sanitize the raw dataset.
 *
 * @param rawAirtableRecordsSets
 * @param airtableSchema
 * @param preferredLocalesOrLanguages Those locales will be used to fetch i18n variant fields and resolve the missing translations
 * @param filterByPredicate Optional lodash.filter predicate to filter the whole raw dataset (after it's been fetched).
 *  Different than per-table filterByFormula which is applied directly by the Airtable API).
 *  See https://lodash.com/docs/4.17.15#filter
 */
export const prepareAndSanitizeAirtableDataset = (rawAirtableRecordsSets: RawAirtableRecordsSet[], airtableSchema: AirtableSchema, preferredLocalesOrLanguages: string[], filterByPredicate?: any): AirtableDatasets => {
  const airtableDatasets: AirtableDatasets = prepareAirtableDS(rawAirtableRecordsSets);
  printAirtableDatasetStatistics(airtableDatasets.raw, 'Raw dataset metadata:');

  // Sanitizes the dataset, during sanitization we will fallback (when a record isn't translated)
  // using lang/locale depending on the order defined in preferredLocalesOrLanguages
  airtableDatasets.sanitized = sanitizeRawAirtableDS(airtableSchema, airtableDatasets, preferredLocalesOrLanguages, filterByPredicate);

  return airtableDatasets;
};

export default prepareAndSanitizeAirtableDataset;
