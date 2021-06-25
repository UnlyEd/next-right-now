import { IncomingMessage } from 'http';
import { NextApiRequest } from 'next';

/**
 * TS type guard resolving whether "req" matches a "NextApiRequest" object.
 *
 * @param req
 *
 * @see https://www.typescripttutorial.net/typescript-tutorial/typescript-type-guards/
 * @see https://www.logicbig.com/tutorials/misc/typescript/type-guards.html
 */
export const isNextApiRequest = (req: NextApiRequest | IncomingMessage): req is NextApiRequest => {
  return (req as NextApiRequest).body !== undefined;
};
