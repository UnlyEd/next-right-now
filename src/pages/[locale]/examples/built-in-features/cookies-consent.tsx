/** @jsx jsx */
import { Amplitude } from '@amplitude/react-amplitude';
import { jsx } from '@emotion/core';
import { createLogger } from '@unly/utils-simple-logger';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';
import { Alert } from 'reactstrap';
import BuiltInFeaturesSidebar from '../../../../components/doc/BuiltInFeaturesSidebar';
import DocPage from '../../../../components/doc/DocPage';
import DefaultLayout from '../../../../components/pageLayouts/DefaultLayout';
import ExternalLink from '../../../../components/utils/ExternalLink';
import useUserConsent from '../../../../hooks/useUserConsent';
import { CommonServerSideParams } from '../../../../types/nextjs/CommonServerSideParams';
import { OnlyBrowserPageProps } from '../../../../types/pageProps/OnlyBrowserPageProps';
import { SSGPageProps } from '../../../../types/pageProps/SSGPageProps';
import { getExamplesCommonStaticPaths, getExamplesCommonStaticProps } from '../../../../utils/nextjs/SSG';

const fileLabel = 'pages/[locale]/examples/built-in-features/cookies-consent';
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

const ExampleCookiesConsentPage: NextPage<Props> = (props): JSX.Element => {
  const { isUserOptedOutOfAnalytics, hasUserGivenAnyCookieConsent } = useUserConsent();

  return (
    <DefaultLayout
      {...props}
      pageName={'cookies-consent'}
      headProps={{
        title: 'Cookies consent examples - Next Right Now',
      }}
      Sidebar={BuiltInFeaturesSidebar}
    >
      <Amplitude>
        {({ logEvent }): JSX.Element => (
          <DocPage>
            <h1 className={'pcolor'}>Cookies consent examples, using <code>CookieConsent</code> OSS library</h1>

            <Alert color={'info'}>
              Make sure to check
              <ExternalLink
                href={'https://github.com/osano/cookieconsent'}
              >
                <code>CookieConsent</code>
              </ExternalLink>
              OSS library.<br />
              User consent regarding cookies has become a must-have for many businesses, and it very, very complicated.<br />
              The laws depends on the end-user's country, which means you need to use a geo-location system to know which laws apply.<br />
              <br />
              This implementation is based on open source and free software, and is configured to properly handle consent for simple applications.<br />
              It's not meant to be used as-it for any business that process personal or identifiable information.<br />
              NRN doesn't process any personal/identifiable information, and it makes the job much simpler.<br />
              <br />
              Also, you can (more or less easily) switch from the current implementation to <ExternalLink href={'https://www.osano.com/cookieconsent'}>Osano vendor</ExternalLink>, if you wish or need to.<br />
              The OSS and Business versions seem to share part of their API (unsure about that), but they're two different pieces of software.
            </Alert>

            Amplitude has been configured to stop tracking all kind of analytics as soon as the user opts-out from analytics tracking.<br />
            Also, the current behaviour has been configured to automatically opt-in into all analytics tracking by default.<br />
            We've made this choice because no personal data are being processed in any way, and thus it should be safe for most apps that don't process personal data to have such default behaviour. (it's safe to be used as-it in France (CNIL + GDPR), which is tough to deal with, so most countries should be safe)
            <br />
            Consent isn't stored though, since we consider analytics is allowed by default, we didn't want to complicate the app with that. Also, we don't have any personal information to link to such consents, so it really wouldn't make any sense in our case.
          </DocPage>
        )}
      </Amplitude>
    </DefaultLayout>
  );
};

export default (ExampleCookiesConsentPage);
