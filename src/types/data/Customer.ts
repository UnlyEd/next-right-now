import { Markdown } from '../Markdown';
import { Product } from './Product';
import { Theme } from './Theme';

export declare type Customer = {
  label?: string; // i18n field auto computed
  labelEN?: string;
  labelFR?: string;
  products?: Product[];
  ref?: string;
  theme?: Theme;
  terms?: Markdown; // i18n field auto computed
  termsEN?: Markdown;
  termsFR?: Markdown;
};
