/**
 * Detects whether LightHouse is running on the page or not.
 *
 * Returns null when not executed from the browser.
 */
export const detectLightHouse = (): boolean | null => {
  if (typeof window !== 'undefined') {
    return navigator?.userAgent?.indexOf('Chrome-Lighthouse') > -1;
  }

  return null;
};
