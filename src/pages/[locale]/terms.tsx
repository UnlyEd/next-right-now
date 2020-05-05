/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import * as Sentry from '@sentry/node';
import { createLogger } from '@unly/utils-simple-logger';
import { ApolloQueryResult } from 'apollo-client';
import deepmerge from 'deepmerge';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';
import { Container } from 'reactstrap';
import PageLayout from '../../components/PageLayout';
import { TERMS_PAGE_QUERY } from '../../gql/pages/terms';
import { Customer } from '../../types/data/Customer';
import { PageLayoutProps } from '../../types/PageLayoutProps';
import { StaticParams } from '../../types/StaticParams';
import { StaticProps } from '../../types/StaticProps';
import { getStandaloneApolloClient } from '../../utils/graphql';
import { getCommonStaticPaths, getCommonStaticProps, StaticPropsInput, StaticPropsOutput } from '../../utils/SSG';
import { replaceAllOccurrences } from '../../utils/string';

const fileLabel = 'pages/terms';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  label: fileLabel,
});

/**
 * Only executed on the server side at build time.
 *
 * Note that when a page uses "getStaticProps", then "_app:getInitialProps" is executed (if defined) but not actually used by the page,
 * only the results from getStaticProps are actually injected into the page (as "StaticProps").
 *
 * @return Props (as "StaticProps") that will be passed to the Page component, as props
 *
 * @see https://github.com/zeit/next.js/discussions/10949#discussioncomment-6884
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 */
export const getStaticProps: GetStaticProps<StaticProps, StaticParams> = async (props: StaticPropsInput): Promise<StaticPropsOutput> => {
  const commonStaticProps = await getCommonStaticProps(props);
  const { customerRef, gcmsLocales } = commonStaticProps.props;

  const apolloClient = getStandaloneApolloClient();
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

type Props = {} & StaticProps;

const TermsPage: NextPage<Props> = (props): JSX.Element => {
  Sentry.addBreadcrumb({ // See https://docs.sentry.io/enriching-error-data/breadcrumbs
    category: fileLabel,
    message: `Rendering ${fileLabel}`,
    level: Sentry.Severity.Debug,
  });

  return (
    <PageLayout
      pageName={'terms'}
      headProps={{
        title: 'Terms - Next Right Now',
      }}
      {...props}
    >
      {
        (pageLayoutProps: PageLayoutProps): JSX.Element => {
          const { customer, theme: { primaryColor } } = pageLayoutProps;

          return (
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
          );
        }
      }
    </PageLayout>
  );
};

export default TermsPage;
