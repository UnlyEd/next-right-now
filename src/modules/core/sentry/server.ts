import { isNextApiRequest } from '@/app/isNextApiRequest';
import { convertRequestBodyToJSObject } from '@/modules/core/api/convertRequestBodyToJSObject';
import { GenericObject } from '@/modules/core/data/types/GenericObject';
import Sentry from '@/modules/core/sentry/init';
import { IncomingMessage } from 'http'; // Automatically inits Sentry during import
import map from 'lodash.map';
import { NextApiRequest } from 'next';

/**
 * Configures the Sentry scope by extracting useful tags and context from the given request.
 *
 * XXX Because it imports Sentry from "@/modules/core/sentry/init", it automatically initializes Sentry as well
 *
 * @param req
 * @param tags
 * @param contexts
 * @see https://www.npmjs.com/package/@sentry/node
 */
export const configureReq = (req: NextApiRequest | IncomingMessage, tags?: { [key: string]: string }, contexts?: { [key: string]: any }): void => {
  let parsedBody: GenericObject = {};
  try {
    if (isNextApiRequest(req)) {
      parsedBody = convertRequestBodyToJSObject(req);
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    // console.error(e);
  } // Do nothing, as "body" is not necessarily supposed to contain valid stringified JSON

  Sentry.configureScope((scope) => {
    scope.setTag('host', req?.headers?.host);
    scope.setTag('url', req?.url);
    scope.setTag('method', req?.method);
    scope.setContext('headers', req?.headers);
    scope.setContext('parsedBody', parsedBody);

    if (isNextApiRequest(req)) {
      scope.setExtra('query', req?.query);
      scope.setExtra('body', req?.body);
      scope.setExtra('cookies', req?.cookies);
    }

    map(tags, (value: string, tag: string) => {
      scope.setTag(tag, value);
    });

    map(contexts, (value: { [key: string]: any; }, context: string) => {
      scope.setContext(context, value);
    });
  });
};
