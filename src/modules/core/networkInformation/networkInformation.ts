import { isBrowser } from '@unly/utils';
import { NetworkInformation } from 'web-api-hooks/dist-types/experimental-types/NetworkInformation.bundled';

export type NetworkInformationSpeed = NetworkInformation['effectiveType'] | 'unknown';

/**
 * Returns the device's network speed type.
 *
 * Meant to be used outside of React components.
 *
 * XXX If you want to use this in a React component, you should rather use the "useNetworkInformation" hook from "web-api-hooks" library.
 */
export const getNetworkInformationSpeed = (): NetworkInformationSpeed => {
  let networkInformation;

  if (isBrowser()) {
    // @ts-ignore
    networkInformation = navigator?.connection || navigator?.mozConnection || navigator?.webkitConnection;
  }

  return networkInformation?.effectiveType || 'unknown';
};
