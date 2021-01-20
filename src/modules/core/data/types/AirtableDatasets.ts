import { RawAirtableDataset } from './RawAirtableDataset';
import { SanitizedAirtableDataset } from './SanitizedAirtableDataset';

/**
 * Contains all airtable datasets:
 *  - raw: Contains the records fetched from airtable, without any kind of transformation.
 *  - sanitized: Contains the records fetched from airtable, after being sanitized.
 *
 * @example {
 *  raw: { 'reci9HYsoqd1xScsi': { __typename: 'Customer', id: 'reci9HYsoqd1xScsi', fields: { aid: 1 } } },
 *  sanitized: { 'reci9HYsoqd1xScsi': { __typename: 'Customer', id: 'reci9HYsoqd1xScsi', aid: 1 } },
 * }
 */
export type AirtableDatasets = {
  raw: RawAirtableDataset;
  sanitized: SanitizedAirtableDataset;
}
