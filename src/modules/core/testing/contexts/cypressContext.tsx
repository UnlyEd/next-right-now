import React from 'react';

export type CypressContext = {
  isCypressRunning?: boolean;
};

/**
 * Uses native React Context API
 *
 * @example Usage
 *  import cypressContext from './src/stores/cypressContext';
 *  const { locale, lang }: CustomerContext = React.useContext(cypressContext);
 *
 * @see https://reactjs.org/docs/context.html
 * @see https://medium.com/better-programming/react-hooks-usecontext-30eb560999f for useContext hook example (open in anonymous browser #paywall)
 */
export const cypressContext = React.createContext<CypressContext>({});

export default cypressContext;
