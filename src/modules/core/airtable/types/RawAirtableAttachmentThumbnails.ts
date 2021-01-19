import { RawAirtableAttachmentThumbnail } from './RawAirtableAttachmentThumbnail';

/**
 * Thumbnails attached to an Airtable Attachment field.
 *
 * Properties are "randomly" defined, depending on the attachment's size they may all be present, or not.
 */
export type RawAirtableAttachmentThumbnails = {
  small?: RawAirtableAttachmentThumbnail;
  large?: RawAirtableAttachmentThumbnail;
  full?: RawAirtableAttachmentThumbnail;
};
