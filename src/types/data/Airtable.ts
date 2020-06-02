import { AirtableSystemFields } from './AirtableSystemFields';

/**
 * Airtable record
 * Use generic "fields" field
 *
 * There are a few differences between the Airtable record format and the one we will return after sanitising it.
 * So we force all props in "fields" to be optional to avoid running into TS issues
 */
export declare type AirtableRecord<Record extends Partial<AirtableSystemFields> = {}> = {
  id?: string;
  fields?: Partial<Record>;
  createdTime?: string;
  __typename?: string; // Not available upon fetch, made available after sanitising
};
