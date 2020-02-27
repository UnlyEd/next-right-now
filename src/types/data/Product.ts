import { Asset } from './Asset';
import { GraphCMSSystemFields } from './GraphCMSSystemFields';

export declare type Product = {
  id?: string;
  title?: string;
  description?: string;
  images?: Asset[];
  price?: number;
} & GraphCMSSystemFields;
