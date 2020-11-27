import { NextApiResponse } from 'next';

/**
 * Server side redirection.
 *
 * Use a 302 status code by default. (Temporary redirection)
 *  - Code: 302
 *  - Typical use case: "The Web page is temporarily unavailable for unforeseen reasons."
 *
 * XXX If you don't want to perform the redirection, use a non 3XX status code (e.g: 200)
 *  Useful to disable a redirection conditionally.
 *
 * @param res
 * @param location
 * @param statusCode
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Redirections
 */
const redirect = (res: NextApiResponse, location: string, statusCode : 200 | 300 | 301 | 302 | 303 | 304 | 307 | 308 = 302): void => {
  if (!res) {
    throw new Error('Response object required');
  }

  if (!statusCode) {
    throw new Error('Status code required');
  }

  if (!location) {
    throw new Error('Location required');
  }

  res.statusCode = statusCode;
  res.setHeader('Location', location);
  res.end();
};

export default redirect;
