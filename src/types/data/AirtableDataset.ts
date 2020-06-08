import { AirtableRecord } from './AirtableRecord';

/**
 * Dataset containing all records index by their airtable "id" field
 * Used to resolve links (relationships) between records
 *
 * @example { 'reci9HYsoqd1xScsi': AirtableRecord, ... }
 */
export type AirtableDataset = {
  [id: string]: AirtableRecord;
}
