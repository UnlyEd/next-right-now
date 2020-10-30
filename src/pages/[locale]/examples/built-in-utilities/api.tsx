import { css } from '@emotion/core';
import { createLogger } from '@unly/utils-simple-logger';
import {
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';

import BuiltInUtilitiesSidebar from '../../../../components/doc/BuiltInUtilitiesSidebar';
import DocPage from '../../../../components/doc/DocPage';
import DefaultLayout from '../../../../components/pageLayouts/DefaultLayout';
import ExternalLink from '../../../../components/utils/ExternalLink';
import { CommonServerSideParams } from '../../../../types/nextjs/CommonServerSideParams';
import { OnlyBrowserPageProps } from '../../../../types/pageProps/OnlyBrowserPageProps';
import { SSGPageProps } from '../../../../types/pageProps/SSGPageProps';
import {
  getExamplesCommonStaticPaths,
  getExamplesCommonStaticProps,
} from '../../../../utils/nextjs/SSG';

const fileLabel = 'pages/[locale]/examples/built-in-utilities/api';
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

const ApiPage: NextPage<Props> = (props): JSX.Element => {
  return (
    <DefaultLayout
      {...props}
      pageName={'api'}
      headProps={{
        title: 'Api examples - Next Right Now',
      }}
      Sidebar={BuiltInUtilitiesSidebar}
    >
      <DocPage>
        <h1 className={'pcolor'}>Api examples</h1>

        <div>
          A few API endpoints are provided as utilities:<br />
          <ul
            css={css`
              text-align: left;
            `}
          >
            <li>
              <ExternalLink href={'/api/status'}><code>/api/status</code></ExternalLink>: Meant to help you debug your app and check non-sensitive environment variables on staging/production stages.<br />
              It contains a few metadata that should help you manage your app (build time, stage, region, release, etc.)
            </li>
            <li>
              <ExternalLink href={'/api/error'}><code>/api/error</code></ExternalLink>: Meant to help you test your server-side Sentry integration, will throw errors on purpose so you can check whether they're reporting into Sentry.
            </li>
            <li>
              <ExternalLink href={'/api/autoRedirectToLocalisedPage'}><code>/api/autoRedirectToLocalisedPage</code></ExternalLink>: Meant to detect the browser preferred locale (based on HTTP headers) and redirect to the localised version of the page.<br />
              It is used in Next.js experimental rewrites in <code>next.config.js</code> to automatically redirect to this endpoint all requests that don't have a locale defined in the url.<br />
              For instance, going to <ExternalLink href={'/terms'}>/terms</ExternalLink> should redirect to the <code>fr</code> or <code>en</code> page, depending on your browser language preferences.
            </li>
          </ul>
        </div>
      </DocPage>
    </DefaultLayout>
  );
};

export default (ApiPage);
