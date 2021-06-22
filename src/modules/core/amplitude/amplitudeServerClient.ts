import { AMPLITUDE_EVENTS } from '@/modules/core/amplitude/events';
import { GenericObject } from '@/modules/core/data/types/GenericObject';
import { createLogger } from '@/modules/core/logging/logger';
import { init } from '@amplitude/node';
import { LogLevel } from '@amplitude/types/dist/src/logger';
import * as Sentry from '@sentry/node';
import startsWith from 'lodash.startswith';

const fileLabel = 'modules/core/amplitude/amplitudeServerClient';
const logger = createLogger({
  fileLabel,
});

/**
 * Amplitude client, for the server-side (Node.js).
 *
 * XXX Do not use it in Next.js pages (it's not universal!), only in the API.
 *
 * @see https://www.npmjs.com/package/@amplitude/node
 * @see https://developers.amplitude.com/docs/nodejs
 */
const amplitudeServerClient = init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY, {
  debug: process.env.NEXT_PUBLIC_APP_STAGE !== 'production',
  logLevel: process.env.NEXT_PUBLIC_APP_STAGE !== 'production' ? LogLevel.Verbose : LogLevel.Error,
});

/**
 * Sends an analytic event to Amplitude.
 *
 * @param eventName
 * @param userId
 *
 * @param props
 * @see https://developers.amplitude.com/docs/nodejs
 */
export const logEvent = async (eventName: AMPLITUDE_EVENTS, userId: string, props: GenericObject = {}): Promise<void> => {
  try {
    logger.info(`Logging Amplitude event "${eventName}"${userId ? ` for user "${userId}"` : ''} with properties:`, props);

    amplitudeServerClient.logEvent({
      event_type: eventName,
      user_id: userId || '', // User id must be set (even if empty) for the event to be sent correctly
      event_properties: {
        'customer.ref': process.env.NEXT_PUBLIC_CUSTOMER_REF,
        ...props,
      },
    })
      // .then((res) => logger.info('response', res))
      .catch((e) => logger.error(e));

    // Send any events that are currently queued for sending.
    // Will automatically happen on the next event loop.
    // XXX It's necessary to await, or it might not work properly - See https://vercel.com/docs/platform/limits#streaming-responses
    const response = await amplitudeServerClient.flush();

    // Monitor non 2XX response codes to allow for advanced debugging of edge cases
    if (!startsWith(response?.statusCode?.toString(10), '2')) {
      const message = `Amplitude event didn't return 200 response.`;
      logger.error(message, response);
      Sentry.withScope((scope) => {
        scope.setExtra('response', response);
        Sentry.captureException(message);
      });
    }
    // TODO trouver origine warning
  } catch (e) {
    logger.error(e);
    Sentry.captureException(e);
  }
};

export default amplitudeServerClient;
