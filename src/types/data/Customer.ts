import { I18nRichText } from '../I18nRichText';
import { GraphCMSSystemFields } from './GraphCMSSystemFields';
import { Product } from './Product';
import { Theme } from './Theme';

export type Customer = {
  id?: string;
  ref?: string;
  label?: string;
  availableLanguages: string[];
  products?: Product[];
  theme?: Theme;
  serviceLabel?: string;
  termsDescription?: I18nRichText;
  privacyDescription?: I18nRichText;
} & GraphCMSSystemFields;
