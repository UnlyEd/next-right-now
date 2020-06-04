import { NRN_DEFAULT_THEME } from '../../constants';
import { AirtableRecord } from '../../types/data/AirtableRecord';
import { Customer } from '../../types/data/Customer';
import { CustomerTheme } from '../../types/data/CustomerTheme';
import { Theme } from '../../types/data/Theme';

/**
 * Initialises customer customerTheme, uses default values if not specified
 *
 * @param customer
 */
export const initCustomerTheme = (customer: Customer): CustomerTheme => {
  const theme: Theme = ((customer?.theme as AirtableRecord<Theme>)?.fields || {}) as Theme;
  const customerTheme: CustomerTheme = {
    primaryColor: theme?.primaryColor || NRN_DEFAULT_THEME.primaryColor, // Apply default theming if not specified
    logo: theme.logo,
  };

  return customerTheme;
};
