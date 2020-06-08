import { AirtableRecord } from './AirtableRecord';
import { Asset } from './Asset';
import { Customer } from './Customer';

export type Product = {
  customer?: AirtableRecord<Customer> | string[]; // Stored as an array of strings on AT API, converted to a Customer object once sanitised
  description?: string; // i18n field auto computed
  descriptionEN?: string;
  descriptionFR?: string;
  id?: number;
  images?: AirtableRecord<Asset>[];
  ref?: string;
  title?: string; // i18n field auto computed
  titleEN?: string;
  titleFR?: string;
  price?: number;
  status?: 'PUBLISHED' | 'DRAFT';
};
