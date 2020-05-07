import * as Sentry from '@sentry/node';
import { isBrowser } from '@unly/utils';
import { createLogger } from '@unly/utils-simple-logger';
import i18next, { i18n } from 'i18next';
import fetch from 'isomorphic-unfetch';
import get from 'lodash.get';
import map from 'lodash.map';
import { initReactI18next } from 'react-i18next';

import { LANG_EN, LANG_FR } from './i18n';

const logger = createLogger({
  label: 'utils/i18n/i18nextLocize',
});

// On the client, we store the i18nextLocize instance in the following variable.
// This prevents the client from reinitializing between page transitions, which caused infinite loop rendering.
let globalI18nextInstance: i18n = null;

/**
 * A resource locale can be either using a "flat" format or a "nested" format
 *
 * @example
 * {
 *    "login": {
 *        "label": "Log in",
 *        "user": "User Name"
 *    }
 * }
 *
 * @example
 * {
 *    "login.label": "Log in",
 *    "login.user": "User Name",
 *    "User not found!": "User not found!"
 * }
 */
export declare type I18nextResourceLocale = {
  [i18nKey: string]: string | I18nextResourceLocale; // The value can either be a string, or a nested object, itself containing either a string, or a nest object, etc.
}

/**
 * One or more i18next resources, indexed by lang
 *
 * @example
 * {
 *   fr: {
 *     "login": {
 *       "label": "Log in",
 *       "user": "User Name"
 *     }
 *   }
 * }
 */
export declare type I18nextResources = {
  [lang: string]: I18nextResourceLocale;
}

/**
 * Memoized i18next resources are timestamped, to allow for cache invalidation strategies
 * The timestamp's value is the time when the memoized cache was created
 */
export declare type MemoizedI18nextResources = {
  resources: I18nextResources;
  ts: number; // Timestamp in milliseconds
}

/**
 * In-memory cache of the i18next resources
 *
 * Useful to avoid over-fetching the Locize API, but rather rely on the memoized cache when available
 * Each locizeAPIEndpoint contains its own cache, thus handling different projects, versions, languages and namespaces
 *
 * @type {I18nextResources}
 * @private
 */
const _memoizedI18nextResources: {
  [locizeAPIEndpoint: string]: MemoizedI18nextResources;
} = {};

/**
 * Max age of the memoized cache (value in seconds)
 *
 * Once the cache is older than max age, it gets invalidated
 * This is used in both the browser and the server, but it's meant to be the most useful on the server
 * - The browser will reset its own memoized cache as soon as the user refreshes the page (f5, etc.), so it's very not likely to ever reach max age
 * - The server, on the other hand, may very much reach max age and needs to perform some cache invalidation from time to time,
 *    to make sure we use the latest translations
 *
 * @type {number} seconds
 */
const memoizedCacheMaxAge = ((): number => {
  const oneHour = 3600;
  const oneMinute = 60;

  if (process.env.APP_STAGE === 'production') {
    // We want to cache for a while in production, to avoid unnecessary network calls
    if (isBrowser()) {
      // The in-memory browser cache will be invalidated when the page is refreshed,
      // but then the browser's internal cache will take over (and it will cache for 1h)

      // So, we don't really care about the in-memory browser cache max age in this case,
      // since the browser's internal cache will take over most of the time when in-memory gets invalidated (upon refresh, for instance)
      return oneHour;
    } else {
      // The server should cache for quite a wile, but still invalidates it cache from time to time,
      // in case there has been hot-fix released to the Locize production version
      return oneHour;
    }
  } else {
    // Whether in development or staging, cache shouldn't get in the way of productivity,
    // but yet not perform massive unnecessary network calls
    if (isBrowser()) {
      // The browser will reset the in-memory cache at any page refresh anyway,
      // keep it high to avoid unnecessary network calls while performing client-side navigation
      return oneHour;
    } else {
      // We want our server to avoid unnecessary network calls,
      // but still be up-to-date frequently
      return oneMinute;
    }
  }
})();

/**
 * The default namespace name used to store all our translations
 * (Must be manually created in Locize's project before being used)
 *
 * @type {string}
 */
const defaultNamespace = 'common';

/**
 * Common options shared between all locize/i18next plugins
 *
 * @see https://github.com/locize/i18next-node-locize-backend#backend-options
 * @see https://github.com/locize/i18next-locize-backend#backend-options
 * @see https://github.com/locize/locize-node-lastused#options
 * @see https://github.com/locize/locize-editor#initialize-with-optional-options
 */
export const locizeOptions = {
  projectId: process.env.LOCIZE_PROJECT_ID || undefined,
  apiKey: process.env.APP_STAGE === 'production' ? null : process.env.LOCIZE_API_KEY, // XXX Only define the API key on non-production environments (allows to use saveMissing from server)
  version: process.env.APP_STAGE === 'production' ? 'production' : 'latest', // XXX On production, use a dedicated production version
  referenceLng: 'fr',
};

