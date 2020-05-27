/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { createLogger } from '@unly/utils-simple-logger';
import { ApolloQueryResult } from 'apollo-client';
import deepmerge from 'deepmerge';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';
import { Container } from 'reactstrap';
import DefaultLayout from '../../components/pageLayouts/DefaultLayout';
import { TERMS_PAGE_QUERY } from '../../gql/pages/terms';
import withApollo from '../../hocs/withApollo';
import customerContext, { CustomerContext } from '../../stores/customerContext';
import { Customer } from '../../types/data/Customer';
import { StaticParams } from '../../types/nextjs/StaticParams';

import { StaticPropsInput } from '../../types/nextjs/StaticPropsInput';
import { StaticPropsOutput } from '../../types/nextjs/StaticPropsOutput';
import { OnlyBrowserPageProps } from '../../types/pageProps/OnlyBrowserPageProps';
import { SSGPageProps } from '../../types/pageProps/SSGPageProps';
import { createApolloClient } from '../../utils/gql/graphql';
import { replaceAllOccurrences } from '../../utils/js/string';
import { getCommonStaticPaths, getCommonStaticProps } from '../../utils/nextjs/SSG';

const fileLabel = 'pages/[locale]/terms';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  label: fileLabel,
});

/**
 * Only executed on the server side at build time.
 *
 * @return Props (as "SSGPageProps") that will be passed to the Page component, as props
 *
 * @see https://github.com/zeit/next.js/discussions/10949#discussioncomment-6884
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 */
export const getStaticProps: GetStaticProps<SSGPageProps, StaticParams> = async (props: StaticPropsInput): Promise<StaticPropsOutput> => {
  const commonStaticProps: StaticPropsOutput = await getCommonStaticProps(props);
  const { customerRef, gcmsLocales } = commonStaticProps.props;

  const apolloClient = createApolloClient();
  const variables = {
    customerRef,
  };
  const queryOptions = {
    displayName: 'TERMS_PAGE_QUERY',
    query: TERMS_PAGE_QUERY,
    variables,
    context: {
      headers: {
        'gcms-locale': gcmsLocales,
      },
    },
  };

  const {
    data,
    errors,
    loading,
    networkStatus,
    stale,
  }: ApolloQueryResult<{
    customer: Customer;
  }> = await apolloClient.query(queryOptions);

  if (errors) {
    console.error(errors);
    throw new Error('Errors were detected in GraphQL query.');
  }

  const {
    customer,
  } = data || {}; // XXX Use empty object as fallback, to avoid app crash when destructuring, if no data is returned

  return deepmerge(commonStaticProps, {
    props: {
      customer,
    },
  });
};

/**
 * Only executed on the server side at build time
 * Necessary when a page has dynamic routes and uses "getStaticProps"
 */
export const getStaticPaths: GetStaticPaths<StaticParams> = getCommonStaticPaths;

/**
 * SSG pages are first rendered by the server (during static bundling)
 * Then, they're rendered by the client, and gain additional props (defined in OnlyBrowserPageProps)
 * Because this last case is the most common (server bundle only happens during development stage), we consider it a default
 * To represent this behaviour, we use the native Partial TS keyword to make all OnlyBrowserPageProps optional
 *
 * Beware props in OnlyBrowserPageProps are not available on the server
 */
type Props = {} & SSGPageProps<Partial<OnlyBrowserPageProps>>;

const TermsPage: NextPage<Props> = (props): JSX.Element => {
  const customer: CustomerContext = React.useContext(customerContext);
  const { theme: { primaryColor } } = customer;

  return (
    <DefaultLayout
      {...props}
      pageName={'terms'}
      headProps={{
        title: 'Terms - Next Right Now',
      }}
    >
      <Container>
        <div
          css={css`
            justify-content: center;
            text-align: center;
            margin-left: auto;
            margin-right: auto;

            .source {
              margin: auto;
              width: 50%;
            }
          `}
        >
          <div
            css={css`
              margin: 50px 150px 150px;
              h1 {
               color: ${primaryColor};
               font-size: 35px;
              }
              h2 {
               font-size: 20px;
               margin-top: 35px;
              }
              h3 {
               font-size: 17px;
              }
              h4 {
               font-size: 13px;
               font-weight: 300;
              }
              h5 {
               font-size: 13px;
               font-weight: 100;
              }
              h6 {
               font-size: 10px;
              }
            `}
            dangerouslySetInnerHTML={{
              __html: replaceAllOccurrences(customer?.terms?.html || '', {
                customerLabel: `<b>${customer?.label}</b>`,
              }),
            }}
          />

          <hr />

          <div className={'source'}>
            <h2>HTML source code (fetched from GraphQL API), as <code>RichText</code> field:</h2>
            <pre>
              <code>
                {customer?.terms?.html}
              </code>
            </pre>
          </div>
        </div>
      </Container>
    </DefaultLayout>
  );
};

export default withApollo()(TermsPage);
