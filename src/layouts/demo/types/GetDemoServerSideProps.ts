import { CommonServerSideParams } from '@/app/types/CommonServerSideParams';
import { GetCoreServerSidePropsOptions } from '@/layouts/core/types/GetCoreServerSideProps';
import { GetDemoServerSidePropsResults } from '@/layouts/demo/demoLayoutSSR';
import { GetServerSideProps } from 'next';

/**
 * The getDemoServerSideProps is a function returning a getServerSideProps function.
 *
 * The reason behind this choice are flexibility and code re-usability.
 * It makes it possible to customize the behavior of the core "getServerSideProps" function by providing options.
 */
export type GetDemoServerSideProps = (options?: GetDemoServerSidePropsOptions) => GetServerSideProps<GetDemoServerSidePropsResults, CommonServerSideParams>;

/**
 * Options allowed in GetDemoServerSideProps function.
 */
export type GetDemoServerSidePropsOptions = GetCoreServerSidePropsOptions;
