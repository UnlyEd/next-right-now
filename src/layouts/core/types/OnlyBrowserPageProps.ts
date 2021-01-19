import UniversalCookiesManager from '@/modules/core/cookiesManager/UniversalCookiesManager';
import { UserSemiPersistentSession } from '@/modules/core/userSession/types/UserSemiPersistentSession';

/**
 * Props only available on the browser side, for all pages
 */
export type OnlyBrowserPageProps = {
  cookiesManager: UniversalCookiesManager;
  iframeReferrer: string;
  isInIframe: boolean;
  userSession: UserSemiPersistentSession; // User session (from browser cookies)
};
