import { RichText } from '../RichText';
import { GraphCMSSystemFields } from './GraphCMSSystemFields';
import { Theme } from './Theme';
import { Product } from './Product';

export type Customer = {
  id?: string;
  ref?: string;
  label?: string;
  availableLanguages: string[];
  products?: Product[];
  theme?: Theme;
  terms?: RichText;
  termsDescription?: RichText;
  privacyDescription?: RichText;
} & GraphCMSSystemFields;
