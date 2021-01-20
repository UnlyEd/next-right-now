import { GraphCMSSystemFields } from './GraphCMSSystemFields';

export type Asset = {
  id?: string;
  handle?: string;
  fileName?: string;
  height?: number | string;
  width?: number | string;
  size?: number;
  mimeType?: string;
  url?: string; // Field added at runtime by GraphCMS asset's provider - See https://www.filestack.com/

  // XXX Additional fields that do not exist on the native GraphCMS Asset model, but you can add them and they'll be handled when using GraphCMSAsset, for instance
  alt?: string;
  classes?: string;
  defaultTransformations?: object;
  importUrl?: string;
  key?: string;
  linkTarget?: string;
  linkUrl?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style?: string | object | any;
  title?: string;
} & GraphCMSSystemFields;
