import { AirtableSystemFields } from './AirtableSystemFields';
import { Asset } from './Asset';

export declare type Product = {
  id?: string;
  title?: string;
  description?: string;
  images?: Asset[];
  price?: number;
} & AirtableSystemFields;
