import createSimpleLogger, { SimpleLogger } from '@unly/simple-logger';
import { isBrowser } from '@unly/utils';

/**
 * Custom logger proxy.
 *
 * Customizes the @unly/simple-logger library by providing app-wide default behavior.
 *
 * Optimized to avoid logging in the browser in production, to reduce the noise and to avoid leaking debug information publicly.
 *
 * @param fileLabel
 */
export const createLogger = ({ fileLabel }: { fileLabel: string }): SimpleLogger => {
  // Mute logger during tests, to avoid cluttering the console (similar to what we did to "console" through jest)
  if (process.env.NODE_ENV === 'test') {
    return global.muteConsole();
  }

  return createSimpleLogger({
    prefix: fileLabel,
    shouldPrint: (mode) => {
      console.debug('IS_SERVER_INITIAL_BUILD', process.env.IS_SERVER_INITIAL_BUILD);
      // When bundling with Webpack, only print errors/warnings to avoid printing too much noise on Vercel
      // IS_SERVER_INITIAL_BUILD is always "1" during development, and is being ignored
      if (process.env.NEXT_PUBLIC_APP_STAGE !== 'development' && process.env.IS_SERVER_INITIAL_BUILD === '1') {
        return mode === 'error' || mode === 'warn' || mode === 'debug';
      }

      // Otherwise, only hide browser errors in production
      return !(process.env.NEXT_PUBLIC_APP_STAGE === 'production' && isBrowser());
    },
  });
};
