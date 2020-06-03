/**
 * Airtable record fetched from their API
 *
 * Uses generic "fields" field to allow extend using our own entities (Customer, Theme, etc.)
 */
export declare type AirtableRecord<Record extends {} = {}> = {
  id?: string;
  createdTime?: string;
  fields?: Partial<Record>;
  __typename?: string; // Not available upon fetch, made available after sanitising
};
