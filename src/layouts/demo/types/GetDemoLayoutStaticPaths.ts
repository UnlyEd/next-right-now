import { CommonServerSideParams } from '@/app/types/CommonServerSideParams';
import { GetCoreLayoutStaticPathsOptions } from '@/layouts/core/types/GetCoreLayoutStaticPaths';
import { GetStaticPaths } from 'next';

/**
 * The getDemoLayoutStaticPaths is a function returning a getStaticPaths function.
 *
 * The reason behind this choice are flexibility and code re-usability.
 * It makes it possible to customize the behavior of the core "getStaticProps" function by providing options.
 */
export type GetDemoLayoutStaticPaths = (options?: GetDemoLayoutStaticPathsOptions) => GetStaticPaths<CommonServerSideParams>;

/**
 * Options allowed in GetDemoLayoutStaticPaths function.
 */
export type GetDemoLayoutStaticPathsOptions = GetCoreLayoutStaticPathsOptions;
