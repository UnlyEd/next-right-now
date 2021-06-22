import {
  ClientNetworkConnectionType,
  ClientNetworkInformationSpeed,
} from '@/modules/core/networkInformation/networkInformation';
import { UserConsent } from '@/modules/core/userConsent/types/UserConsent';

/**
 * Properties necessary to initialize a new Amplitude instance.
 */
export type GetAmplitudeInstanceProps = {
  customerRef: string;
  iframeReferrer: string;
  isInIframe?: boolean;
  lang?: string;
  locale?: string;
  userId?: string;
  userConsent: UserConsent;
  networkSpeed: ClientNetworkInformationSpeed;
  networkConnectionType: ClientNetworkConnectionType;
}
