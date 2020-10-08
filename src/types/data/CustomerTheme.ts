import { Theme } from './Theme';

/**
 * Simplified version of the Theme.
 *
 * CustomerTheme is what's really used for theming, and doesn't include useless properties from the Theme entity.
 */
export type CustomerTheme = Pick<Theme, 'logo' | 'primaryColor'>
