import { IncomingMessage, ServerResponse } from 'http';
import { ParsedUrlQuery } from 'querystring';

/**
 * Context type used by "getServerSideProps"
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
 * @see node_modules/next/types/index.d.ts
 */
export type GetServerSidePropsContext<Params extends ParsedUrlQuery = ParsedUrlQuery, E extends {} = {}> = {
  req: IncomingMessage;
  res: ServerResponse;
  params?: Params;
  query: ParsedUrlQuery;
  preview?: boolean;
  previewData?: any;
} & E;
