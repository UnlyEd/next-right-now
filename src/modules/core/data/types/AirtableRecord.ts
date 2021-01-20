import { GenericRecord } from '../record';
import { AirtableRecordBaseFields } from './AirtableRecordBaseFields';

/**
 * Sanitized Airtable record.
 *
 * A consolidated record has gone through the "sanitizeRecord" function.
 * Relationships have been resolved, unnecessary fields have been filtered out and data is consistent as what a developer would expect.
 *
 * You should mostly use consolidated airtable records over non-consolidated ones.
 */
export type AirtableRecord<Fields extends GenericRecord = GenericRecord> = {}
  & AirtableRecordBaseFields
  & Fields;
