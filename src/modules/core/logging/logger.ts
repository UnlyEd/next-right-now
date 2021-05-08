import createSimpleLogger from '@unly/simple-logger';
import { SimpleLogger } from '@unly/simple-logger/dist/simpleLogger';

/**
 * Custom logger proxy.
 *
 * Customize the @unly/simple-logger library by providing app-wide default behavior.
 *
 * @param fileLabel
 */
export const createLogger = ({ fileLabel }: { fileLabel: string }): SimpleLogger => {
  return createSimpleLogger({
    prefix: fileLabel,
    shouldPrint: (mode) => {
      return process.env.NEXT_PUBLIC_APP_STAGE !== 'production';
    },
  });
};
