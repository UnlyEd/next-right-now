import { convertRequestBodyToJSObject } from '@/modules/core/api/convertRequestBodyToJSObject';
import { GenericObject } from '@/modules/core/data/types/GenericObject';
import * as Sentry from '@sentry/node';
import map from 'lodash.map';
import { NextApiRequest } from 'next';

/**
 * Configure the Sentry scope by extracting useful tags and context from the given request.
 *
 * @param req
 * @param tags
 * @param contexts
 * @see https://www.npmjs.com/package/@sentry/node
 */
export const configureReq = (req: NextApiRequest, tags?: { [key: string]: string }, contexts?: { [key: string]: any }): void => {
  let parsedBody: GenericObject = {};
  try {
    parsedBody = convertRequestBodyToJSObject(req);
  } catch (e) {
    // eslint-disable-next-line no-console
    // console.error(e);
  } // Do nothing, as "body" is not necessarily supposed to contain valid stringified JSON

  Sentry.configureScope((scope) => {
    scope.setTag('host', req?.headers?.host);
    scope.setTag('url', req?.url);
    scope.setTag('method', req?.method);
    scope.setExtra('query', req?.query);
    scope.setExtra('body', req?.body);
    scope.setExtra('cookies', req?.cookies);
    scope.setContext('headers', req?.headers);
    scope.setContext('parsedBody', parsedBody);

    map(tags, (value: string, tag: string) => {
      scope.setTag(tag, value);
    });

    map(contexts, (value: { [key: string]: any; }, context: string) => {
      scope.setContext(context, value);
    });
  });
};
