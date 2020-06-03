/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { createLogger } from '@unly/utils-simple-logger';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';
import { Container } from 'reactstrap';
import DefaultLayout from '../../components/pageLayouts/DefaultLayout';
import customerContext, { CustomerContext } from '../../stores/customerContext';
import { CommonServerSideParams } from '../../types/nextjs/CommonServerSideParams';
import { OnlyBrowserPageProps } from '../../types/pageProps/OnlyBrowserPageProps';
import { SSGPageProps } from '../../types/pageProps/SSGPageProps';
import { replaceAllOccurrences } from '../../utils/js/string';
import { getExamplesCommonStaticPaths, getExamplesCommonStaticProps } from '../../utils/nextjs/SSG';

const fileLabel = 'pages/[locale]/terms';
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
export const getStaticProps: GetStaticProps<SSGPageProps, CommonServerSideParams> = getExamplesCommonStaticProps;

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
            <h2>HTML source code (fetched from Airtable API), as <code>RichText</code> field:</h2>
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

export default (TermsPage);
