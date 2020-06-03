import { Asset } from './Asset';
import { AirtableSystemFields } from './AirtableSystemFields';

export declare type Theme = {
  id?: string;
  primaryColor?: string;
  logo?: Asset;
} & AirtableSystemFields;
