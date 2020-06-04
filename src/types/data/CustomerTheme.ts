import { Theme } from './Theme';

/**
 * Simplified version of the Theme
 *
 * CustomerTheme is what's really used for theming, and doesn't include all other properties from
 */
export declare type CustomerTheme = Pick<Theme, 'logo' | 'primaryColor'>
