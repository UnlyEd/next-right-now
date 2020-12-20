import { AmplitudeClient } from 'amplitude-js';
import React from 'react';

/**
 * The AmplitudeContext contains amplitude-related properties
 *
 * @see https://stackoverflow.com/a/40076355/2391795
 * @see https://github.com/Microsoft/TypeScript/blob/ee25cdecbca49b2b5a290ecd65224f425b1d6a9c/lib/lib.es5.d.ts#L1354
 */
export type AmplitudeContext = {
  // We need to access the amplitudeInstance initialised in BrowserPageBootstrap, in other parts of the app
  amplitudeInstance?: AmplitudeClient;
}

/**
 * Initial context, used by default until the Context Provider is initialised.
 *
 * @default Empty object, to allow for destructuring even when the context hasn't been initialised (on the server)
 */
const initialContext = {};

/**
 * Uses native React Context API, meant to be used from hooks only, not by functional components
 *
 * @example Usage
 *  import amplitudeContext from './src/stores/amplitudeContext';
 *  const { amplitudeInstance }: AmplitudeContext = React.useContext(amplitudeContext);
 *
 * @see https://reactjs.org/docs/context.html
 * @see https://medium.com/better-programming/react-hooks-usecontext-30eb560999f for useContext hook example (open in anonymous browser #paywall)
 */
export const amplitudeContext = React.createContext<AmplitudeContext>(initialContext);

export default amplitudeContext;
