import { isBrowser } from '@unly/utils';
import { NetworkInformation } from 'web-api-hooks/dist-types/experimental-types/NetworkInformation.bundled';

/**
 * Connection speed used by the client (browser).
 *
 * Universal, will return "not-applicable" if executed on the server.
 * Not available on all browsers, only a few of them provide such API.
 *
 * Experimental feature.
 *
 * @see https://developer.mozilla.org/fr/docs/Web/API/Navigator/connection
 */
export type ClientNetworkInformationSpeed =
  NetworkInformation['effectiveType'] // '2g' | '3g' | '4g' | 'slow-2g'
  | 'unknown' // When the browser doesn't provide a "Connection" feature
  | 'not-applicable'; // Connection speed isn't applicable on the server

/**
 * Connection type used by the client (browser).
 *
 * Universal, will return "not-applicable" if executed on the server.
 * Not available on all browsers, only a few of them provide such API.
 *
 * Experimental feature.
 *
 * @see https://developer.mozilla.org/fr/docs/Web/API/Navigator/connection
 */
export type ClientNetworkConnectionType =
  NetworkInformation['type'] // 'bluetooth' | 'cellular' | 'ethernet' | 'mixed' | 'none' | 'other' | 'unknown' | 'wifi' | 'wimax'
  | 'not-applicable'; // Connection type isn't applicable on the server

/**
 * Returns the device's network connection speed.
 *
 * Meant to be used outside of React components.
 *
 * XXX If you want to use this in a React component, you should rather use the "useNetworkInformation" hook from "web-api-hooks" library.
 */
export const getClientNetworkInformationSpeed = (): ClientNetworkInformationSpeed => {
  let networkInformation;

  if (isBrowser()) {
    // @ts-ignore Experimental feature, not described in TypeScript at the moment
    networkInformation = navigator?.connection || navigator?.mozConnection || navigator?.webkitConnection;
  } else {
    return 'not-applicable';
  }

  return networkInformation?.effectiveType || 'unknown';
};

/**
 * Returns the device's network connection type.
 *
 * Meant to be used outside of React components.
 *
 * XXX If you want to use this in a React component, you should rather use the "useNetworkInformation" hook from "web-api-hooks" library.
 */
export const getClientNetworkConnectionType = (): ClientNetworkConnectionType => {
  let networkInformation;

  if (isBrowser()) {
    // @ts-ignore Experimental feature, not described in TypeScript at the moment
    networkInformation = navigator?.connection || navigator?.mozConnection || navigator?.webkitConnection;
  } else {
    return 'not-applicable';
  }

  return networkInformation?.type;
};
