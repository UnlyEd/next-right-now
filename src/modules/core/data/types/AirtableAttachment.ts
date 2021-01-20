import { RawAirtableAttachment } from '@/modules/core/airtable/types/RawAirtableAttachment';
import { AirtableRecordBaseFields } from './AirtableRecordBaseFields';

/**
 * Airtable attachment after it has been consolidated.
 *
 * Contains additional fields.
 */
export type AirtableAttachment = {
  attachmentId: string; // The airtable attachment id, can't be stored as "id" because it's already taken by the Asset record id
} & Omit<RawAirtableAttachment, 'id'>
  & AirtableRecordBaseFields;
