/** @jsx jsx */
import { Amplitude, LogOnMount } from '@amplitude/react-amplitude';
import { QueryResult } from '@apollo/react-common';
import { useQuery } from '@apollo/react-hooks';
import { css, jsx } from '@emotion/core';
import * as Sentry from '@sentry/node';
import { isBrowser } from '@unly/utils';
import { createLogger } from '@unly/utils-simple-logger';
import { useTheme } from 'emotion-theming';
import { NextPage } from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';
import { useTranslation, UseTranslationResponse } from 'react-i18next';

import ErrorDebug from '../components/ErrorDebug';
import Head from '../components/Head';
import Loader from '../components/Loader';
import { TERMS_PAGE_QUERY } from '../gql/pages/terms';
import { Customer } from '../types/data/Customer';
import { Theme } from '../types/data/Theme';
import { PageProps } from '../types/PageProps';
import { replaceAllOccurrences } from '../utils/string';

const fileLabel = 'pages/terms';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  label: fileLabel,
});

const Terms: NextPage<PageProps> = (props: PageProps): JSX.Element => {
  const {
    customerRef,
    gcmsLocales,
  }: PageProps = props;
  const { t }: UseTranslationResponse = useTranslation();
  const theme: Theme = useTheme();
  const { primaryColor } = theme;

  Sentry.addBreadcrumb({ // See https://docs.sentry.io/enriching-error-data/breadcrumbs
    category: fileLabel,
    message: `Rendering terms page (${isBrowser() ? 'browser' : 'server'})`,
    level: Sentry.Severity.Debug,
  });

  const variables = {
    customerRef,
  };
  const queryOptions = {
    displayName: 'TERMS_PAGE_QUERY',
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
  }> = useQuery(TERMS_PAGE_QUERY, queryOptions);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorDebug error={new Error(JSON.stringify(error, null, 2))} context={{ variables, queryOptions }} />;
  }

  const {
    customer,
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
          name: 'terms',
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
                __html: replaceAllOccurrences(customer?.terms?.html, {
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

        </>
      )}
    </Amplitude>
  );

};

export default Terms;
