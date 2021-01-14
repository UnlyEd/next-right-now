import { Amplitude, AmplitudeProvider } from '@amplitude/react-amplitude';
import { ThemeProvider } from '@emotion/react';
import '@storybook/addon-console'; // Automatically forwards all logs in the "Actions" panel - See https://github.com/storybookjs/storybook-addon-console
import { addDecorator } from '@storybook/react';
import { themes } from '@storybook/theming';
import find from 'lodash.find';
import React from 'react';
import { withNextRouter } from 'storybook-addon-next-router';
import { withPerformance } from 'storybook-addon-performance';
import '../src/components/appBootstrap/MultiversalGlobalExternalStyles'; // Import the same 3rd party libraries global styles as the pages/_app.tsx (for UI consistency)
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
import i18nextLocize from '../src/utils/i18n/i18nextLocize';
import '../src/utils/icons/font-awesome';
import dataset from './mock/sb-dataset';

/**
 * Mock variables used to initialize all stories.
 *
 * Mocking those ensures the components relying on them will work as expected.
 *
 * About Amplitude analytics:
 * - We don't want to track analytics using Amplitude.
 * - All analytics is disabled when running a component through Storybook preview.
 *
 * About Google analytics, see ".storybook/main.js" documentation.
 */
const customer = find(dataset, { __typename: 'Customer' });
const customerTheme = initCustomerTheme(customer);
const customerRef = 'storybook'; // Fake customer ref
const lang = 'en'; // Default language, not sure if it should be dynamic
const locale = 'en'; // Default language, not sure if it should be dynamic
const amplitudeApiKey = ''; // Use invalid amplitude tracking key to force disable all amplitude analytics
const userConsent = {
  isUserOptedOutOfAnalytics: true, // Disables all amplitude analytics tracking (even if a proper api key was being used)
  hasUserGivenAnyCookieConsent: false,
};
const userId = 'storybook'; // Fake id (would avoid user tracking even if correct api key was being used)
const amplitudeInstance = getAmplitudeInstance({
  customerRef,
  iframeReferrer: null,
  isInIframe: false,
  lang,
  locale,
  userId,
  userConsent: userConsent,
});

// Configure translations (Locize)
const i18nTranslations = require('./.sb-translations.cache.json');
i18nextLocize(lang, i18nTranslations); // Apply i18next configuration with Locize backend

/**
 * Story Global parameters for Storybook.
 *
 * Couldn't find a documentation reference for all options.
 *
 * @see https://storybook.js.org/docs/react/writing-stories/parameters#global-parameters
 * @see https://github.com/storybookjs/storybook/blob/master/addons/actions/ADVANCED.md#configuration
 * @see https://storybook.js.org/docs/react/essentials/backgrounds#configuration
 *
 * Theme:
 * Configure Storybook theme, using dark by default.
 * You can customise this behavior per story using parameters.
 * Configuring the theme in "manager.js" didn't work out.
 * Also, the "Docs" section is better using the "normal" theme, for readability.
 *
 * @see https://storybook.js.org/docs/react/configure/theming#global-theming Global theming
 * @see https://storybook.js.org/docs/react/configure/theming#theming-docs Per story theming (parameter)
 * @see https://storybook.js.org/docs/react/configure/theming#create-a-theme-quickstart Creating your own theme
 */
export const parameters = {
  actions: {
    argTypesRegex: '^on[A-Z].*',

    /**
     * Since Controls is built on the same engine as Storybook Docs, it can also show property documentation alongside your controls using the expanded parameter (defaults to false).
     * We enable this for all stories by default.
     *
     * @see https://storybook.js.org/docs/react/essentials/controls#show-full-documentation-for-each-property
     */
    expanded: true,
  },
  options: {
    theme: themes.dark,
    // See https://storybook.js.org/docs/react/writing-stories/naming-components-and-hierarchy#sorting-stories
    storySort: {
      method: 'alphabetical',
      order: [
        'App', // Should be first
        'Next Right Now', // Should be second, if kept around
        'Storybook Examples', // Should be last, if kept around
      ],
    },
  },
  docs: {
    theme: themes.normal,
  },
};

/**
 * Allow to use Next.js Router in Storybook stories.
 *
 * If you need to customise a component/story, then you should see https://github.com/lifeiscontent/storybook-addon-next-router#as-a-decorator-in-a-story
 * You'll need to specify the Router behavior per-story if the below default config doesn't suit you.
 *
 * @see https://github.com/lifeiscontent/storybook-addon-next-router#usage-in-previewjs
 */
addDecorator(
  withNextRouter({
    path: '/', // defaults to `/`
    asPath: '/', // defaults to `/`
    query: {}, // defaults to `{}`
    // @formatter:off Disables odd WebStorm formatting for next line
    push() {}, // defaults to using addon actions integration, can override any method in the router
    // @formatter:on
  }),
);

/**
 *  Decorators in .storybook/preview.js are used for context mocking.
 *
 * Basically, they play a similar role to _app and appBootstrap components (MultiversalAppBootstrap, etc.)
 *
 * Like parameters, decorators can be defined globally, at the component level and for a single story (as we’ve seen).
 * All decorators, defined at all levels that apply to a story will run whenever that story is rendered, in the order:
 * - Global decorators, in the order they are defined
 * - Component decorators, in the order they are defined
 * - Story decorators, in the order they are defined.
 *
 * @see https://storybook.js.org/docs/react/writing-stories/decorators#context-for-mocking
 * @see https://storybook.js.org/docs/react/writing-stories/decorators#global-decorators
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
                  apiKey={amplitudeApiKey}
                  userId={userId}
                >
                  <Amplitude
                    eventProperties={{
                      app: {
                        name: customerRef,
                        release: customerRef,
                        stage: `storybook-${process.env.NODE_ENV}`,
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

/**
 * Enables storybook-addon-performance for all stories by default.
 *
 * @see https://github.com/atlassian-labs/storybook-addon-performance#installation
 */
addDecorator(withPerformance);
