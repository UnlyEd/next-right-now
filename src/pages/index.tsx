/** @jsx jsx */
import { Amplitude, LogOnMount } from '@amplitude/react-amplitude';
import { QueryResult } from '@apollo/react-common';
import { useQuery } from '@apollo/react-hooks';
import { css, jsx } from '@emotion/core';
import * as Sentry from '@sentry/node';
import { isBrowser } from '@unly/utils';
import { createLogger } from '@unly/utils-simple-logger';
import { useTheme } from 'emotion-theming';
import map from 'lodash.map';
import { NextPage } from 'next';
import Link from 'next/link';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';
import { useTranslation, UseTranslationResponse } from 'react-i18next';
import { Alert, Container } from 'reactstrap';

import ErrorDebug from '../components/ErrorDebug';
import GraphCMSAsset from '../components/GraphCMSAsset';
import Head from '../components/Head';
import Loader from '../components/Loader';
import { INDEX_PAGE_QUERY } from '../gql/pages';
import { Asset } from '../types/data/Asset';
import { Customer } from '../types/data/Customer';
import { Product } from '../types/data/Product';
import { Theme } from '../types/data/Theme';
import { PageProps } from '../types/PageProps';

const fileLabel = 'pages/index';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  label: fileLabel,
});

const Home: NextPage<PageProps> = (props: PageProps): JSX.Element => {
  const {
    customerRef,
    gcmsLocales,
  }: PageProps = props;
  const { t }: UseTranslationResponse = useTranslation();
  const theme: Theme = useTheme();
  const { primaryColor } = theme;

  Sentry.addBreadcrumb({ // See https://docs.sentry.io/enriching-error-data/breadcrumbs
    category: fileLabel,
    message: `Rendering index page (${isBrowser() ? 'browser' : 'server'})`,
    level: Sentry.Severity.Debug,
  });

  const variables = {
    customerRef,
  };
  const queryOptions = {
    displayName: 'INDEX_PAGE_QUERY',
    variables,
    context: {
      headers: {
        'gcms-locale': gcmsLocales,
      },
    },
  };
  const {
    data,
    loading,
    error,
  }: QueryResult<{
    customer: Customer;
    products: Product[];
  }> = useQuery(INDEX_PAGE_QUERY, queryOptions);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorDebug error={new Error(JSON.stringify(error, null, 2))} context={{ variables, queryOptions }} />;
  }

  const {
    customer,
    products,
  } = data || {}; // XXX Use empty object as fallback, to avoid app crash when destructuring
  if (process.env.APP_STAGE !== 'production') {
    console.log('data', data); // eslint-disable-line no-console
  }

  return (
    <Amplitude
      eventProperties={(inheritedProps): object => ({
        ...inheritedProps,
        page: {
          ...inheritedProps.page,
          name: 'index',
        },
      })}
    >
      {({ logEvent }): JSX.Element => (
        <>
          <LogOnMount eventType="page-displayed" />
          <Head />
          <div
            css={css`
              justify-content: center;
              text-align: center;
              margin-left: auto;
              margin-right: auto;

              .product-container {
                background-color: white;
                border-radius: 10px;
                padding: 30px;
                margin: 30px;

                h2 {
                  margin-top: 5px;
                  margin-bottom: 20px;
                }
              }
            `}
          >
            <Alert color={'info'}>
              <div>
                This demo features quite a few things, despite it being very simple.<br />
                <br />
                Products are fetched from our GraphCMS API, using GraphQL and Apollo.<br />
                We don't do anything fancy with them, it's just a simple example of data fetching and displaying.<br />
                Note that the GraphQL API can be auto-completed on the IDE, that's quite useful. We also split our <code>.gql</code> files into reusable fragments to avoid duplicating code.<br />
                <br />
                We use a custom component <code>GraphCMSAsset</code> to display images.<br />
                <br />
                You can navigate between <Link href={'/examples'}>/examples</Link> and <Link href={'/'}>/</Link> to see CSR in action.<br />
                You can also disable JS on your browser to see how SSR works.<br />
                <br />
                You can also use
                <a
                  href={'https://chrome.google.com/webstore/detail/amplitude-instrumentation/acehfjhnmhbmgkedjmjlobpgdicnhkbp'}
                  target={'_blank'}
                  rel={'noopener'}
                > Amplitude Instrumentation Explorer extension
                </a> to see what analytic events are sent.
                <br />
                You can also change the language by clicking on the footer flag icon below. <br />
                Changing language refresh the whole page, because it was just simpler to do that instead of running the GraphQL query again. But you could implement it without refreshing the whole page if you wanted.
                <br />
                <br />
                Feel free to ask for more examples of what this demo can offer by creating an issue on Github! :)<br />
                Feel free to make an improvement to this demo as well, though a PR. (if it's big, please let's discuss it first!)
              </div>
            </Alert>
            <h1>{customer?.label} products</h1>

            <Container>
              {
                map(products, (product: Product) => {
                  return (
                    <div
                      key={product?.id}
                      className={'product-container'}
                    >
                      {
                        map(product.images, (image: Asset) => {
                          return (
                            <GraphCMSAsset
                              key={image?.id}
                              id={image?.id}
                              asset={image}
                              transformationsOverride={{
                                width: 75,
                                height: 100,
                              }}
                            />
                          );
                        })
                      }

                      <h2>
                        {product?.title} - ${product?.price || 0}
                      </h2>

                      <div>
                        {product?.description}
                      </div>
                    </div>
                  );
                })
              }
            </Container>
          </div>
        </>
      )}
    </Amplitude>
  );

};

export default Home;
