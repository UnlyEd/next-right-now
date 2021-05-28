import { CommonServerSideParams } from '@/app/types/CommonServerSideParams';
import { GetCoreServerSidePropsOptions } from '@/layouts/core/types/GetCoreLayoutServerSideProps';
import { GetDemoLayoutServerSidePropsResults } from '@/layouts/demo/demoLayoutSSR';
import { GetServerSideProps } from 'next';

/**
 * The getDemoLayoutServerSideProps is a function returning a getServerSideProps function.
 *
 * The reason behind this choice are flexibility and code re-usability.
 * It makes it possible to customize the behavior of the core "getServerSideProps" function by providing options.
 */
export type GetDemoLayoutServerSideProps = (options?: GetDemoLayoutServerSidePropsOptions) => GetServerSideProps<GetDemoLayoutServerSidePropsResults, CommonServerSideParams>;

/**
 * Options allowed in GetDemoLayoutServerSideProps function.
 */
export type GetDemoLayoutServerSidePropsOptions = GetCoreServerSidePropsOptions;
