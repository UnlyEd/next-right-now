import { NextApiRequest } from 'next';
import { GenericObject } from '../data/types/GenericObject';

/**
 * Parse the request body if it's a string, or return the body as-it if it's not.
 *
 * Simplifies the handling of "body" from our APIs, by insuring a consistant way of dealing with the request body.
 * This way, it doesn't matter if data are sent using proper headers (Content-Type) or not.
 *
 * @param req
 */
export const convertRequestBodyToJSObject = <T = unknown>(req: NextApiRequest): GenericObject<T> => {
  let parsedBody: GenericObject<T> = {};

  if (typeof req?.body === 'string' && req?.body?.length > 0) {
    parsedBody = JSON.parse(req?.body);
  } else {
    parsedBody = req.body;
  }

  return parsedBody;
};

export default convertRequestBodyToJSObject;
