import { CommonServerSideParams } from './CommonServerSideParams';

/**
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
 */
export type StaticPathsOutput<E extends {} = {}> = {
  fallback: boolean | 'blocking'; // See https://nextjs.org/docs/basic-features/data-fetching#the-fallback-key-required
  paths: (string | {
    params: CommonServerSideParams<E>;
  })[];
}
