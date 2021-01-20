import { CSSStyles } from '@/modules/core/css/types/CSSStyles';
import { AirtableAttachment } from './AirtableAttachment';

export type AssetTransformations = {
  height?: number;
  width?: number;
};

/**
 * Sanitized Asset Airtable record.
 *
 * An asset is a table composed of an Airtable "Attachment" field.
 * Some fields are managed internally by Airtable (RawAirtableAttachmentBaseFields) and we have no control over them (they're not columns).
 *
 * A consolidated record has gone through the "sanitizeRecord" function.
 * Only useful or allowed fields are mapped below.
 * Other fields have been filtered out during sanitization and thus aren't part of the shape even though they exist on Airtable.
 * Some fields are filtered out because we don't want them to be shared with the client-side (sensitive information).
 * Some fields are just not useful within this application and are not represented to avoid complicating things.
 */
export type Asset = {
  ref: string;
  title?: string;
  alt?: string;
  linkUrl?: string;
  linkTarget?: string;

  // Not defined on Airtable API but kept to avoid tests failure with Asset test component
  classes?: string;
  style?: CSSStyles;
} & AirtableAttachment
  & AssetTransformations;
