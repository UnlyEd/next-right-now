// Import the same 3rd party libraries global styles as the pages/_app.tsx (for UI consistency)
import { Amplitude, AmplitudeProvider } from '@amplitude/react-amplitude';
import { ThemeProvider } from '@emotion/react';
import { addDecorator } from '@storybook/react';
import find from 'lodash.find';
import React from 'react';
import { withNextRouter } from 'storybook-addon-next-router';
import '../src/components/appBootstrap/MultiversalGlobalExternalStyles';
import MultiversalGlobalStyles from '../src/components/appBootstrap/MultiversalGlobalStyles';
import amplitudeContext from '../src/stores/amplitudeContext';
import customerContext from '../src/stores/customerContext';
import { cypressContext } from '../src/stores/cypressContext';
import datasetContext from '../src/stores/datasetContext';
import i18nContext from '../src/stores/i18nContext';
import previewModeContext from '../src/stores/previewModeContext';
import quickPreviewContext from '../src/stores/quickPreviewContext';
import userConsentContext from '../src/stores/userConsentContext';
import { userSessionContext } from '../src/stores/userSessionContext';
import { getAmplitudeInstance } from '../src/utils/analytics/amplitude';
import { initCustomerTheme } from '../src/utils/data/theme';
import dataset from './mock/sb-dataset';

const customer = find(dataset, { __typename: 'Customer' });
const customerTheme = initCustomerTheme(customer);
const customerRef = 'storybook';
const lang = 'en';
const locale = 'en';
const userConsent = {
  isUserOptedOutOfAnalytics: true,
  hasUserGivenAnyCookieConsent: false,
};
const userId = 'storybook';
const amplitudeInstance = getAmplitudeInstance({
  customerRef,
  iframeReferrer: null,
  isInIframe: false,
  lang,
  locale,
  userId,
  userConsent: userConsent,
});

/**
 * Story Global parameters for Storybook.
 *
 * Couldn't find a documentation reference for all options.
 *
 * @see https://storybook.js.org/docs/react/writing-stories/parameters#global-parameters
 * @see https://github.com/storybookjs/storybook/blob/master/addons/actions/ADVANCED.md#configuration
 * @see https://storybook.js.org/docs/react/essentials/backgrounds#configuration
 */
export const parameters = {
  actions: {
    argTypesRegex: '^on[A-Z].*',
  },
  options: {
    // See https://storybook.js.org/docs/react/writing-stories/naming-components-and-hierarchy#sorting-stories
    storySort: {
      method: 'alphabetical',
      order: [
        'Next Right Now',
        'Utilities',
        'Storybook Examples',
      ],
    },
  },
};

/**
 * Allow to use Next.js Router in Storybook stories.
 *
 * @see https://github.com/lifeiscontent/storybook-addon-next-router#usage-in-previewjs
 */
addDecorator(
  withNextRouter({
    path: '/', // defaults to `/`
    asPath: '/', // defaults to `/`
    query: {}, // defaults to `{}`
    push() {}, // defaults to using addon actions integration, can override any method in the router
  }),
);

/**
 * Decorators in .storybook/preview.js are used for context mocking.
 *
 * Basically, they play a similar role to _app and appBootstrap components (MultiversalAppBootstrap, etc.)
 *
 * @type {(function(*))[]}
 * @see https://storybook.js.org/docs/react/writing-stories/decorators#context-for-mocking
 */
export const decorators = [
  (Story) => (
    <datasetContext.Provider value={dataset}>
      <quickPreviewContext.Provider value={false}>
        <previewModeContext.Provider
          value={{
            isPreviewModeEnabled: false,
            previewData: null,
          }}
        >
          <i18nContext.Provider
            value={{
              lang: lang,
              locale: locale,
            }}
          >
            <customerContext.Provider value={customer}>
              <MultiversalGlobalStyles customerTheme={customerTheme} />

              <ThemeProvider theme={customerTheme}>
                <AmplitudeProvider
                  amplitudeInstance={amplitudeInstance}
                  apiKey={process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY}
                  userId={userId}
                >
                  <Amplitude
                    eventProperties={{
                      app: {
                        name: customerRef,
                        release: customerRef,
                        stage: 'development',
                      },
                      page: {
                        url: location.href,
                        path: location.pathname,
                        origin: location.origin,
                      },
                      customer: {
                        ref: customerRef,
                      },
                      lang: lang,
                      locale: locale,
                    }}
                  >
                    <cypressContext.Provider value={false}>
                      <amplitudeContext.Provider value={{ amplitudeInstance }}>
                        <userSessionContext.Provider value={null}>
                          <userConsentContext.Provider value={null}>
                            <Story />
                          </userConsentContext.Provider>
                        </userSessionContext.Provider>
                      </amplitudeContext.Provider>
                    </cypressContext.Provider>
                  </Amplitude>
                </AmplitudeProvider>
              </ThemeProvider>
            </customerContext.Provider>
          </i18nContext.Provider>
        </previewModeContext.Provider>
      </quickPreviewContext.Provider>
    </datasetContext.Provider>
  ),
];
