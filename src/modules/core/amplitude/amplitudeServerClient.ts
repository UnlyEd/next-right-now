import { AMPLITUDE_EVENTS } from '@/modules/core/amplitude/events';
import { GenericObject } from '@/modules/core/data/types/GenericObject';
import { createLogger } from '@/modules/core/logging/logger';
import { init } from '@amplitude/node';
import { LogLevel } from '@amplitude/types/dist/src/logger';
import { Response } from '@amplitude/types/dist/src/response';
import * as Sentry from '@sentry/node';
import startsWith from 'lodash.startswith';

const fileLabel = 'modules/core/amplitude/amplitudeServerClient';
const logger = createLogger({
  fileLabel,
});

const DEFAULT_DEVICE_ID = 'server';

const amplitudeServerClient = init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY, {
  debug: process.env.NEXT_PUBLIC_APP_STAGE !== 'production',
  logLevel: process.env.NEXT_PUBLIC_APP_STAGE !== 'production' ? LogLevel.Verbose : LogLevel.Error,
});

/**
 * Sends an analytic event to Amplitude.
 *
 * XXX Do not use it in Next.js pages, only in the API (it's not universal and won't work in the browser!).
 *
 * @param eventName
 * @param userId
 *
 * @param props
 *
 * @see https://developers.amplitude.com/docs/nodejs
 * @see https://www.npmjs.com/package/@amplitude/node
 */
export const logEvent = async (eventName: AMPLITUDE_EVENTS, userId: string, props: GenericObject = {}): Promise<void> => {
  try {
    logger.info(`Logging Amplitude event "${eventName}"${userId ? ` for user "${userId}"` : ''} with properties:`, props);

    amplitudeServerClient.logEvent({
      event_type: eventName,
      // Either user_id or device_id must be set, they can't both be empty or "unknown" or "eventsIngested" will be set to 0 in the response
      user_id: userId || undefined,
      device_id: userId ? undefined : DEFAULT_DEVICE_ID,
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
    const response: Response = await amplitudeServerClient.flush();

    // Monitor non 2XX response codes to allow for advanced debugging of edge cases
    if (!startsWith(response?.statusCode?.toString(10), '2')) {
      const message = `Amplitude event didn't return 200 response.`;
      logger.error(message, response);
      Sentry.withScope((scope) => {
        scope.setContext('response', response);
        Sentry.captureException(message);
      });
    } else {
      // @ts-ignore
      if (response?.body?.eventsIngested === 0) {
        const message = `Amplitude event wasn't ingested (it was sent, but not stored in Amplitude).`;
        logger.error(message, response);
        Sentry.withScope((scope) => {
          scope.setContext('response', response);
          Sentry.captureException(message);
        });
      }
    }
  } catch (e) {
    logger.error(e);
    Sentry.captureException(e);
  }
};
