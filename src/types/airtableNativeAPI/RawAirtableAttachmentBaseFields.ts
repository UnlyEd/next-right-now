import { RawAirtableAttachmentThumbnails } from './RawAirtableAttachmentThumbnails';

/**
 * Airtable attachment base fields.
 *
 * Those fields are always included, with any attachment field.
 */
export type RawAirtableAttachmentBaseFields = {
  id: string;
  url: string;
  filename: string;
  size?: number; // TODO Not sure if it's always present, gotta confirm behaviour
  type: string;
  thumbnails: RawAirtableAttachmentThumbnails;
};
