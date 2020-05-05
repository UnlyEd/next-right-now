import { StaticParams } from './StaticParams';

/**
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
 */
export type StaticPathsOutput = {
  fallback: boolean; // See https://nextjs.org/docs/basic-features/data-fetching#the-fallback-key-required
  paths: {
    params: StaticParams;
  }[];
}
