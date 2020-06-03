import { Asset } from './Asset';
import { Customer } from './Customer';

export declare type Product = {
  customer: Customer | string[]; // Stored as an array of strings on AT API, converted to a Customer object once sanitised
  description?: string; // i18n field auto computed
  descriptionEN?: string;
  descriptionFR?: string;
  id?: number;
  images?: Asset[];
  ref?: string;
  title?: string; // i18n field auto computed
  titleEN?: string;
  titleFR?: string;
  price?: number;
};
