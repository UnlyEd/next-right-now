import { Asset } from './Asset';
import { Theme } from './Theme';

/**
 * Simplified version of the Theme.
 *
 * CustomerTheme is what's really used for theming, and doesn't include useless properties from the Theme entity.
 */
export type CustomerTheme = Omit<Theme, 'ref' | 'id' | '__typename'> & {
  serviceLogo: Asset;
  footerLogo: Asset;
  fonts: string;
};
