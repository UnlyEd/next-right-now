import * as Sentry from '@sentry/node';
import { isBrowser } from '@unly/utils';
import { createLogger } from '@unly/utils-simple-logger';
import deepmerge from 'deepmerge';
import i18next, { i18n } from 'i18next';
import i18nextLocizeBackend from 'i18next-locize-backend/cjs'; // https://github.com/locize/i18next-locize-backend/issues/323#issuecomment-619625571
import get from 'lodash.get';
import map from 'lodash.map';
import { initReactI18next } from 'react-i18next';

import {
  resolveCustomerVariationLang,
  resolveFallbackLanguage,
} from './i18n';

const logger = createLogger({
  label: 'utils/i18n/i18nextLocize',
});

// On the client, we store the i18nextLocize instance in the following variable.
// This prevents the client from reinitializing between page transitions, which caused infinite loop rendering.
let globalI18nextInstance: i18n = null;

/**
 * A resource locale can be either using a "flat" format or a "nested" format
 *
 * XXX We strongly recommend to use either, but not both. Pick your choice at the beginning of the project and stick with it.
 *  We personally chose the "nested" format.
 *
 * @example Nested format
 * {
 *    "login": {
 *        "label": "Log in",
 *        "user": "User Name"
 *    }
 * }
 *
 * @example Flat format
 * {
 *    "login.label": "Log in",
 *    "login.user": "User Name",
 *    "User not found!": "User not found!"
 * }
 */
