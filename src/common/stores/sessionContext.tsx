import React from 'react';
import { UserSemiPersistentSession } from '../types/UserSemiPersistentSession';
import UniversalCookiesManager from '../utils/cookies/UniversalCookiesManager';

export type SessionContext = {
  userSession?: UserSemiPersistentSession;
  cookiesManager?: UniversalCookiesManager;
}

/**
 * Uses native React Context API
 *
 * @example Usage
 *  import sessionContext from './src/stores/sessionContext';
 *  const { userSession, cookiesManager }: SessionContext = React.useContext(sessionContext) || {};
 *
 * @see https://reactjs.org/docs/context.html
 * @see https://medium.com/better-programming/react-hooks-usecontext-30eb560999f for useContext hook example (open in anonymous browser #paywall)
 */
export const sessionContext = React.createContext<SessionContext>(null);

export default sessionContext;
