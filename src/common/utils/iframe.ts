import { isBrowser } from '@unly/utils';
import includes from 'lodash.includes';

/**
 * Resolves whether the current web page is running as an iframe from another page
 *
 * Iframes are only detectable on the client-side
 * Also, using iframe=true as search parameter forces iframe mode, it's handy when using an iframe from the same domain
 * (because same-domain iframes aren't detected when comparing window.parent and window.top since it's the same window)
 *
 * @return {boolean}
 * @see https://stackoverflow.com/a/326076/2391795
 */
export const isRunningInIframe = (): boolean => {
  if (isBrowser()) {
    try {
      return window.self !== window.top || includes(document.location.search, 'iframe=true');
    } catch (e) {
      return null; // Can't tell
    }
  } else {
    return null; // Can't tell
  }
};

/**
 * Resolve the iframe's referrer (the url of the website the iframe was created)
 *
 * Helpful to know which of our customer use our app through an iframe, and analyse usage
 * May not always work due to security concerns
 *
 * @return {string}
 * @see https://stackoverflow.com/a/19438406/2391795
 */
export const getIframeReferrer = (): string => {
  if (isRunningInIframe()) {
    try {
      return document.referrer || null;
    } catch (e) {
      return null;
    }
  } else {
    return null;
  }
};
