import { Asset } from './Asset';
import { GraphCMSSystemFields } from './GraphCMSSystemFields';

export declare type Theme = {
  id?: string;
  primaryColor?: string;
  logo?: Asset;
} & GraphCMSSystemFields;
