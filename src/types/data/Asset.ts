import { GraphCMSSystemFields } from './GraphCMSSystemFields';

export declare type Asset = {
  id?: string;
  alt?: string;
  classes?: string;
  defaultTransformations?: object;
  fileName?: string;
  handle?: string;
  height?: number | string;
  importUrl?: string;
  key?: string;
  linkTarget?: string;
  linkUrl?: string;
  mimeType?: string;
  size?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style?: string | object | any;
  title?: string;
  url?: string;
  width?: number | string;
} & GraphCMSSystemFields;
