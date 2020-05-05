import { StaticProps } from './StaticProps';

/**
 * Static props returned as outputs for getStaticProps (yielded result)
 */
export type StaticPropsOutput = {
  props: StaticProps;
  unstable_revalidate?: number | boolean;
}
