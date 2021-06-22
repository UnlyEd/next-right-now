/**
 * Event names.
 */
export enum AMPLITUDE_EVENTS {
  REPORT_WEB_VITALS = 'report-web-vitals',
  USER_CONSENT_MANUALLY_GIVEN = 'user-consent-manually-given',
  OPEN_WHAT_IS_PRESET_DOC = 'open-what-is-preset-doc',
  OPEN_SEE_ALL_PRESETS_DOC = 'open-see-all-presets-doc',
  OPEN_GITHUB_DOC = 'open-github-doc',
  OPEN_GITHUB = 'open-github',
  OPEN_ADMIN_SITE = 'open-admin-site',
  ANALYTIC_BUTTON_TEST_EVENT = 'analytics-button-test-event',
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
