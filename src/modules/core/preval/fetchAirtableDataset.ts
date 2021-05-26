import { getAirtableSchema } from '@/modules/core/airtable/airtableSchema';
import consolidateSanitizedAirtableDataset from '@/modules/core/airtable/consolidateSanitizedAirtableDataset';
import fetchAndSanitizeAirtableDatasets from '@/modules/core/airtable/fetchAndSanitizeAirtableDatasets';
import { AirtableSchema } from '@/modules/core/airtable/types/AirtableSchema';
import { AirtableDatasets } from '@/modules/core/data/types/AirtableDatasets';
import { SanitizedAirtableDataset } from '@/modules/core/data/types/SanitizedAirtableDataset';
import { supportedLocales } from '@/modules/core/i18n/i18nConfig';
import { I18nLocale } from '@/modules/core/i18n/types/I18nLocale';
import uniq from 'lodash.uniq';
import preval from 'next-plugin-preval';

const fetchAirtableDataset = async (): Promise<SanitizedAirtableDataset> => {
  const airtableSchema: AirtableSchema = getAirtableSchema();
  const supportedLanguages = uniq<string>(supportedLocales.map((supportedLocale: I18nLocale) => supportedLocale.lang));
  const datasets: AirtableDatasets = await fetchAndSanitizeAirtableDatasets(airtableSchema, supportedLanguages);

  return consolidateSanitizedAirtableDataset(airtableSchema, datasets.sanitized);
};

export const dataset = preval(fetchAirtableDataset())

export default dataset;
