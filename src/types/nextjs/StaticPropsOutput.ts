import { UniversalSSGPageProps } from '../pageProps/UniversalSSGPageProps';

/**
 * Static props returned as outputs for getStaticProps (yielded result)
 */
export type StaticPropsOutput = {
  props: UniversalSSGPageProps;
  unstable_revalidate?: number | boolean;
}
