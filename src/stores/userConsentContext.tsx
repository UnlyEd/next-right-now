import React from 'react';
import { UserConsent } from '../types/UserConsent';

export type UserConsentContext = UserConsent

const initialContext = {};

/**
 * Uses native React Context API
 *
 * @example Usage
 *  import userConsentContext from './src/stores/userConsentContext';
 *  const { getUserConsent }: UserConsentContext = React.useContext(userConsentContext);
 *
 * @see https://reactjs.org/docs/context.html
 * @see https://medium.com/better-programming/react-hooks-usecontext-30eb560999f for useContext hook example (open in anonymous browser #paywall)
 */
export const userConsentContext = React.createContext<UserConsentContext>(initialContext);

export default userConsentContext;
