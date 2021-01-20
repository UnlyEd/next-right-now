/**
 * Represents the user consent
 * Mostly focused at cookies consent for analytics tracking ATM, but could be extended if needs be
 */
export type UserConsent = {
  isUserOptedOutOfAnalytics?: boolean; // Whether the user has been opted out from analytics tracking, whether it's the result of a manual action, or from app's default behaviour
  hasUserGivenAnyCookieConsent?: boolean; // Whether the isUserOptedOutOfAnalytics value comes from a manual choice (if not, then it's due to the app's default behaviour)
};
