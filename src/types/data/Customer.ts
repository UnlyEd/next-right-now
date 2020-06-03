import { Markdown } from '../Markdown';
import { Product } from './Product';
import { Theme } from './Theme';

export declare type Customer = {
  label?: string; // i18n field auto computed
  labelEN?: string;
  labelFR?: string;
  products?: Product[] | string[]; // Stored as an array of strings on AT API, converted to a Product array once sanitised
  ref?: string;
  theme?: Theme | string[]; // Stored as an array of strings on AT API, converted to a Theme object once sanitised
  terms?: Markdown; // i18n field auto computed
  termsEN?: Markdown;
  termsFR?: Markdown;
};
