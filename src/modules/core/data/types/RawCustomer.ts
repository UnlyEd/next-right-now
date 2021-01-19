import { RawAirtableRecordBaseFields } from '@/modules/core/airtable/types/RawAirtableRecordBaseFields';
import { Customer } from './Customer';

/**
 * Customer record shape when returned by the Airtable API (raw).
 *
 * Used by unit tests.
 *
 * None of the relationships are resolved.
 */
export type RawCustomer = {
  theme: string[];
  modTFP: string[];
  modChatbot: string[];
  modSLG: string[];
  modSLS: string[];
} & RawAirtableRecordBaseFields
  & Omit<Customer, 'theme' | 'modTFP' | 'modChatbot' | 'modSLG' | 'modSLS'>; // Copy Customer shape and omit fields we want to override
