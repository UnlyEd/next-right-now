import { supportedLocales } from '@/modules/core/i18n/i18nConfig';
import { I18nLocale } from '@/modules/core/i18n/types/I18nLocale';
import { createLogger } from '@/modules/core/logging/logger';
import groupBy from 'lodash.groupby';
import map from 'lodash.map';
import size from 'lodash.size';
import uniq from 'lodash.uniq';
import { AirtableDatasets } from '../data/types/AirtableDatasets';
import { RawAirtableDataset } from '../data/types/RawAirtableDataset';
import fetchAirtableDataset from './fetchAirtableDataset';
import prepareAirtableDS from './prepareAirtableDS';
import sanitizeRawAirtableDS from './sanitizeRawAirtableDS';
import { AirtableSchema } from './types/AirtableSchema';
import { RawAirtableRecordsSet } from './types/RawAirtableRecordsSet';
import { TableSchema } from './types/TableSchema';

const fileLabel = 'modules/core/airtable/fetchAndSanitizeAirtableDatasets';
const logger = createLogger({
  fileLabel,
});

const printAirtableDatasetStatistics = (airtableDataset: RawAirtableDataset, label: string): void => {
  const rawDatasetGroupedByTable = groupBy(airtableDataset, '__typename');

  logger.log(label, // eslint-disable-line no-console
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
  // Resolves the languages we want to fetch the fields for (all supported languages configured in the app)
  // We want to fetch all fields (for all language variations) during the initial dataset fetch
  const localesOfLanguagesToFetch = uniq<string>(supportedLocales.map((supportedLocale: I18nLocale) => supportedLocale.lang));
  const rawAirtableRecordsSets: RawAirtableRecordsSet[] = await fetchAirtableDataset(airtableSchema, localesOfLanguagesToFetch);

  const airtableDatasets: AirtableDatasets = prepareAirtableDS(rawAirtableRecordsSets);
  printAirtableDatasetStatistics(airtableDatasets.raw, 'Raw dataset metadata:');

  // Sanitizes the dataset, during sanitization we will fallback (when a record isn't translated)
  // using lang/locale depending on the order defined in preferredLocalesOrLanguages
  airtableDatasets.sanitized = sanitizeRawAirtableDS(airtableSchema, airtableDatasets, preferredLocalesOrLanguages, filterByPredicate);

  return airtableDatasets;
};

export default fetchAndSanitizeAirtableDatasets;
