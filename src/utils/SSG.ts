import { StaticParams } from '../types/StaticParams';
import { StaticProps } from '../types/StaticProps';

/**
 * Static props given as inputs for getStaticProps
 */
type StaticPropsInput = {
  params?: StaticParams;
  preview?: boolean;
  previewData?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

/**
 * Static props returned as outputs for getStaticProps (yielded result)
 */
type StaticPropsOutput = {
  props: StaticProps;
  unstable_revalidate?: number | boolean;
}

type StaticPathsOutput = {
  paths: {
    params: StaticParams;
  }[];
  fallback: boolean; // See https://nextjs.org/docs/basic-features/data-fetching#the-fallback-key-required
}

/**
 * Only executed on the server side at build time.
 * Computes all static props that should be available for all SSG pages
 *
 * Note that when a page uses "getStaticProps", then "_app:getInitialProps" is executed (if defined) but not actually used by the page,
 * only the results from getStaticProps are actually injected into the page (as "StaticProps").
 *
 * Meant to avoid code duplication
 * Can be overridden for per-page customisation (e.g: deepmerge)
 *
 * @param props
 * @return Props (as "StaticProps") that will be passed to the Page component, as props
 *
 * @see https://github.com/zeit/next.js/discussions/10949#discussioncomment-6884
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 */
export const getCommonStaticProps = (props: StaticPropsInput): StaticPropsOutput => {
  return {
    props: {
      lang: props?.params?.lang,
      isStaticRendering: true,
    },
    // unstable_revalidate: false,
  };
};

/**
 * Only executed on the server side at build time.
 * Computes all static paths that should be available for all SSG pages
 * Necessary when a page has dynamic routes and uses "getStaticProps", in order to build the HTML pages
 *
 * You can use "fallback" option to avoid building all page variants and allow runtime fallback
 *
 * Meant to avoid code duplication
 * Can be overridden for per-page customisation (e.g: deepmerge)
 *
 * @return
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
 */
export const getCommonStaticPaths = (): StaticPathsOutput => {
  return {
    paths: [{ params: { lang: 'fr' } }, { params: { lang: 'en' } }],
    fallback: false,
  };
};
