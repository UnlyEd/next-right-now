/**
 * Starts the Next.js preview mode by redirecting to our own API endpoint which will enable it
 *
 * @param queryParameters
 */
export const startPreviewMode = (queryParameters: string): void => {
  window.location.href = `/api/preview?redirectTo=${window.location.pathname}${queryParameters}`;
};

/**
 * Stops the Next.js preview mode by redirecting to our own API endpoint which will disable it
 *
 * @param queryParameters
 */
export const stopPreviewMode = (queryParameters: string): void => {
  window.location.href = `/api/preview?stop=true&redirectTo=${window.location.pathname}${queryParameters}`;
};
