import { AirtableRecordBaseFields } from './AirtableRecordBaseFields';
import { Theme } from './Theme';

/**
 *
 */
export type RawTheme = {
  ref: string;
  customer: string[];
} & AirtableRecordBaseFields & Theme;
