import { isBrowser } from '@unly/utils';
import map from 'lodash.map';
import { NRN_DEFAULT_THEME } from '@/app/constants';
import { AirtableRecord } from '../data/types/AirtableRecord';
import { Customer } from '../data/types/Customer';
import { CustomerTheme } from '../data/types/CustomerTheme';
import { Theme } from '../data/types/Theme';
import { resolveVariantColor } from './colors';

/**
 * Initialises customer customerTheme, uses default values for unspecified properties.
 *
 * XXX We chose to handle default values here instead of "airtableSchema" in order to handle default values properly,
 *  even when there is no customer.modTFP relationship defined.
 *
 * @param customer
 */
export const initCustomerTheme = (customer: Customer): CustomerTheme => {
  const DEFAULT_THEME: CustomerTheme = {
    primaryColor: NRN_DEFAULT_THEME.primaryColor,
    primaryColorVariant1: NRN_DEFAULT_THEME.primaryColorVariant1(NRN_DEFAULT_THEME.primaryColor),
    onPrimaryColor: NRN_DEFAULT_THEME.onPrimaryColor,
    secondaryColor: NRN_DEFAULT_THEME.secondaryColor,
    secondaryColorVariant1: NRN_DEFAULT_THEME.secondaryColorVariant1(NRN_DEFAULT_THEME.secondaryColor),
    onSecondaryColor: NRN_DEFAULT_THEME.onSecondaryColor,
    backgroundColor: NRN_DEFAULT_THEME.backgroundColor,
    onBackgroundColor: NRN_DEFAULT_THEME.onBackgroundColor,
    surfaceColor: NRN_DEFAULT_THEME.surfaceColor,
    onSurfaceColor: NRN_DEFAULT_THEME.onSurfaceColor,
    errorColor: NRN_DEFAULT_THEME.errorColor,
    onErrorColor: NRN_DEFAULT_THEME.onErrorColor,
    logo: NRN_DEFAULT_THEME.logo,
    fonts: NRN_DEFAULT_THEME.fonts,
  };

  const theme: Partial<CustomerTheme> = {};
  map(customer?.theme, (value: any, key: string) => {
    if (value !== null) { // Ignore all null values, so that unspecified properties use the default value
      theme[key] = value;
    }
  });

  // Use all specified properties and fallback to the default value for those that are unspecified
  const customerTheme: CustomerTheme = {
    ...DEFAULT_THEME,
    ...(theme as AirtableRecord<Theme>),
    logo: customer?.theme?.logo,
    fonts: NRN_DEFAULT_THEME.fonts,
  };

  // Force recalculation of dynamic colors, if they weren't specified by the customer
  customerTheme.primaryColorVariant1 = theme?.primaryColorVariant1 || resolveVariantColor(customerTheme.primaryColor);
  customerTheme.secondaryColorVariant1 = theme?.secondaryColorVariant1 || resolveVariantColor(customerTheme.secondaryColor);

  if (isBrowser() && process.env.NEXT_PUBLIC_APP_STAGE !== 'production' && process.env.NODE_ENV !== 'test') {
    // eslint-disable-next-line no-console
    console.debug('customerTheme', customerTheme);
  }

  return customerTheme;
};
