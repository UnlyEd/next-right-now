import { IncomingMessage, ServerResponse } from 'http';
import { ParsedUrlQuery } from 'querystring';

/**
 * Context type used by "getServerSideProps"
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
 * @see node_modules/next/types/index.d.ts
 */
export declare type GetServerSidePropsContext<E extends {} = {}, Q extends ParsedUrlQuery = ParsedUrlQuery> = {
  req: IncomingMessage;
  res: ServerResponse;
  params?: Q;
  query: ParsedUrlQuery;
  preview?: boolean;
  previewData?: any;
} & E;
