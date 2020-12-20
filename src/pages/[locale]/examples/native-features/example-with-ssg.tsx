import { createLogger } from '@unly/utils-simple-logger';
import { ApolloQueryResult, QueryOptions } from 'apollo-client';
import deepmerge from 'deepmerge';
import map from 'lodash.map';
import size from 'lodash.size';
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsResult,
  NextPage,
} from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';
import {
  Alert,
  Container,
} from 'reactstrap';

import AllProducts from '../../../../components/data/AllProducts';
import NativeFeaturesSidebar from '../../../../components/doc/NativeFeaturesSidebar';
import I18nLink from '../../../../components/i18n/I18nLink';
import DefaultLayout from '../../../../components/pageLayouts/DefaultLayout';
import ExternalLink from '../../../../components/utils/ExternalLink';
import { EXAMPLE_WITH_SSG_QUERY } from '../../../../gql/pages/examples/native-features/example-with-ssg';
import withApollo from '../../../../hocs/withApollo';
import { Product } from '../../../../types/data/Product';
import { I18nLocale } from '../../../../types/i18n/I18nLocale';
import { CommonServerSideParams } from '../../../../types/nextjs/CommonServerSideParams';
import { StaticPropsInput } from '../../../../types/nextjs/StaticPropsInput';
import { OnlyBrowserPageProps } from '../../../../types/pageProps/OnlyBrowserPageProps';
import { SSGPageProps } from '../../../../types/pageProps/SSGPageProps';
import { createApolloClient } from '../../../../utils/gql/graphql';
import { SUPPORTED_LOCALES } from '../../../../utils/i18n/i18n';
import {
  getExamplesCommonStaticPaths,
  getExamplesCommonStaticProps,
} from '../../../../utils/nextjs/SSG';

const fileLabel = 'pages/[locale]/examples/native-features/example-with-ssg';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  label: fileLabel,
});

/**
 * Only executed on the server side at build time
 * Necessary when a page has dynamic routes and uses "getStaticProps"
 */
export const getStaticPaths: GetStaticPaths<CommonServerSideParams> = getExamplesCommonStaticPaths;

/**
 * Only executed on the server side at build time.
 *
 * @return Props (as "SSGPageProps") that will be passed to the Page component, as props
 *
 * @see https://github.com/vercel/next.js/discussions/10949#discussioncomment-6884
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 */
export const getStaticProps: GetStaticProps<SSGPageProps, CommonServerSideParams> = async (props: StaticPropsInput): Promise<GetStaticPropsResult<SSGPageProps>> => {
  const commonStaticProps: GetStaticPropsResult<SSGPageProps> = await getExamplesCommonStaticProps(props);

  if ('props' in commonStaticProps) {
    const { customerRef, gcmsLocales } = commonStaticProps.props;

    const apolloClient = createApolloClient();
    const variables = {
      customerRef,
    };
    const queryOptions: QueryOptions = {
      displayName: 'EXAMPLE_WITH_SSG_QUERY',
      query: EXAMPLE_WITH_SSG_QUERY,
      variables,
      context: {
        headers: {
          'gcms-locales': gcmsLocales,
        },
      },
      // XXX When you use the "documentInStages" special GraphCMS feature,
      //  you must disable the ApolloClient cache for it to function properly,
      //  otherwise ApolloClient internal caching messes up with the results returned by GraphCMS,
      //  because it gets 2 different records that have the same "id",
      //  and it doesn't understand those are 2 different records but treats them as one.
      //  If you don't disable the cache, then "documentInStages" will only contain DRAFT records and not PUBLISHED records,
      //  because ApolloClient will replace the PUBLISHED record by the draft record, by mistakenly thinking they're the same
      //  This is because ApolloClient doesn't known about the concept of "stage".
      //  I haven't reported this issue to the ApolloClient team,
      //  you'll need to look into it yourself if you want to benefit from both content from multiple stages and client-side caching
      fetchPolicy: 'no-cache',
    } as QueryOptions;

    const {
      data,
      errors,
      loading,
      networkStatus,
      stale,
    }: ApolloQueryResult<{
      products: Product[];
    }> = await apolloClient.query(queryOptions);

    if (errors) {
      console.error(errors);
      throw new Error('Errors were detected in GraphQL query.');
    }

    const {
      products,
    } = data || {}; // XXX Use empty object as fallback, to avoid app crash when destructuring, if no data is returned

    return deepmerge(commonStaticProps, {
      props: {
        products, // XXX What's the best way to store page-specific variables coming from props? with "customer" it was different because it's injected in all pages
      },
    });
  } else {
    return commonStaticProps;
  }
};

/**
 * SSG pages are first rendered by the server (during static bundling)
 * Then, they're rendered by the client, and gain additional props (defined in OnlyBrowserPageProps)
 * Because this last case is the most common (server bundle only happens during development stage), we consider it a default
 * To represent this behaviour, we use the native Partial TS keyword to make all OnlyBrowserPageProps optional
 *
 * Beware props in OnlyBrowserPageProps are not available on the server
 */
type Props = {
  products: Product[];
} & SSGPageProps<Partial<OnlyBrowserPageProps>>;

const ExampleWithSSGPage: NextPage<Props> = (props): JSX.Element => {
  const { products } = props;

  return (
    <DefaultLayout
      {...props}
      pageName={'examples'}
      headProps={{
        seoTitle: `${size(products)} products (SSG) - Next Right Now`,
      }}
      Sidebar={NativeFeaturesSidebar}
    >
      <Container
        className={'container-white'}
      >
        <h1>Example, using SSG</h1>

        <Alert color={'info'}>
          This page uses static site generation (SSG) because it uses <code>getStaticProps</code><br />
          (<i>it also uses <code>getStaticPaths</code>, because it's necessary for i18n support, to generate a different page, per available locale</i>).<br />
          <br />
          Therefore, this page has been statically generated {size(SUPPORTED_LOCALES)} times, for:{' '}
          {
            map(SUPPORTED_LOCALES, (locale: I18nLocale, i) => {
              return (
                <span key={i}>
                  <I18nLink href={'/examples/native-features/example-with-ssg'} locale={locale.name}>{locale.name}</I18nLink>
                  {
                    i + 1 !== size(SUPPORTED_LOCALES) && (
                      <> | </>
                    )
                  }
                </span>
              );
            })
          }
          <br />
          <br />
          <ExternalLink href={'https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation'}>Learn more about the technical details</ExternalLink><br />
          <br />
          Each page refresh (either static or CSR) fetches the static bundle and displays products below.<br />
          <br />
          If you use <ExternalLink href={'https://nrn-admin.now.sh/'}>NRN Admin</ExternalLink> and update the products there,{' '}
          then the products below will <b>NOT</b> be updated, because each page refresh will still fetch the static content, which was generated at build time.<br />
          Therefore, changes there won't be reflected here. (but they'll be reflected <I18nLink href={'/examples/native-features/example-with-ssr'}>on the SSR version though</I18nLink>)
          <br />
          <b>N.B</b>: During development, the static page is automatically rebuilt when refreshing, so the above behaviour is only valid in staging/production stages.
        </Alert>

        <hr />

        <AllProducts products={products} />
      </Container>
    </DefaultLayout>
  );
};

export default withApollo()(ExampleWithSSGPage);
