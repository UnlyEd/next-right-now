import { Asset } from './Asset';
import { GraphCMSSystemFields } from './GraphCMSSystemFields';

export type Product = {
  stage?: string;
  id?: string;
  title?: string;
  description?: string;
  images?: Asset[];
  price?: number;
} & GraphCMSSystemFields;
