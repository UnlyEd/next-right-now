import { AirtableAttachment } from './AirtableAttachment';
import { Theme } from './Theme';

/**
 * Simplified version of the Theme.
 *
 * CustomerTheme is what's really used for theming, and doesn't include useless properties from the Theme entity.
 */
export type CustomerTheme = Omit<Theme, 'ref' | 'id' | '__typename'> & {
  logo: AirtableAttachment;
  fonts: string;
};
