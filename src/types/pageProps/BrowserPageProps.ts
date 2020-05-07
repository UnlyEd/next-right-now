import UniversalCookiesManager from '../../utils/UniversalCookiesManager';
import { UserSemiPersistentSession } from '../UserSemiPersistentSession';

/**
 * Props only available on the browser side
 */
export type BrowserPageProps = {
  cookiesManager?: UniversalCookiesManager;
  iframeReferrer?: string;
  isInIframe?: boolean;
  userSession?: UserSemiPersistentSession;
};
