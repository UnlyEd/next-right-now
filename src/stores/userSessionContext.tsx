import React from 'react';
import { UserSemiPersistentSession } from '../types/UserSemiPersistentSession';

export type UserSessionContext = {
  userSession?: UserSemiPersistentSession;
}

/**
 * Uses native React Context API
 *
 * @example Usage
 *  import userSessionContext from './src/stores/userSessionContext';
 *  const { userSession }: UserSessionContext = React.useContext(userSessionContext) || {};
 *
 * @see https://reactjs.org/docs/context.html
 * @see https://medium.com/better-programming/react-hooks-usecontext-30eb560999f for useContext hook example (open in anonymous browser #paywall)
 */
export const userSessionContext = React.createContext<UserSessionContext>(null);

export default userSessionContext;
