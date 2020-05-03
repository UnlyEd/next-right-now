import { NRN_DEFAULT_THEME } from '../constants';
import { Customer } from '../types/data/Customer';
import { Theme } from '../types/data/Theme';

/**
 * Initialises customer theme, uses default values if not specified
 *
 * @param customer
 */
export const initCustomerTheme = (customer: Customer): Theme => {
  const theme: Theme = customer?.theme || {};
  theme.primaryColor = theme?.primaryColor || NRN_DEFAULT_THEME.primaryColor; // Apply default theming if not specified

  return theme;
};
