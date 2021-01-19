import { CustomerTheme } from '../data/types/CustomerTheme';

/**
 * Mode to use for the component theme.
 */
export type ComponentThemeMode =
  'primary' | // Primary color for background, on-primary color for text
  'primary-outline' | // Primary color for text and for border, on-primary color for background
  'primary-reverse' | // Primary color for text, on-primary color for background
  'primary-variant' | // Primary variant color for background, on-primary color for text
  'secondary' | // Secondary color for background, on-secondary color for text
  'secondary-outline' | // Secondary color for text and for border, on-secondary color for background
  'secondary-reverse' | // Secondary color for text, on-secondary color for background
  'secondary-variant'; // Secondary variant color for background, on-secondary color for text

/**
 * Colors of a component.
 */
export type ThemedComponentColors = {
  color: string;
  backgroundColor: string;
  borderColor: string;
  hoverColor: string;
  hoverBackgroundColor: string;
  hoverBorderColor: string;
  hoverBoxShadowColor: string;
}

/**
 * Props used by any themed component.
 */
export type ThemedComponentProps = {
  /**
   * Display mode.
   *
   * - `primary`: Primary color for background, on-primary color for text
   * - `primary-outline`: Primary color for text and for border, on-primary color for background
   * - `primary-reverse`: Primary color for text, on-primary color for background
   * - `primary-variant`: Primary variant color for background, on-primary color for text
   * - `secondary`: Secondary color for background, on-secondary color for text
   * - `secondary-outline`: Secondary color for text and for border, on-secondary color for background
   * - `secondary-reverse`: Secondary color for text, on-secondary color for background
   * - `secondary-variant`: Secondary variant color for background, on-secondary color for text
   *
   * @default primary
   */
  mode?: ComponentThemeMode;

  /**
   * Whether the background is transparent.
   *
   * @default false
   */
  isTransparent?: boolean;
}

/**
 * Resolves the colors of the component, based on the selected "mode" and various options (isTransparent, etc.).
 *
 * @param customerTheme
 * @param mode
 * @param transparent
 */
export const resolveThemedComponentColors = (customerTheme: CustomerTheme, mode: ComponentThemeMode, transparent: boolean): ThemedComponentColors => {
  const {
    primaryColor, primaryColorVariant1, onPrimaryColor,
    secondaryColor, secondaryColorVariant1, onSecondaryColor,
  } = customerTheme;
  let color;
  let backgroundColor;
  let borderColor;
  let hoverColor;
  let hoverBackgroundColor;
  let hoverBorderColor;
  let hoverBoxShadowColor;

  if (mode === 'primary') { // Primary color for background, on-primary color for text
    color = onPrimaryColor;
    backgroundColor = primaryColor;
    borderColor = primaryColor;
    hoverColor = onPrimaryColor;
    hoverBackgroundColor = primaryColor;
    hoverBorderColor = primaryColor;
    hoverBoxShadowColor = primaryColor;
  } else if (mode === 'primary-reverse') { // Primary color for text, on-primary color for background
    color = primaryColor;
    backgroundColor = onPrimaryColor;
    borderColor = onPrimaryColor;
    hoverColor = primaryColor;
    hoverBackgroundColor = onPrimaryColor;
    hoverBorderColor = onPrimaryColor;
    hoverBoxShadowColor = onPrimaryColor;
  } else if (mode === 'primary-outline') { // Primary color for text and for border, on-primary color for background
    color = primaryColor;
    backgroundColor = onPrimaryColor;
    borderColor = primaryColor;
    hoverColor = primaryColor;
    hoverBackgroundColor = onPrimaryColor;
    hoverBorderColor = primaryColor;
    hoverBoxShadowColor = onPrimaryColor;
  } else if (mode === 'primary-variant') { // Primary variant color for background, on-primary color for text
    color = primaryColor;
    backgroundColor = primaryColorVariant1;
    borderColor = 'transparent';
    hoverColor = primaryColor;
    hoverBackgroundColor = primaryColorVariant1;
    hoverBorderColor = 'transparent';
    hoverBoxShadowColor = primaryColorVariant1;
  } else if (mode === 'secondary') { // Secondary color for background, on-secondary color for text
    color = onSecondaryColor;
    backgroundColor = secondaryColor;
    borderColor = secondaryColor;
    hoverColor = onSecondaryColor;
    hoverBackgroundColor = secondaryColor;
    hoverBorderColor = secondaryColor;
    hoverBoxShadowColor = secondaryColor;
  } else if (mode === 'secondary-reverse') { // Secondary color for text, on-secondary color for background
    color = secondaryColor;
    backgroundColor = onSecondaryColor;
    borderColor = onSecondaryColor;
    hoverColor = secondaryColor;
    hoverBackgroundColor = onSecondaryColor;
    hoverBorderColor = onSecondaryColor;
    hoverBoxShadowColor = onSecondaryColor;
  } else if (mode === 'secondary-outline') { // Secondary color for text and for border, on-secondary color for background
    color = secondaryColor;
    backgroundColor = onSecondaryColor;
    borderColor = secondaryColor;
    hoverColor = secondaryColor;
    hoverBackgroundColor = onSecondaryColor;
    hoverBorderColor = secondaryColor;
    hoverBoxShadowColor = onSecondaryColor;
  } else if (mode === 'secondary-variant') { // Secondary variant color for background, on-secondary color for text
    color = secondaryColor;
    backgroundColor = secondaryColorVariant1;
    borderColor = 'transparent';
    hoverColor = secondaryColor;
    hoverBackgroundColor = secondaryColorVariant1;
    hoverBorderColor = 'transparent';
    hoverBoxShadowColor = secondaryColorVariant1;
  }

  if (transparent) {
    backgroundColor = 'transparent';
    hoverBackgroundColor = 'transparent';
  }

  return {
    color,
    backgroundColor,
    borderColor,
    hoverColor,
    hoverBackgroundColor,
    hoverBorderColor,
    hoverBoxShadowColor,
  };
};
