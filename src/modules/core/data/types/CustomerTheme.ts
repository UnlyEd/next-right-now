import { Theme } from './Theme';

/**
 * Simplified version of the Theme.
 *
 * CustomerTheme is what's really used for theming, and doesn't include useless properties from the Theme entity.
 * Also, all properties defined in Theme will be set in CustomerTheme, because fallback values will have been applied.
 *
 * Inspired by MaterialUI Design system.
 *
 * @see https://material.io/design/color/the-color-system.html#color-theme-creation
 */
export type CustomerTheme = Required<Omit<Theme, 'ref' | 'id' | '__typename'>> & {};
