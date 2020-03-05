import { GraphCMSSystemFields } from './GraphCMSSystemFields';

export declare type Asset = {
  id?: string;
  handle?: string;
  fileName?: string;
  height?: number | string;
  width?: number | string;
  size?: number;
  mimeType?: string;
  url?: string; // Field added at runtime by GraphCMS asset's provider - See https://www.filestack.com/
} & GraphCMSSystemFields;
