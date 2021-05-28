import { CommonServerSideParams } from '@/app/types/CommonServerSideParams';
import { GetPublicLayoutServerSidePropsResults } from '@/layouts/public/publicLayoutSSR';
import { GetServerSideProps } from 'next';

/**
 * The getPublicLayoutServerSideProps is a function returning a getServerSideProps function.
 *
 * The reason behind this choice are flexibility and code re-usability.
 * It makes it possible to customize the behavior of the core "getServerSideProps" function by providing options.
 */
export type GetPublicLayoutServerSideProps = (options?: GetPublicLayoutServerSidePropsOptions) => GetServerSideProps<GetPublicLayoutServerSidePropsResults, CommonServerSideParams>;

/**
 * Options allowed in GetPublicLayoutServerSideProps function.
 */
export type GetPublicLayoutServerSidePropsOptions = {
  /**
   * Whether allowing any redirection to a 404 page.
   *
   * @default true
   */
  enable404Redirect: boolean;
};
