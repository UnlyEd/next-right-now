import { Amplitude, AmplitudeProvider } from '@amplitude/react-amplitude';
import { ThemeProvider } from '@emotion/react';
import '@storybook/addon-console'; // Automatically forwards all logs in the "Actions" panel - See https://github.com/storybookjs/storybook-addon-console
import { withTests } from '@storybook/addon-jest';
import { addDecorator } from '@storybook/react';
import { themes } from '@storybook/theming';
import find from 'lodash.find';
import React from 'react';
import { withNextRouter } from 'storybook-addon-next-router';
import { withPerformance } from 'storybook-addon-performance';
import '@/app/components/MultiversalGlobalExternalStyles'; // Import the same 3rd party libraries global styles as the pages/_app.tsx (for UI consistency)
import MultiversalGlobalStyles from '@/app/components/MultiversalGlobalStyles';
import { defaultLocale, getLangFromLocale, supportedLocales } from '@/modules/core/i18n/i18nConfig';
import amplitudeContext from '@/modules/core/amplitude/context/amplitudeContext';
import customerContext from '@/modules/core/data/contexts/customerContext';
import { cypressContext } from '@/modules/core/testing/contexts/cypressContext';
import datasetContext from '@/modules/core/data/contexts/datasetContext';
import i18nContext from '@/modules/core/i18n/contexts/i18nContext';
import previewModeContext from '@/modules/core/previewMode/contexts/previewModeContext';
import quickPreviewContext from '@/modules/core/quickPreview/contexts/quickPreviewContext';
import userConsentContext from '@/modules/core/userConsent/contexts/userConsentContext';
import { userSessionContext } from '@/modules/core/userSession/userSessionContext';
import { getAmplitudeInstance } from '@/modules/core/amplitude/amplitude';
import '@/common/utils/ignoreNoisyWarningsHacks';
import { initCustomerTheme } from '@/modules/core/theming/theme';
import i18nextLocize from '@/modules/core/i18n/i18nextLocize';
import '@/modules/core/fontAwesome/fontAwesome';
import dataset from './mock/sb-dataset';

// Loads translations from local file cache (Locize)
const i18nTranslations = require('./.sb-translations.cache.json');

/**
 * Story Global parameters for Storybook.
 *
 * Parameters are a set of static, named metadata about a story, typically used to control the behavior of Storybook features and addons.
 * Parameters are applied at the top-level and act as default values.
 *
 * XXX They can be overridden per component and per story.
 *  See https://storybook.js.org/docs/react/writing-stories/parameters#rules-of-parameter-inheritance
 *
 * @see https://storybook.js.org/docs/react/writing-stories/parameters Parameters documentation
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

  /**
   * Configure stories argTypes for all stories.
   *
   * @deprecated Should not be used at the moment. See https://github.com/storybookjs/storybook/issues/11697
   * @see https://storybook.js.org/docs/react/essentials/controls
   */
  // argTypes: {},

  /**
   * Options.
   * Couldn't find centralized documentation about it.
   */
  options: {
    /**
     * @see https://storybook.js.org/docs/react/writing-stories/naming-components-and-hierarchy#sorting-stories
     */
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
 * Storybook ships with toolbar items to control the viewport and background the story renders in.
 *
 * Below, we extend the native toolbar to add a few more options, such as i18n.
 * Those global types can then be used in decorators, for both global decorators and story decorators.
 *
 * @description toolbar.item Can be either an array of plain strings, or a MenuItem.
 *  See https://storybook.js.org/docs/react/essentials/toolbars-and-globals#advanced-usage
 *
 * @description toolbar.icon The icon the will be displayed in the top toolbar.
 *  See https://www.chromatic.com/component?appId=5a375b97f4b14f0020b0cda3&name=Basics%7CIcon&mode=interactive&buildNumber=13899
 *
 * @see https://storybook.js.org/docs/react/essentials/toolbars-and-globals
 */
export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Global locale for components',
    defaultValue: defaultLocale,
    toolbar: {
      icon: 'globe', // See https://www.chromatic.com/component?appId=5a375b97f4b14f0020b0cda3&name=Basics%7CIcon&mode=interactive&buildNumber=13899
      items: supportedLocales.map(locale => locale.name),
    },
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
 * Decorators in .storybook/preview.js are useful to mock Stories.
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
  /**
   * Mock variables used to initialize all stories.
   *
   * Mocking those ensures the components relying on them will work as expected.
   * Basically, plays a similar role to _app and appBootstrap components (MultiversalAppBootstrap, etc.)
   *
   * About Amplitude analytics:
   * - We don't want to track analytics using Amplitude.
   * - All analytics is disabled when running a component through Storybook preview.
   *
   * About Google analytics, see ".storybook/main.js" documentation.
   *
   * @see https://storybook.js.org/docs/react/essentials/toolbars-and-globals#create-a-decorator Context and globals
   */
    (Story, context) => {
    // console.log('context', context) // Prints useful information about the Story's configuration
    // Configure i18n. In Storybook, the locale can be set from the top Toolbar.
    const locale = context?.globals?.locale || defaultLocale;
    const lang = getLangFromLocale(locale);

    // Applies i18next configuration with Locize backend
    // Extra features like saveMissing, etc. will be disabled in production because Storybook doesn't have access to NEXT_PUBLIC_* environment variables there
    // Although, they are configured in the same way as the Next.js app during development mode
    i18nextLocize(lang, i18nTranslations);

    const customer = find(dataset, { __typename: 'Customer' });
    const customerTheme = initCustomerTheme(customer);
    // console.log('customer', customer)
    // console.log('customerTheme', customerTheme)
    const customerRef = 'storybook'; // Fake customer ref
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

    // Configure all providers, similarly to what being done by MultiversalAppBootstrap and BrowserPageBootstrap
    return (
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
    );
  },
];

/**
 * Enables storybook-addon-performance for all stories by default.
 *
 * @see https://github.com/atlassian-labs/storybook-addon-performance#installation
 */
addDecorator(withPerformance);

/**
 * Configure Jest Storybook for all stories.
 *
 * Each story must define which test it's associated to, to show the associated tests results in the preview.
 * See https://github.com/storybookjs/storybook/tree/master/addons/jest#usage
 *
 * @see https://github.com/storybookjs/storybook/tree/master/addons/jest
 */
try {
  let testResults;
  testResults = require('../.jest-test-results.json');

  addDecorator(
    withTests({
      results: testResults,
    }),
  );
} catch (e) {
  console.log(`Couldn't find ../.jest-test-results.json, Jest tests might not work properly.`)
}

