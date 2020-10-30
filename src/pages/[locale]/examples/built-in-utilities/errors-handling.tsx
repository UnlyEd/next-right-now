import { createLogger } from '@unly/utils-simple-logger';
import {
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';
import { Alert } from 'reactstrap';

import BuiltInUtilitiesSidebar from '../../../../components/doc/BuiltInUtilitiesSidebar';
import DocPage from '../../../../components/doc/DocPage';
import I18nLink from '../../../../components/i18n/I18nLink';
import DefaultLayout from '../../../../components/pageLayouts/DefaultLayout';
import Code from '../../../../components/utils/Code';
import ExternalLink from '../../../../components/utils/ExternalLink';
import { CommonServerSideParams } from '../../../../types/nextjs/CommonServerSideParams';
import { OnlyBrowserPageProps } from '../../../../types/pageProps/OnlyBrowserPageProps';
import { SSGPageProps } from '../../../../types/pageProps/SSGPageProps';
import {
  getExamplesCommonStaticPaths,
  getExamplesCommonStaticProps,
} from '../../../../utils/nextjs/SSG';

const fileLabel = 'pages/[locale]/examples/built-in-utilities/errors-handling';
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

const ErrorsHandlingPage: NextPage<Props> = (props): JSX.Element => {
  return (
    <DefaultLayout
      {...props}
      pageName={'errors-handling'}
      headProps={{
        title: 'Errors handling examples - Next Right Now',
      }}
      Sidebar={BuiltInUtilitiesSidebar}
    >
      <DocPage>
        <h1 className={'pcolor'}>Errors handling examples</h1>

        <Alert color={'info'}>
          It's interesting to know how your app will behave when unexpected things happen.<br />
          That's the point of the below examples, they're meant to showcase how the apps behaves in such situations.<br />
          <br />
          Note that it's also interesting to experiment those behaviours in different environments, because they will differ.
        </Alert>

        <hr />

        <h2>404 - Using CSR</h2>

        <Alert color={'info'}>
          This page doesn't exist and should display a 404 page.
        </Alert>

        <Alert color={'danger'}>
          Clicking on the link doesn't do anything, I don't know if it's meant to be a feature, but
          <ExternalLink href={'https://github.com/vercel/next.js/issues/13516'} suffix={null}>this is probably a bug</ExternalLink>.
        </Alert>

        <p>
          <I18nLink href={'/404-csr'}>This is a client-side navigation (CSR)</I18nLink>
        </p>

        <Code
          text={`
            <I18nLink href={'/404-csr'}>This is a client-side navigation (CSR)</I18nLink>
          `}
        />
        <br />

        <h2>404 - Using full page reload</h2>

        <Alert color={'info'}>
          This page doesn't exist and should display a 404 page.
        </Alert>

        <p>
          <i>This is not CSR, it's not necessarily SSR either, it can be either static rendering or SSR.</i><br />
          <a href={'/404-static'}>This is a normal navigation</a>
        </p>

        <Code
          text={`
            <a href={'/404-static'}>This is a normal navigation</a>
          `}
        />
        <br />

        <hr />

        <h2>500 - Top-level error</h2>

        <Alert color={'info'}>
          This page throws an error right from the Page component and should display a 500 page error without anything else (no footer/header).
        </Alert>

        <Code
          text={`
            const TopLevel500ErrorPage: NextPage<Props> = (props): JSX.Element => {
              if (isBrowser()) {
                // Only throw on browser, otherwise it fails when building the app on Vercel and deployment fails altogether
                throw new Error('Top level 500 error example');
              }

              return (
                <DefaultLayout
                  {...props}
                  pageName={'page-500-error'}
                  headProps={{
                    title: 'Top-level 500 error example - Next Right Now',
                  }}
                  Sidebar={BuiltInUtilitiesSidebar}
                >
                  Top-level 500 error example
                </DefaultLayout>
              );
            };
          `}
        />
        <br />

        <p>
          <I18nLink href={'/examples/built-in-utilities/top-level-500-error'}>This is a client-side navigation (CSR)</I18nLink><br />
          <a href={'/examples/built-in-utilities/top-level-500-error'}>This is a normal navigation</a>
        </p>
        <br />

        <hr />

        <h2>500 - Interactive error</h2>

        <I18nLink href={'/examples/built-in-utilities/interactive-error'}>Go to interactive error page</I18nLink><br />

        <br />

      </DocPage>
    </DefaultLayout>
  );
};

export default (ErrorsHandlingPage);
