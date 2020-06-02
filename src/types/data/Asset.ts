import { AirtableSystemFields } from './AirtableSystemFields';

export type AssetThumbnail = {
  url: string;
  width: number;
  height: number;
}

/**
 * An asset is a Airtable "Attachment" field
 *
 * All fields are managed internally by Airtable and we have no control over them (they're not columns)
 */
export declare type Asset = {
  url: string;
  filename: string;
  size?: number;
  type?: string;
  thumbnails?: {
    small?: AssetThumbnail;
    large?: AssetThumbnail;
  }
} & AirtableSystemFields;
