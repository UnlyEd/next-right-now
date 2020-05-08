import React from 'react';
import { UserSemiPersistentSession } from '../types/UserSemiPersistentSession';

/**
 * The UserSessionContext contains all UserSemiPersistentSession properties
 *
 * XXX "Partial" copies all properties from UserSemiPersistentSession and make them all optional
 *
 * @see https://stackoverflow.com/a/40076355/2391795
 * @see https://github.com/Microsoft/TypeScript/blob/ee25cdecbca49b2b5a290ecd65224f425b1d6a9c/lib/lib.es5.d.ts#L1354
 */
export type UserSessionContext = Partial<UserSemiPersistentSession>

const initialContext = {};

/**
 * The userSession is empty by default and will only be filled on the browser,
 * because it relies on data from cookies that are stored on the end user's browser
 *
 * Uses native React Context API, meant to be used from hooks only, not by functional components
 *
 * @example Usage
 *  import userSessionContext from './src/stores/userSessionContext';
 *  const { userSession }: UserSessionContext = React.useContext(userSessionContext);
 *
 * @see https://reactjs.org/docs/context.html
 * @see https://medium.com/better-programming/react-hooks-usecontext-30eb560999f for useContext hook example (open in anonymous browser #paywall)
 */
export const userSessionContext = React.createContext<UserSessionContext>(initialContext);

export default userSessionContext;
