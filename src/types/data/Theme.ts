import { AirtableRecord } from './AirtableRecord';
import { Asset } from './Asset';
import { Customer } from './Customer';

export type Theme = {
  customer: AirtableRecord<Customer> | string[]; // Stored as an array of strings on AT API, converted to a Customer object once sanitised
  id?: number;
  logo?: AirtableRecord<Asset> | AirtableRecord<Asset>[]; // Stored as an array on AT API, converted to an Asset object once sanitised
  primaryColor?: string;
};
