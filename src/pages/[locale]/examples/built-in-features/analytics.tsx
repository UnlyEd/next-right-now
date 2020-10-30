import { Amplitude } from '@amplitude/react-amplitude';
import { createLogger } from '@unly/utils-simple-logger';
import {
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';
import {
  Alert,
  Button,
} from 'reactstrap';

import BuiltInFeaturesSidebar from '../../../../components/doc/BuiltInFeaturesSidebar';
import DocPage from '../../../../components/doc/DocPage';
import DefaultLayout from '../../../../components/pageLayouts/DefaultLayout';
import DisplayOnBrowserMount from '../../../../components/rehydration/DisplayOnBrowserMount';
import Code from '../../../../components/utils/Code';
import ExternalLink from '../../../../components/utils/ExternalLink';
import useUserConsent from '../../../../hooks/useUserConsent';
import { LogEvent } from '../../../../types/Amplitude';
import { CommonServerSideParams } from '../../../../types/nextjs/CommonServerSideParams';
import { OnlyBrowserPageProps } from '../../../../types/pageProps/OnlyBrowserPageProps';
import { SSGPageProps } from '../../../../types/pageProps/SSGPageProps';
import {
  getExamplesCommonStaticPaths,
  getExamplesCommonStaticProps,
} from '../../../../utils/nextjs/SSG';

const fileLabel = 'pages/[locale]/examples/built-in-features/analytics';
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

const ExampleAnalyticsPage: NextPage<Props> = (props): JSX.Element => {
  const { isUserOptedOutOfAnalytics, hasUserGivenAnyCookieConsent } = useUserConsent();

  return (
    <DefaultLayout
      {...props}
      pageName={'analytics'}
      headProps={{
        title: 'Analytics examples - Next Right Now',
      }}
      Sidebar={BuiltInFeaturesSidebar}
    >
      <Amplitude>
        {({ logEvent }: { logEvent: LogEvent }): JSX.Element => (
          <DocPage>
            <h1 className={'pcolor'}>Analytics examples, using Amplitude vendor</h1>

            <Alert color={'danger'}>
              Before investing time in Amplitude, make sure to check
              <ExternalLink
                href={'https://unlyed.github.io/next-right-now/guides/analytics/use-amplitude.html#a-note-about-amplitudes-pricing'}
                suffix={null}
              >
                their pricing and usage limits
              </ExternalLink>
              .<br />
              Amplitude is great for getting started but if you need more than what the free plan offers, then you better make sure you can afford it.
            </Alert>

            <Alert color={'info'}>
              Amplitude provides a <ExternalLink href={'https://github.com/amplitude/react-amplitude'}>React component</ExternalLink>
              that makes it a breeze to work with, and we really love it.<br />
              It's much more comfortable from a developer standpoint that everything we've worked with by the past.<br />
              <br />
              We only use Amplitude from the client, mostly because Amplitude didn't provide a nodejs compatible library until very recently.<br />
              Also, we prefer to perform all reporting on the client side, as it avoids issues with multiple events sent by mistake.
            </Alert>

            <p>
              The app is configured in a way that all usual web-related analytics options are handled out the box.<br />
              It also comes with a shared configuration for all pages (see below) and user-session tracking.<br />
              Regarding <b>GDPR concerns</b>, the IP address is not processed/stored by any vendor (analytics data are anonymous). Several cookies are created on the device if the user hasn't opted out of tracking (through the Cookie Consent popup).
            </p>

            <hr />

            <h2>Shared analytics configuration</h2>
            <p>
              The below code is the shared configuration between all pages.<br />
              It initializes the whole thing, and automatically track app-wide data so that all event will contain those properties automatically.
            </p>

            <Code
              text={`
                <AmplitudeProvider
                  amplitudeInstance={amplitudeInstance}
                  apiKey={process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY}
                  userId={userId}
                >
                  <Amplitude
                    eventProperties={{
                      app: {
                        name: process.env.NEXT_PUBLIC_APP_NAME,
                        version: process.env.NEXT_PUBLIC_APP_VERSION,
                        stage: process.env.NEXT_PUBLIC_APP_STAGE,
                        preset: process.env.NEXT_PUBLIC_NRN_PRESET,
                      },
                      page: {
                        url: location.href,
                        path: location.pathname,
                        origin: location.origin,
                        name: null, // XXX Will be set by the page (usually through its layout)
                      },
                      customer: {
                        ref: customerRef,
                      },
                      lang: lang,
                      locale: locale,
                      iframe: isInIframe,
                      iframeReferrer: iframeReferrer,
                    }}
                  />
                </AmplitudeProvider>

                // ... elsewhere

                // See https://help.amplitude.com/hc/en-us/articles/115001361248#settings-configuration-options
                amplitudeInstance.init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY, null, {
                  userId,
                  logLevel: process.env.NEXT_PUBLIC_APP_STAGE === 'production' ? 'DISABLE' : 'WARN',
                  includeGclid: true,
                  includeReferrer: true, // See https://help.amplitude.com/hc/en-us/articles/215131888#track-referrers
                  includeUtm: true,
                  // @ts-ignore XXX onError should be allowed, see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/42005
                  onError: (error): void => {
                    Sentry.captureException(error);
                    console.error(error); // eslint-disable-line no-console
                  },
                  sameSite: 'Strict', // 'Strict' | 'Lax' | 'None' - See https://web.dev/samesite-cookies-explained/
                });

                amplitudeInstance.setVersionName(process.env.NEXT_PUBLIC_APP_VERSION); // e.g: 1.0.0

                // We're only doing this when detecting a new session, as it won't be executed multiple times for the same session anyway, and it avoids noise
                if (amplitudeInstance.isNewSession()) {
                    // Store whether the visitor originally came from an iframe (and from where)
                    const visitor: Identify = new amplitudeInstance.Identify();
                    // XXX Learn more about "setOnce" at https://github.com/amplitude/Amplitude-JavaScript/issues/223
                    visitor.setOnce('initial_lang', lang); // DA Helps figuring out if the initial language (auto-detected) is changed afterwards
                    visitor.setOnce('initial_locale', locale);
                    // DA This will help track down the users who discovered our platform because of an iframe
                    visitor.setOnce('initial_iframe', isInIframe);
                    visitor.setOnce('initial_iframeReferrer', iframeReferrer);

                    // XXX We set all "must-have" properties here (instead of doing it in the "AmplitudeProvider", as userProperties), because react-amplitude will send the next "page-displayed" event BEFORE sending the $identify event
                    visitor.setOnce('customer.ref', customerRef);
                    visitor.setOnce('lang', lang);
                    visitor.setOnce('locale', locale);
                    visitor.setOnce('iframe', isInIframe);
                    visitor.setOnce('iframeReferrer', iframeReferrer);

                    amplitudeInstance.identify(visitor); // Send the new identify event to amplitude (updates user's identity)
                  }
              `}
            />

            <hr />

            <h2>Events - Automated page views</h2>
            <p>
              Below is how we automatically track all page views (through the <code>DefaultLayout</code> component):
            </p>

            <Code
              text={`
                <Amplitude
                  eventProperties={(inheritedProps): object => ({
                    // All app-wide properties are inherited and overloaded to track additional properties
                    ...inheritedProps,
                    page: {
                      ...inheritedProps.page,
                      name: pageName,
                    },
                  })}
                >
                  {/* The event is automatically sent upon component mount */}
                  <LogOnMount eventType="page-displayed" />
                </Amplitude>
              `}
            />

            <hr />

            <h2>Events - User interactions</h2>

            <p>
              Below is how we log events upon user interaction. (i.e: click)<br />
              When you click on the below button an event <code>analytics-button-test-event</code> is sent to Amplitude.<br />
              No data will be sent if you've opted-out of analytics tracking:
              <DisplayOnBrowserMount>
                <br />
                <b>
                  {
                    !hasUserGivenAnyCookieConsent ? `You haven't made any choice regarding your consent yet, and thus an event will be sent (because you're opt-in by default).` : (isUserOptedOutOfAnalytics ? `You've chosen to opt-out from analytics tracking, and thus no event will be sent.` : `You've chosen to opt-in to analytics tracking, and thus an event will be sent.`)
                  }
                </b>
              </DisplayOnBrowserMount>
              <br />
              <br />
              You can check the event details using <ExternalLink href={'https://chrome.google.com/webstore/detail/amplitude-instrumentation/acehfjhnmhbmgkedjmjlobpgdicnhkbp'}>Amplitude Instrumentation Explorer</ExternalLink> Chrome extension.
            </p>

            <Button
              onClick={(): void => {
                // eslint-disable-next-line no-console
                console.log('Button click');
                logEvent('analytics-button-test-event');
              }}
            >
              Click me
            </Button>
            <br />
            <br />

            <Code
              text={`
                <Amplitude>
                  {({ logEvent }: { logEvent: LogEvent }): JSX.Element => (
                    <Button
                      onClick={(): void => {
                        // eslint-disable-next-line no-console
                        console.log('Button click');
                        logEvent('analytics-button-test-event');
                      }}
                    >
                      Click me
                    </Button>
                  )}
                </Amplitude>
              `}
            />

          </DocPage>
        )}
      </Amplitude>
    </DefaultLayout>
  );
};

export default (ExampleAnalyticsPage);
