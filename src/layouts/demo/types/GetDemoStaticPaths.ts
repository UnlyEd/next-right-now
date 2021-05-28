import { CommonServerSideParams } from '@/app/types/CommonServerSideParams';
import { GetCoreStaticPathsOptions } from '@/layouts/core/types/GetCoreStaticPaths';
import { GetStaticPaths } from 'next';

/**
 * The getDemoStaticPaths is a function returning a getStaticPaths function.
 *
 * The reason behind this choice are flexibility and code re-usability.
 * It makes it possible to customize the behavior of the core "getStaticProps" function by providing options.
 */
export type GetDemoStaticPaths = (options?: GetDemoStaticPathsOptions) => GetStaticPaths<CommonServerSideParams>;

/**
 * Options allowed in GetDemoStaticPaths function.
 */
export type GetDemoStaticPathsOptions = GetCoreStaticPathsOptions;
