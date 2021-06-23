/**
 * Event names.
 */
export enum AMPLITUDE_EVENTS {
  REPORT_WEB_VITALS = 'report-web-vitals', // When the Core Web Vitals report is sent automatically on any page load
  USER_CONSENT_MANUALLY_GIVEN = 'user-consent-manually-given', // When the user makes a manual choice regarding cookies consent
  OPEN_WHAT_IS_PRESET_DOC = 'open-what-is-preset-doc', // When the user clicks on "What is a preset?" link
  OPEN_SEE_ALL_PRESETS_DOC = 'open-see-all-presets-doc', // When the user clicks on "See all presets" link
  OPEN_GITHUB_DOC = 'open-github-doc', // When the user clicks on the NRN documentation link
  OPEN_GITHUB = 'open-github', // When the user clicks on the GitHub link
  OPEN_ADMIN_SITE = 'open-admin-site', // When the user clicks on the "Go to CMS" link
  ANALYTIC_BUTTON_TEST_EVENT = 'analytics-button-test-event', // Test event for demo purpose
  API_INVOKED = 'api-invoked', // When any API is invoked
  API_LOCALE_MIDDLEWARE_INVOKED = 'api-locale-middleware-invoked', // When the "localeMiddleware" API is invoked
}

/**
 * Event actions.
 *
 * We use an "action" property to track the event's trigger.
 * It's especially useful when the same event can be triggered by different actions,
 * as sometimes it's easier to keep a single event with different properties. (it really depends how you want to use the data)
 *
 * Best practice: All actions must use action verb (imperative form).
 * This is a NRN internal rule (recommandation) about how to track which action led to triggering the event.
 *
 * DA Usefulness: Avoids using anonymous constants that will likely end up being duplicated.
 *  Using constants ensures strict usage with a proper definition for the analytics team and the developers.
 *  Example: Using both "remove" and "delete" could lead to misunderstanding or errors when configuring charts.
 */
export enum AMPLITUDE_ACTIONS {
  CLICK = 'click', // When an element is clicked (mouse) or tapped (screen, mobile)
  SELECT = 'select', // When an element is selected (checkbox, select input, multi choices)
  REMOVE = 'remove', // When an element is removed/delete
  OPEN = 'open', // When an element is opened
  CLOSE = 'close', // When an element is closed
  AUTO = 'auto', // When an event is triggered automatically instead of a user action
}

/**
 * Pages names used within Amplitude.
 *
 * Each page within the /src/pages directory should use a different page name as "pageName".
 * This is used to track events happening within the pages, to know on which page they occurred.
 */
export enum AMPLITUDE_PAGES {
  DEMO_HOME_PAGE = 'demo',
  PREVIEW_PRODUCT_PAGE = 'demo/preview-product',
  TERMS_PAGE = 'demo/terms',
  PRIVACY_PAGE = 'demo/privacy',
  TEMPLATE_SSG_PAGE = 'template-ssg',
  TEMPLATE_SSR_PAGE = 'template-ssr',
}

/**
 * API endpoint names.
 *
 * Each API endpoint within the src/pages/api directory should use a different endpoint name.
 * This is used to track events happening within the API endpoints, to know on which endpoint they occurred.
 */
export enum AMPLITUDE_API_ENDPOINTS {
  STATUS = 'status',
  AUTO_REDIRECT_TO_LOCALISED_PAGE = 'autoRedirectToLocalisedPage',
  START_VERCEL_DEPLOYMENT = 'startVercelDeployment',
  ERROR = 'error',
  PREVIEW = 'preview',
  WEBHOOK_DEPLOYMENT_COMPLETED = 'deploymentCompleted',
}
