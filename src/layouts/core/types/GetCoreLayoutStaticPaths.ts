import { CommonServerSideParams } from '@/app/types/CommonServerSideParams';
import { GetStaticPaths } from 'next';

/**
 * The getCoreLayoutStaticPaths is a function returning a getStaticPaths function.
 *
 * The reason behind this choice are flexibility and code re-usability.
 * It makes it possible to customize the behavior of the core "getStaticProps" function by providing options.
 */
export type GetCoreLayoutStaticPaths = (options?: GetCoreLayoutStaticPathsOptions) => GetStaticPaths<CommonServerSideParams>;

/**
 * Options allowed in GetCoreLayoutStaticPaths function.
 */
export type GetCoreLayoutStaticPathsOptions = {
  /**
   * Enables fallback mode.
   *
   * @default false
   *
   * @see https://nextjs.org/docs/basic-features/data-fetching#fallback-true
   * @see https://nextjs.org/docs/basic-features/data-fetching#the-fallback-key-required
   */
  fallback: boolean;
};