export type I18nextResourceLocale = {
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
export type I18nextResources = {
  [lang: string]: I18nextResourceLocale;
}

/**
 * Memoized i18next resources are timestamped, to allow for cache invalidation strategies
 * The timestamp's value is the time when the memoized cache was created
 * It is used as "max-age", to discard/refresh cache when it's too old
 */
export type MemoizedI18nextResources = {
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
 * This is used in both the browser and the server, but it's meant to be the most useful on the server (especially for SSR pages)
 * - The browser will reset its own memoized cache as soon as the user refreshes the page (f5, etc.), so it's very not likely to ever reach max age
 * - The server, on the other hand, may very much reach max age and needs to perform some cache invalidation from time to time,
 *    to make sure we use the latest translations
 *
 * For SSG pages, because Locize is not used at runtime, but only queried at build time, the whole caching process is not relevant and isn't really used
 *
 * @type {number} seconds
 */
const memoizedCacheMaxAge = ((): number => {
  const oneHour = 3600;
  const oneMinute = 60;

  if (process.env.NEXT_PUBLIC_APP_STAGE === 'production') {
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
 *
 * We made the opinionated choice to only use one namespace for the whole app, because we don't see the need for a more complex setup at this point
 * Feel free to change this behaviour and use several namespaces, if necessary
 *
 * XXX Must be manually created in Locize's project before being usable
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
  projectId: process.env.NEXT_PUBLIC_LOCIZE_PROJECT_ID || undefined,
  // XXX The API key must only be used on non-production environments (allows to use saveMissing features when working on the app)
  //  It must never be shared with the production environment, as it could incur costs and also could be used by attackers to make undesired changes to your app
  //  We strongly recommend to restrain the scope of your API keys so that those you use to work on the app locally cannot be used to change the production translation (in case they get leaked)
  apiKey: process.env.NEXT_PUBLIC_APP_STAGE === 'production' ? null : process.env.LOCIZE_API_KEY,
  // XXX On production, we use a dedicated production version
  //  You may want to use fixed versions instead (e.g: 1.0.0, etc.), it depends on your workflow really
  version: process.env.NEXT_PUBLIC_APP_STAGE === 'production' ? 'production' : 'latest',
  referenceLng: 'fr', // Language of reference, used to define the default translations
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
  // XXX The "build" parameter is meant to automatically invalidate the browser cache when releasing a different version,
  //  so that the end-users get the newest version immediately
  loadPath: `https://api.locize.app/{{projectId}}/{{version}}/{{lng}}/{{ns}}?build=${process.env.NEXT_PUBLIC_APP_BUILD_TIMESTAMP}`,
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
    return process.env.NEXT_PUBLIC_APP_STAGE !== 'production'; // We allow any of our development or staging instance to update missing keys
  },
};

/**
 * Builds Locize API endpoint based on the desired lang and namespace
 *
 * @param lang
 * @param namespace
 */
export const buildLocizeAPIEndpoint = (lang: string, namespace: string = defaultNamespace): string => {
  return locizeBackendOptions
    .loadPath
    .replace('{{projectId}}', locizeBackendOptions.projectId)
    .replace('{{version}}', locizeBackendOptions.version)
    .replace('{{lng}}', lang)
    .replace('{{ns}}', namespace);
};

/**
 * Fetches the translations that are shared amongst all customers.
 *
 * Used as base translations, which can be overridden using translations variation.
 *
 * @param lang
 */
export const fetchBaseTranslations = async (lang: string): Promise<I18nextResources> => {
  const locizeAPIEndpoint: string = buildLocizeAPIEndpoint(lang);
  let i18nTranslations: I18nextResources = {};

  try {
    // Manually fetching locales from Locize API, for the "common" namespace of the current language
    // XXX We fetch manually from Locize, because if we use the i18next "preload" feature, it'll crash with Next (no serverless support)
    logger.info(`Pre-fetching translations from ${locizeAPIEndpoint}`);
    const defaultI18nTranslationsResponse: Response = await fetch(locizeAPIEndpoint);

    try {
      i18nTranslations = await defaultI18nTranslationsResponse.json();
    } catch (e) {
      logger.error(e.message, `Failed to extract JSON data from locize API response for "${lang}"`);
      Sentry.captureException(e);
    }
  } catch (e) {
    logger.error(e.message, `Failed to fetch data from locize API for "${lang}"`);
    Sentry.captureException(e);
  }

  return i18nTranslations;
};

/**
 * Fetches the translations that are specific to the customer (its own translations variation)
 *
 * @param lang
 */
export const fetchCustomerVariationTranslations = async (lang: string): Promise<I18nextResources> => {
  const customerVariationLang = resolveCustomerVariationLang(lang);
  const customerVariationLocizeAPIEndpoint: string = buildLocizeAPIEndpoint(customerVariationLang);
  let customerVariationI18nTranslations: I18nextResources = {};

  try {
    // Manually fetching locales from Locize API, for the "common" namespace of the customer language variation
    // XXX We fetch manually from Locize, because if we use the i18next "preload" feature, it'll crash with Next (no serverless support)
    logger.info(`Pre-fetching "${customerVariationLang}" translations variation from ${customerVariationLocizeAPIEndpoint}`);
    const customerVariationI18nTranslationsResponse: Response = await fetch(customerVariationLocizeAPIEndpoint);

    try {
      customerVariationI18nTranslations = await customerVariationI18nTranslationsResponse.json();
    } catch (e) {
      logger.error(e.message, `Failed to extract JSON data from locize API response for "${customerVariationLang}"`);
      Sentry.captureException(e);
    }
  } catch (e) {
    logger.error(e.message, `Failed to fetch data from locize API for "${customerVariationLang}"`);
    Sentry.captureException(e);
  }

  return customerVariationI18nTranslations;
};

/**
 * Fetch translations from Locize API (both base translations + translations that are specific to the customer)
 *
 * We use a "common" namespace that contains all our translations
 * It's easier to manage, as we don't need to split translations under multiple files (we don't have so many translations)
 * (that may be a bit more optimized to split them under different namespaces, but that feels like anticipated optimization that isn't needed atm)
 *
 * We don't use the Locize backend for fetching data, because it doesn't play well with Next framework (no serverless support)
 * @see https://github.com/isaachinman/next-i18next/issues/274
 *
 * Instead, we manually fetch (pre-fetch) the translations ourselves from getServerSideProps/getStaticProps (or getInitialProps)
 * @see https://github.com/i18next/i18next/issues/1373
 *
 * XXX Make sure you don't use "auto" publish format, but either "nested" or "flat", to avoid the format to dynamically change (We use "nested")
 * @see https://faq.locize.com/#/general-questions/why-is-my-namespace-suddenly-a-flat-json
 *
 * XXX Caching is quite complicated, because the caching strategy depends on the runtime engine (browser vs server), the stage (development, staging, production) and the rendering mode (SSG, SSR)
 * For instance, we don't want to cache in development/staging, but we do for production in order to improve performances and decrease network usage (when using SSR)
 * When using SSG, caching doesn't matter because the pre-fetch is performed during the initial build (build time) and never at run time, so we don't need a caching mechanism
 *
 * Also, we want to invalidate the cache as soon as a new version is deployed, so that the end-users get the latest version immediately
 * (and avoid missing translations because we'd be using a cached version)
 * @see https://github.com/i18next/i18next/issues/1373
 *
 * Explanation about our cache implementation:
 *  - Browser:
 *    * In-memory: Once the translations are fetched from Locize, they're memoized
 *      - Development/staging stages:
 *        - It's very useful in development/staging, where we don't have any browser caching enabled, because it'll reduce the API calls
 *          With this in-memory cache, the Locize API will be hit only once by the browser, and then the in-memory cache will take over when performing client-side navigation
 *        - The in-memory cache will be invalidated as soon as the page is refreshed (F5, cmd+r, etc.) and a new API call will be made
 *        - XXX Without in-memory cache, a new API call would be sent for each page transition, which is slower, costly and not necessary
 *    * Browser's local cache:
 *      - Development/staging stages:
 *        - The browser's local cache is completely disabled in development/staging, so that we may work/test with the latest translation
 *          See the official recommendations https://docs.locize.com/more/caching
 *      - Production stage:
 *        - When in production, the browser will also cache for 1h, because we configured a "Cache-control: Max-Age" at https://www.locize.app/p/w7jrmdie/settings
 *          We followed the official recommendations https://docs.locize.com/more/caching
 *          1h seems to be a good compromise between over-fetching (we don't expect our users to use the app for more than 1h straight)
 *          and applying translation "hot-fix" (worst case: "hot-fix"" be applied 1h later, which is acceptable)
 *          XXX SSG pages won't be affected by changes made in Locize once the app is built. A rebuild will be necessary to update the translations
 *        - The browser's local cache will be invalidated as soon as a new release of the app is deployed,
 *          because the value of "build" in the "loadPath" url will change and thus the browser will not use its cached version anymore
 *  - Server (XXX this affects SSR pages in particular, as mentioned above):
 *    * In-memory: Once the translations are fetched from Locize, they're memoized
 *      - Development:
 *        - Once the translations are memoized, they'll be kept in-memory until the server restarts
 *          Note that full page reload may clear the cache if max-age is reached
 *      - Staging/production:
 *        - Once the translations are memoized, they'll be kept in-memory until... God knows what.
 *          - It's very hard to know how/when the memoized cache will be invalidated, as it's very much related to AWS Lambda lifecycle, which can be quite surprising
 *          - It will likely be invalidated within 5-15mn if there aren't any request performed against the Lambda (when nobody is using the app)
 *          - But if there is a steady usage of the app then it could be memoized for hours/days
 *          - If there is a burst usage, then new lambdas will be triggered, with their own version of the memoized cache
 *            (thus, depending on which Lambda serves the requests, the result could be different if they don't use the same memoized cache)
 *            This could be the most surprising, as you don't know which Lambda will serve you, so you may see a different content by refreshing the page
 *            (especially when browser cache is disabled, like when using the browser in Anonymous mode)
 *        - To sum up: The memoized cache will be invalidated when the server restarts
 *          - When a new release is deployed (this ensures that a new deployment invalidates the cache for all running Lambda instances at once)
 *          - When a Lambda that serves the app is started
 *        - The in-memory cache is automatically invalidated after 1h (see memoizedCacheMaxAge). Thus ensuring that all Lambdas will be in-sync every hour or so,
 *          even when hot-fixes are deployed on Locize
 *    * Server's local cache:
 *      - Development:
 *        - There is no known server-side caching abilities while in development, and we already rely on our in-memory cache while in development
 *      - Staging/production:
 *        - We could use on-disk caching mechanism during build, but it's not necessary because our in-memory cache is less complicated and doesn't require a writable file system
 *
 * @param {string} lang
 * @return {Promise<string>}
 */
export const fetchTranslations = async (lang: string): Promise<I18nextResources> => {
  const cacheIndexKey: string = buildLocizeAPIEndpoint(lang); // Also used as cache index key (memoization)
  const memoizedI18nextResources: MemoizedI18nextResources = get(_memoizedI18nextResources, cacheIndexKey, null);

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
  const i18nBaseTranslations: I18nextResources = await fetchBaseTranslations(lang);
  const customerVariationI18nTranslations: I18nextResources = await fetchCustomerVariationTranslations(lang);
  const i18nTranslations: I18nextResources = deepmerge(i18nBaseTranslations, customerVariationI18nTranslations);

  const i18nextResources: I18nextResources = {
    [lang]: {
      [defaultNamespace]: i18nTranslations,
    },
  };
  logger.info('Translations were resolved from Locize API and are now being memoized for subsequent calls');

  _memoizedI18nextResources[cacheIndexKey] = {
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
 * - Initialized with pre-defined "lang"
 * - Initialized with pre-fetched "i18nTranslations"
 * - Automates the creation of missing translations using "saveMissing: true", when working locally
 * - Display Locize "in-context" Editor when appending "/?locize=true" to the url (e.g http://localhost:8888/?locize=true) in non-production stages
 * - Automatically "touches" translations so it's easier to know when they've been used for the last time (when working locally),
 *    thus helping translators figure out which translations are not used anymore so they can delete them
 *
 * XXX We don't rely on https://github.com/i18next/i18next-browser-languageDetector because we have our own way of resolving the language to use (in getStaticProps/getServerSideProps)
 *
 * @param lang
 * @param i18nTranslations
 */
const createI18nextLocizeInstance = (lang: string, i18nTranslations: I18nextResources): i18n => {
  // If NEXT_PUBLIC_LOCIZE_PROJECT_ID is not defined then we mustn't init i18next or it'll crash the whole app when running in non-production stage
  // In that case, better crash early with an explicit message
  if (!process.env.NEXT_PUBLIC_LOCIZE_PROJECT_ID) {
    throw new Error('Env var "NEXT_PUBLIC_LOCIZE_PROJECT_ID" is not defined. Please add it to you .env.build file (development) or now*.json (staging/production)');
  }

  // Plugins will be dynamically added at runtime, depending on the runtime engine (node or browser)
  const plugins = [ // XXX Only plugins that are common to all runtimes should be defined by default
    initReactI18next, // passes i18next down to react-i18next
    i18nextLocizeBackend, // loads translations, saves new keys to it (when saveMissing: true) - https://github.com/locize/i18next-locize-backend
  ];
  logger.info(`Using "react-i18next" plugin`);
  logger.info(`Using "i18next-locize-backend" plugin`);

  // Dynamically load different modules depending on whether we're running node or browser engine
  if (!isBrowser()) {
    // XXX Use "__non_webpack_require__" on the server
    // Sets a timestamp of last access on every translation segment on locize
    // -> Helps to safely remove the ones not being touched for weeks/months
    // N.B: It doesn't delete anything on its own, it just a helper to help you know when a translation was last used
    // XXX We only enable this server side because it's only used in development and there is no point increasing the browser bundle size
    // https://github.com/locize/locize-node-lastused
    const locizeNodeLastUsed = __non_webpack_require__('locize-lastused/cjs');
    plugins.push(locizeNodeLastUsed);
    logger.info(`Using "locize-lastused" plugin`);

  } else {
    // XXX Use "require" on the browser, always take the "default" export specifically
    // InContext Editor of locize ?locize=true to show it
    // https://github.com/locize/locize-editor
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const locizeEditor = require('locize-editor').default;
    plugins.push(locizeEditor);
    logger.info(`Using "locize-editor" plugin`);
  }

  const i18nInstance = i18next;
  logger.info(`Using ${plugins.length} plugins in total`);
  map(plugins, (plugin) => i18nInstance.use(plugin));
  // @ts-ignore
  i18nInstance.init({ // XXX See https://www.i18next.com/overview/configuration-options
    resources: i18nTranslations,
    // preload: ['fr', 'en'], // XXX Supposed to preload languages, doesn't work with Next
    cleanCode: true, // language will be lowercased 'EN' --> 'en' while leaving full locales like 'en-US'
    debug: process.env.NEXT_PUBLIC_APP_STAGE !== 'production' && isBrowser(), // Only enable on non-production stages and only on browser (too much noise on server) XXX Note that missing keys will be created on the server first, so you should enable server logs if you need to debug "saveMissing" feature
    saveMissing: process.env.NEXT_PUBLIC_APP_STAGE === 'development', // Only save missing translations on development environment, to avoid outdated keys to be created from older staging deployments
    saveMissingTo: defaultNamespace,
    lng: lang, // XXX We don't use the built-in i18next-browser-languageDetector because we have our own way of detecting language
    fallbackLng: resolveFallbackLanguage(lang),
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
 * This prevents the client from reinitializing between page transitions, which caused infinite loop rendering.
 *
 * @param lang
 * @param i18nTranslations
 */
const i18nextLocize = (lang: string, i18nTranslations: I18nextResources): i18n => {
  // If the singleton isn't init yet, or if the requested language is different from the singleton, then we create a new instance
  if (!globalI18nextInstance || lang !== get(globalI18nextInstance, 'language', lang)) {
    globalI18nextInstance = createI18nextLocizeInstance(lang, i18nTranslations);

    return globalI18nextInstance;
  } else {
    return globalI18nextInstance;
  }
};

export default i18nextLocize;

