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
export type Asset = {
  id?: string;
  url?: string;
  filename?: string;
  size?: number;
  type?: string;
  thumbnails?: {
    small?: AssetThumbnail;
    large?: AssetThumbnail;
    full?: AssetThumbnail;
  };

  // NRN own fields, dynamically set when manipulating assets
  classes?: string;
  defaultTransformations?: object;
  linkTarget?: string;
  linkUrl?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style?: string | object | any;

  // Not used but kept to avoid tests failure
  title?: string;
  alt?: string;
};
