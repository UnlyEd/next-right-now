import { Asset } from './Asset';
import { GraphCMSSystemFields } from './GraphCMSSystemFields';

export type Theme = {
  id?: string;
  primaryColor?: string;
  logo?: Asset;
} & GraphCMSSystemFields;