/**
 * Specific options for the selected Locize backend.
 *
 * There are different backends for locize, depending on the runtime engine (browser or node).
 * But each backend shares a common API.
 *
 * @see https://github.com/locize/i18next-node-locize-backend#backend-options
 * @see https://github.com/locize/i18next-locize-backend#backend-options
 */
export const locizeBackendOptions = {
  ...locizeOptions,
  // XXX "build" is meant to automatically invalidate the browser cache when releasing a different version,
  //  so that the end-users get the newest version immediately
  loadPath: `https://api.locize.app/{{projectId}}/{{version}}/{{lng}}/{{ns}}?build=${process.env.BUILD_TIMESTAMP}`,
  private: false, // Should never be private

  /**
   * Hosts that are allowed to create, update keys
   *
   * Necessary when using saveMissing, executed both client and server side, but client doesn't have API key on purpose.
   * XXX Keep those to your local system, staging, test servers (not production)
   *
   * @param {string} host
   * @return {boolean}
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  allowedAddOrUpdateHosts: (host: string): boolean => {
    return process.env.APP_STAGE !== 'production'; // We allow any of our development or staging instance to update missing keys
  },
};

/**
 * Fetch translations from Locize API
 *
 * We use a "common" namespace that contains all our translations
 * It's easier to manage, as we don't need to split translations under multiple files (we don't have so many translations)
 * (that may be a bit more optimized to split them under different namespaces, but that feels like anticipated optimization that isn't needed atm)
 *
 * We don't use the Locize backend for fetching data, because it doesn't play well with Next framework (no serverless support)
 * @see https://github.com/isaachinman/next-i18next/issues/274
 *
 * Instead, we manually fetch (pre-fetch) the translations ourselves from the _app:getInitialProps, so that they're available both on the client and the server
 * @see https://github.com/i18next/i18next/issues/1373
 *
 * XXX Make sure you don't use "auto" publish format, but either "nested" or "flat", to avoid the format to dynamically change (We recommend "nested")
 * @see https://faq.locize.com/#/general-questions/why-is-my-namespace-suddenly-a-flat-json
 *
 * XXX Caching is quite complicated, because the caching strategy depends on the runtime engine (browser vs server) and the stage (development, staging, production)
 * For instance, we don't want to cache in development/staging, but we do for production in order to improve performances and decrease network usage
 * Also, we want to invalidate the cache as soon as a new version is deployed, so that the end-users get the latest version immediately
 * (and avoid missing translations due to new content for which there wouldn't be any translation because we'd still be using a cached version)
 * @see https://github.com/i18next/i18next/issues/1373
 *
 * Explanation about our cache implementation:
 *  - Browser:
 *    * In-memory: Once the translations are fetched from Locize, they're memoized
 *      - Development/staging stages:
 *        - It's very useful in development/staging, where we don't have any browser caching enabled, because it'll reduce the API calls
 *          With this in-memory cache, the Locize API will be hit only once by the browser, and then the in-memory cache will take over when performing client-side navigation
 *        - The in-memory cache will be invalidated as soon as the page is refreshed (F5, cmd+r, etc.) and a new API call will be made
 *    * Browser's native cache:
 *      - Development/staging stages:
 *        - The browser's cache is completely disabled in development/staging, so that we may work/test with the latest translation
 *          See the official recommendations https://docs.locize.com/more/caching
 *      - Production stage:
 *        - When in production, the browser will also cache for 1h, because we configured a "Cache-control: Max-Age" at https://www.locize.app/p/w7jrmdie/settings
 *          We followed the official recommendations https://docs.locize.com/more/caching
 *          1h seems to be a good compromise between over-fetching (we don't expect our users to use the app for more than 1h straight)
 *          and applying translation "hot-fix" (worst case: "hot-fix"" be applied 1h later, which is acceptable)
 *        - The browser's native cache will be invalidated as soon as a new release of the app is deployed,
 *          because the value of "build" in the "loadPath" url will change and thus the browser will not use its cached version anymore
 *  - Server:
 *    * In-memory: Once the translations are fetched from Locize, they're memoized
 *      - Development:
 *        - Once the translations are memoized, they'll be kept in-memory until the server restarts
 *          Note that HMR will clear the cache, meaning any source code change that triggers a new build will thus invalidate the cache
 *      - Staging/production:
 *        - Once the translations are memoized, they'll be kept in-memory until... God knows what.
 *          - It's very hard to know how/when the memoized cache will be invalidated, as it's very much related to AWS Lambda lifecycle, which can be quite surprising
 *          - It will likely be invalidated within 5-15mn if there aren't any request performed against the Lambda (nobody using the app)
 *          - But if there is a steady usage of the app then it could be memoized for hours/days
 *          - If there is a burst usage, then new lambdas will be triggered, with their own version of the memoized cache
 *            (thus, depending on which Lambda serves the requests, the result could be different if they don't use the same memoized cache)
 *            This could be the most surprising, as you don't know which Lambda will serve you, so you may see a different content by refreshing the page
 *            (if browser cache is disabled, like when using the browser in Anonymous mode)
 *        - To sum up: The memoized cache will be invalidated when the server restarts
 *          - When a new release is deployed (this ensures that a new deployment invalidates the cache for all running Lambda instances at once)
 *          - When a Lambda that serves the app is started
 *        - The cache is automatically invalidated after 1h (see memoizedCacheMaxAge). Thus ensuring that all Lambdas will be in-sync every hour or so,
 *          even when hot-fixes are deployed on Locize
 *    * Server's native cache:
 *      - Development:
 *        - There is no known server-side caching abilities while in development, and we don't want to cache the content while in development
 *      - Staging/production:
 *        - The server doesn't have any native caching abilities. We're running under Next.js serverless mode (AWS Lambda), which has a /tmp directory where we could write
 *          (See https://stackoverflow.com/questions/48364250/write-to-tmp-directory-in-aws-lambda-with-python)
 *          But Next.js abstracts that away from us and we don't know how to write there. (would it be more efficient than the in-memory cache anyway?)
 *
 * @param {string} lang
 * @return {Promise<string>}
 */
export const fetchTranslations = async (lang: string): Promise<I18nextResources> => {
  const locizeAPIEndpoint: string = locizeBackendOptions
    .loadPath
    .replace('{{projectId}}', locizeBackendOptions.projectId)
    .replace('{{version}}', locizeBackendOptions.version)
    .replace('{{lng}}', lang)
    .replace('{{ns}}', defaultNamespace);
  const memoizedI18nextResources: MemoizedI18nextResources = get(_memoizedI18nextResources, locizeAPIEndpoint, null);

  if (memoizedI18nextResources) {
    const date = new Date();

    // If the memoized cache isn't too old, use it
    if (+date - memoizedI18nextResources.ts < 1000 * memoizedCacheMaxAge) {
      // If the i18next resources have been fetched previously, they're therefore available in the memory and we return them untouched to avoid network calls
      logger.info('Translations were resolved from in-memory cache');
      return (memoizedI18nextResources).resources;
    } else {
      // Memoized cache is too old, we need to fetch from Locize API again
      logger.info(`Translations from in-memory cache are too old (> ${memoizedCacheMaxAge} seconds) and thus have been invalidated`);
    }
  }
  let commonLocales = {};

  try {
    // Fetching locales for i18next, for the "common" namespace
    // XXX We do that because if we don't, then the SSR fails at fetching those locales using the i18next "backend" and renders too early
    //  This hack helps fix the SSR issue
    //  On the other hand, it seems that once the i18next "resources" are set, they don't change,
    //  so this workaround could cause sync issue if we were using multiple namespaces, but we aren't and probably won't
    logger.info(`Pre-fetching translations from ${locizeAPIEndpoint}`);
    const defaultLocalesResponse = await fetch(locizeAPIEndpoint);

    try {
      commonLocales = await defaultLocalesResponse.json();
    } catch (e) {
      // TODO Load the locales from local JSON files if ever the API fails, to still display i18n translation even if it's not the most up-to-date?
      logger.error(e.message, 'Failed to extract JSON data from locize API response');
      Sentry.captureException(e);
    }
  } catch (e) {
    logger.error(e.message, 'Failed to fetch data from locize API');
    Sentry.captureException(e);
  }

  const i18nextResources: I18nextResources = {
    [lang]: {
      [defaultNamespace]: commonLocales,
    },
  };
  logger.info('Translations were resolved from Locize API and are now being memoized for subsequent calls');

  _memoizedI18nextResources[locizeAPIEndpoint] = {
    resources: i18nextResources,
    ts: ((): number => {
      const date = new Date();
      return +date;
    })(),
  }; // Update the in-memory cache
  Sentry.configureScope((scope) => {
    scope.setContext('_memoizedI18nextResources', _memoizedI18nextResources);
  });

  return i18nextResources;
};

/**
 * Configure i18next with Locize backend.
 *
 * - Initialized with pre-defined "lang" (to make sure GraphCMS and Locize are configured with the same language)
 * - Initialized with pre-fetched "defaultLocales" (for SSR compatibility)
 * - Fetches translations from Locize backend
 * - Automates the creation of missing translations using "saveMissing: true"
 * - Display Locize "in-context" Editor when appending "/?locize=true" to the url (e.g http://localhost:8888/?locize=true)
 * - Automatically "touches" translations so it's easier to know when they've been used for the last time,
 *    thus helping translators figure out which translations are not used anymore so they can delete them
 *
 * XXX We don't rely on https://github.com/i18next/i18next-browser-languageDetector because we have our own way of resolving the language to use, using utils/locale
 *
 * @param lang
 * @param defaultLocales
 */
const createI18nextLocizeInstance = (lang: string, i18nTranslations: I18nextResources): i18n => {
  // If LOCIZE_PROJECT_ID is not defined then we mustn't init i18next or it'll crash the whole app when running in non-production stage
  // In that case, better crash early with an explicit message
  if (!process.env.LOCIZE_PROJECT_ID) {
    throw new Error('Env var "LOCIZE_PROJECT_ID" is not defined. Please add it to you .env.build file (development) or now*.json (staging/production)');
  }

  // Plugins will be dynamically added at runtime, depending on the runtime engine (node or browser)
  const plugins = [ // XXX Only plugins that are common to all runtimes should be defined by default
    initReactI18next, // passes i18next down to react-i18next
  ];

  // Dynamically load different modules depending on whether we're running node or browser engine
  if (!isBrowser()) {
    // XXX Use "__non_webpack_require__" on the server
    // loads translations, saves new keys to it (saveMissing: true)
    // https://github.com/locize/i18next-node-locize-backend
    const i18nextNodeLocizeBackend = __non_webpack_require__('i18next-node-locize-backend');
    plugins.push(i18nextNodeLocizeBackend);

    // sets a timestamp of last access on every translation segment on locize
    // -> safely remove the ones not being touched for weeks/months
    // https://github.com/locize/locize-node-lastused
    const locizeNodeLastUsed = __non_webpack_require__('locize-node-lastused');
    plugins.push(locizeNodeLastUsed);

  } else {
    // XXX Use "require" on the browser, always take the "default" export specifically
    // loads translations, saves new keys to it (saveMissing: true)
    // https://github.com/locize/i18next-locize-backend
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const i18nextLocizeBackend = require('i18next-locize-backend').default;
    plugins.push(i18nextLocizeBackend);

    // InContext Editor of locize ?locize=true to show it
    // https://github.com/locize/locize-editor
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const locizeEditor = require('locize-editor').default;
    plugins.push(locizeEditor);
  }

  const i18nInstance = i18next;
  map(plugins, (plugin) => i18nInstance.use(plugin));
  // @ts-ignore
  i18nInstance.init({ // XXX See https://www.i18next.com/overview/configuration-options
    resources: i18nTranslations,
    // preload: ['fr', 'en'], // XXX Supposed to preload languages, doesn't work with Next
    cleanCode: true, // language will be lowercased EN --> en while leaving full locales like en-US
    debug: process.env.APP_STAGE === 'development' && isBrowser(), // Only enable locally on browser, too much noise otherwise
    saveMissing: process.env.APP_STAGE === 'development', // Only save missing translations on development environment, to avoid outdated keys to be created from older staging deployments
    saveMissingTo: defaultNamespace,
    lng: lang, // XXX We don't use the built-in i18next-browser-languageDetector because we have our own way of detecting language, which must behave identically for both GraphCMS I18n and react-I18n
    fallbackLng: lang === LANG_FR ? LANG_EN : LANG_FR,
    ns: [defaultNamespace], // string or array of namespaces to load
    defaultNS: defaultNamespace, // default namespace used if not passed to translation function
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    backend: locizeBackendOptions,
    locizeLastUsed: locizeOptions,
    editor: {
      ...locizeOptions,
      onEditorSaved: async (lng, ns): Promise<void> => {
        // reload that namespace in given language
        await i18next.reloadResources(lng, ns);
        // trigger an event on i18n which triggers a rerender
        // based on bindI18n below in react options
        i18next.emit('editorSaved');
      },
    },
    react: {
      bindI18n: 'languageChanged editorSaved',
      useSuspense: false, // Not compatible with SSR
    },
    load: 'languageOnly', // Remove if you want to use localization (en-US, en-GB)
  });

  return i18nInstance;
};

/**
 * Singleton helper
 *
 * Return the global globalI18nextInstance if set, or initialize it, if not.
 *
 * @param lang
 * @param i18nTranslations
 */
const i18nextLocize = (lang: string, i18nTranslations: I18nextResources): i18n => {
  if (!globalI18nextInstance) {
    globalI18nextInstance =  createI18nextLocizeInstance(lang, i18nTranslations);

    return globalI18nextInstance;
  } else {
    return globalI18nextInstance;
  }
};

export default i18nextLocize;

