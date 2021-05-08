import createSimpleLogger from '@unly/simple-logger';
import { SimpleLogger } from '@unly/simple-logger';

/**
 * Custom logger proxy.
 *
 * Customize the @unly/simple-logger library by providing app-wide default behavior.
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
      return process.env.NEXT_PUBLIC_APP_STAGE !== 'production';
    },
  });
};
