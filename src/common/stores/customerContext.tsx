import React from 'react';
import { Customer } from '../types/data/Customer';

export type CustomerContext = Customer;

/**
 * Uses native React Context API
 *
 * @example Usage
 *  import customerContext from './src/stores/customerContext';
 *  const { locale, lang }: CustomerContext = React.useContext(customerContext);
 *
 * @see https://reactjs.org/docs/context.html
 * @see https://medium.com/better-programming/react-hooks-usecontext-30eb560999f for useContext hook example (open in anonymous browser #paywall)
 */
export const customerContext = React.createContext<CustomerContext>(null);

export default customerContext;
