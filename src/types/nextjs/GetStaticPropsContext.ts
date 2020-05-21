import { ParsedUrlQuery } from 'querystring';

/**
 * Context type used by "getStaticProps"
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 * @see node_modules/next/types/index.d.ts
 */
export declare type GetStaticPropsContext<
  Q extends ParsedUrlQuery = ParsedUrlQuery
> = {
  params?: Q;
  preview?: boolean;
  previewData?: any;
};
