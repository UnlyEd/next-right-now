import React from 'react';

export type QuickPreviewContext = {
  isQuickPreviewPage: boolean;
}

/**
 * Uses native React Context API
 *
 * @example Usage
 *  import quickPreviewContext from './src/stores/quickPreviewContext';
 *  const { isQuickPreviewPage }: quickPreviewContext = React.useContext(quickPreviewContext);
 *
 * @see https://reactjs.org/docs/context.html
 * @see https://medium.com/better-programming/react-hooks-usecontext-30eb560999f for useContext hook example (open in anonymous browser #paywall)
 */
export const quickPreviewContext = React.createContext<QuickPreviewContext>(null);

export default quickPreviewContext;
