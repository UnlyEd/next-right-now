import UniversalCookiesManager from '../../utils/cookies/UniversalCookiesManager';
import { UserSemiPersistentSession } from '../UserSemiPersistentSession';

/**
 * Props only available on the browser side, for all pages
 */
export type OnlyBrowserPageProps = {
  cookiesManager: UniversalCookiesManager;
  iframeReferrer: string;
  isInIframe: boolean;
  userSession: UserSemiPersistentSession; // User session (from browser cookies)
};
