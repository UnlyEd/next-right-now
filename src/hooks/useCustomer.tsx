import React from 'react';
import customerContext from '../stores/customerContext';
import { Customer } from '../types/data/Customer';

/**
 * Hook to access customer data
 *
 * The customer data are pre-fetched, either during SSR or SSG and are not meant to be fetched or modified by the app (they're kinda read-only)
 * Thus, it's fine to use React Context for this kind of usage.
 *
 * XXX If you need to store data that are meant to be updated (e.g: through forms) then using React Context is a very bad idea!
 *  If you don't know why, you should read more about it.
 *  Long story short, React Context is better be used with data that doesn't mutate, like theme/localisation
 *  Read more at https://medium.com/swlh/recoil-another-react-state-management-library-97fc979a8d2b
 *  If you need to handle a global state that changes over time, your should rather use a dedicated library (opinionated: I'd probably use Recoil)
 *
 * Uses customerContext internally (provides an identical API)
 *
 * This hook should be used by components in favor of customerContext directly,
 * because it grants higher flexibility if you ever need to change the implementation (e.g: use something else than React.Context, like Redux/MobX/Recoil)
 *
 * @see https://slides.com/djanoskova/react-context-api-create-a-reusable-snackbar#/11
 */
const useCustomer = (): Customer => {
  return React.useContext(customerContext);
};

export default useCustomer;
