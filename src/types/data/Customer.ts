import { RichText } from '../RichText';
import { AirtableSystemFields } from './AirtableSystemFields';
import { Product } from './Product';
import { Theme } from './Theme';

export declare type Customer = {
  ref?: string;
  label?: string;
  labelEN?: string;
  labelFR?: string;
  theme?: Theme;
  terms?: RichText;
  termsEN?: RichText;
  termsFR?: RichText;
  products?: Product[];
} & AirtableSystemFields;
