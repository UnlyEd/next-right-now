import {
  ClientNetworkConnectionType,
  ClientNetworkInformationSpeed,
} from '@/modules/core/networkInformation/networkInformation';
import * as Sentry from '@sentry/node';

/**
 * Configure Sentry tags related to the browser metadata.
 *
 * @param networkSpeed
 * @param networkConnectionType
 * @param isInIframe
 * @param iframeReferrer
 */
export const configureSentryBrowserMetadata = (networkSpeed: ClientNetworkInformationSpeed, networkConnectionType: ClientNetworkConnectionType, isInIframe: boolean, iframeReferrer: string): void => {
  if (process.env.SENTRY_DSN) {
    Sentry.configureScope((scope) => {
      scope.setTag('networkSpeed', networkSpeed);
      scope.setTag('networkConnectionType', networkConnectionType);
      scope.setTag('iframe', `${isInIframe}`);
      scope.setExtra('iframe', isInIframe);
      scope.setExtra('iframeReferrer', iframeReferrer);
    });
  }
};
