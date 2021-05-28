import { CommonServerSideParams } from '@/app/types/CommonServerSideParams';
import { GetCoreServerSidePropsResults } from '@/layouts/core/coreLayoutSSR';
import { GetServerSideProps } from 'next';

/**
 * The getCoreServerSideProps is a function returning a getServerSideProps function.
 *
 * The reason behind this choice are flexibility and code re-usability.
 * It makes it possible to customize the behavior of the core "getServerSideProps" function by providing options.
 */
export type GetCoreServerSideProps = (options?: GetCoreServerSidePropsOptions) => GetServerSideProps<GetCoreServerSidePropsResults, CommonServerSideParams>;

/**
 * Options allowed in GetCoreServerSideProps function.
 */
export type GetCoreServerSidePropsOptions = {
  /**
   * Whether allowing any redirection to a 404 page.
   *
   * @default true
   */
  enable404Redirect: boolean;
};
