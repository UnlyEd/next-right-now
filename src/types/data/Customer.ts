import { RichText } from '../RichText';
import { GraphCMSSystemFields } from './GraphCMSSystemFields';
import { Theme } from './Theme';

export type Customer = {
  id?: string;
  ref?: string;
  label?: string;
  theme?: Theme;
  terms?: RichText;
} & GraphCMSSystemFields;
