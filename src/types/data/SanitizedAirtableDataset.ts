import { AirtableRecord } from './AirtableRecord';

/**
 * Dataset containing all sanitized airtable records indexed by their airtable "id" field.
 */
export type SanitizedAirtableDataset = {
  [id: string]: AirtableRecord;
}
