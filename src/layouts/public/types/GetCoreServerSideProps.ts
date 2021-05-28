import { CommonServerSideParams } from '@/app/types/CommonServerSideParams';
import { GetPublicServerSidePropsResults } from '@/layouts/public/publicLayoutSSR';
import { GetServerSideProps } from 'next';

/**
 * The getPublicServerSideProps is a function returning a getServerSideProps function.
 *
 * The reason behind this choice are flexibility and code re-usability.
 * It makes it possible to customize the behavior of the core "getServerSideProps" function by providing options.
 */
export type GetPublicServerSideProps = (options?: GetPublicServerSidePropsOptions) => GetServerSideProps<GetPublicServerSidePropsResults, CommonServerSideParams>;

/**
 * Options allowed in GetPublicServerSideProps function.
 */
export type GetPublicServerSidePropsOptions = {
  /**
   * Whether allowing any redirection to a 404 page.
   *
   * @default true
   */
  enable404Redirect: boolean;
};
