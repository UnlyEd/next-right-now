import { SSGPageProps } from '../pageProps/SSGPageProps';

/**
 * Static props returned as outputs for getStaticProps (yielded result)
 */
export type StaticPropsOutput = {
  props: SSGPageProps;
  unstable_revalidate?: number | boolean;
}
