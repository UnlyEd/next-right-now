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
 * There is no real use-case for this at the moment, it's more of a showcase on how Context API can be used
 *
 * @example
 *  import cookieContext from './src/stores/cookieContext';
 *  const { userSession, cookiesManager }: CookieContext = React.useContext(cookieContext) || {};
 */
export const cookieContext = React.createContext<CookieContext>(null);

export default cookieContext;
