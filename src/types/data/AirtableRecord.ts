import { BaseTableType } from '../../utils/api/fetchAirtableTable';

/**
 * Airtable record fetched from their API
 *
 * Uses generic "fields" field to allow extend using our own entities (Customer, Theme, etc.)
 */
export type AirtableRecord<Record extends {} = {}> = {
  id?: string;
  createdTime?: string;
  fields?: Partial<Record>;
  __typename?: BaseTableType; // Not available upon fetch, made available after sanitising
};
