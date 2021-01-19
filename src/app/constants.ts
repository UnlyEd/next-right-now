import { CustomerTheme } from '@/modules/core/data/types/CustomerTheme';
import { resolveVariantColor } from '@/modules/core/theming/colors';

export const NRN_DEFAULT_SERVICE_LABEL = process.env.NEXT_PUBLIC_APP_STAGE === 'production' ? 'Next Right Now' : `[${process.env.NEXT_PUBLIC_APP_STAGE === 'staging' ? 'Preview' : 'Dev'}] Next Right Now`;

/**
 * Co-branding logo displayed in the footer ("powered by Unly")
 */
export const NRN_CO_BRANDING_LOGO_URL = '/static/images/LOGO_Powered_by_UNLY_BLACK_BLUE.svg';

/**
 * Fallback fonts used until our own fonts have been loaded by the browser.
 * Should only use native fonts that are installed on all devices by default.
 *
 * @see https://www.w3schools.com/cssref/css_websafe_fonts.asp
 */
export const NRN_DEFAULT_FALLBACK_FONTS = 'sans-serif';

/**
 * Font used once our font have been loaded by the browser.
 */
export const NRN_DEFAULT_FONT = 'neuzeit-grotesk';

/**
 * Theme applied by default when no theme is defined.
 * Will be used on a variable-by-variable basis based on what's configured on the CMS for the customer.
 *
 * Applied through "src/utils/airtableSchema/airtableSchema.ts" default value transformations.
 *
 * Strongly inspired from Material Design Color System.
 * @see The below documentation comes from https://material.io/design/color/the-color-system.html
 */
export const NRN_DEFAULT_THEME: Omit<CustomerTheme, 'primaryColorVariant1' | 'secondaryColorVariant1'> & {
  primaryColorVariant1: (primaryColor: string) => string;
  secondaryColorVariant1: (primaryColor: string) => string;
} = {
  /**
   * A primary color is the color displayed most frequently across your app's screens and components.
   *
   */
  primaryColor: '#0028FF',

  /**
   * Primary color first variant, meant to highlight interactive elements using the primary color (hover, etc.).
   */
  primaryColorVariant1: resolveVariantColor,

  /**
   * Color applied to text, icons, surfaces displayed on top of the primary color.
   */
  onPrimaryColor: '#fff',

  /**
   * A secondary color provides more ways to accent and distinguish your product.
   * Having a secondary color is optional, and should be applied sparingly to accent select parts of your UI.
   * If you don’t have a secondary color, your primary color can also be used to accent elements.
   *
   * The secondary color should be the same as the primary color, when no particular secondary color is being used.
   *
   * Secondary colors are best for:
   *  - Floating action buttons
   *  - Selection controls, like sliders and switches
   *  - Highlighting selected text
   *  - Progress bars
   *  - Links and headlines
   */
  secondaryColor: '#000',

  /**
   * Secondary color first variant, meant to highlight interactive elements using the primary color (hover, etc.).
   */
  secondaryColorVariant1: resolveVariantColor,

  /**
   * Color applied to text, icons, surfaces displayed on top of the secondary color.
   */
  onSecondaryColor: '#fff',

  /**
   * Background colors don’t represent brand.
   *
   * The background color appears behind top-level content.
   *
   * Used by/for:
   *  - All pages background
   */
  backgroundColor: '#f4f4f4',

  /**
   * Color applied to text, icons, surfaces displayed on top of the background color.
   */
  onBackgroundColor: '#000',

  /**
   * Surface colors don’t represent brand.
   *
   * Surface colors affect surfaces of components, such as cards, sheets, and menus.
   */
  surfaceColor: '#fff',

  /**
   * Color applied to text, icons, surfaces displayed on top of the surface color.
   */
  onSurfaceColor: '#000',

  /**
   * Error colors don’t represent brand.
   *
   * Error color indicates errors in components, such as invalid text in a text field.
   * The baseline error color is #B00020.
   */
  errorColor: '#FFE0E0',

  /**
   * Color applied to text, icons, surfaces displayed on top of the error color.
   */
  onErrorColor: '#FE6262',

  /**
   * Logo displayed on the top footer.
   */
  logo: null,

  /**
   * Fonts used by the application.
   *
   * XXX At the moment, we don't allow the customer to define its own font, even though it's part of the customer theme.
   */
  fonts: NRN_DEFAULT_FONT,
};

export const GITHUB_API_BASE_URL = 'https://api.github.com/';

/**
 * Your GitHub Owner name.
 * Used by "startVercelDeployment" API endpoint.
 */
export const GITHUB_OWNER_NAME = 'UnlyEd';

/**
 * Your GitHub Repository name.
 * Used by "startVercelDeployment" API endpoint.
 */
export const GITHUB_REPO_NAME = 'next-right-now';
