import UniversalCookiesManager from '../utils/UniversalCookiesManager';
import { PageBootstrapProps } from './PageBootstrapProps';
import { UserSemiPersistentSession } from './UserSemiPersistentSession';

/**
 *
 */
export type BrowserPageBootstrapProps = {
  cookiesManager?: UniversalCookiesManager;
  iframeReferrer?: string; // Only available on the browser side
  isInIframe?: boolean; // Only available on the browser side
  userSession?: UserSemiPersistentSession; // Only available on the browser side
} & PageBootstrapProps;
