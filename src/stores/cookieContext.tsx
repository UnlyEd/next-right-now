import React from 'react';
import { UserSemiPersistentSession } from '../types/UserSemiPersistentSession';
import UniversalCookiesManager from '../utils/UniversalCookiesManager';

export type CookieContext = {
  userSession?: UserSemiPersistentSession;
  cookiesManager?: UniversalCookiesManager;
}

/**
 * Uses native React Context API
 *
 * @example Usage
 *  import cookieContext from './src/stores/cookieContext';
 *  const { userSession, cookiesManager }: CookieContext = React.useContext(cookieContext) || {};
 *
 * @see https://reactjs.org/docs/context.html
 * @see https://medium.com/better-programming/react-hooks-usecontext-30eb560999f for useContext hook example (open in anonymous browser #paywall)
 */
export const cookieContext = React.createContext<CookieContext>(null);

export default cookieContext;
