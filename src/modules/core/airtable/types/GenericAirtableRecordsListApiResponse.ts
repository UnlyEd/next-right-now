import { RawAirtableRecord } from './RawAirtableRecord';

/**
 * Response returned by Airtable when fetching a table (list of records)
 */
export type GenericAirtableRecordsListApiResponse<Record extends RawAirtableRecord = RawAirtableRecord> = {
  records: Record[];
}
