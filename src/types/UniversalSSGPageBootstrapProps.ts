import { i18n } from 'i18next';
import { NextRouter } from 'next/router';

import UniversalCookiesManager from '../utils/UniversalCookiesManager';
import { Theme } from './data/Theme';
import { UniversalSSGPageProps } from './UniversalSSGPageProps';
import { UserSemiPersistentSession } from './UserSemiPersistentSession';

/**
 * Page props provided to pages using the PageLayout component
 *
 * @ts Extends UniversalSSGPageProps by default
 */
export declare type UniversalSSGPageBootstrapProps<E extends UniversalSSGPageProps = UniversalSSGPageProps> = {
  cookiesManager?: UniversalCookiesManager;
  i18nextInstance: i18n;
  iframeReferrer?: string; // Only available on the browser side
  isInIframe?: boolean; // Only available on the browser side
  router: NextRouter;
  theme: Theme;
  userSession?: UserSemiPersistentSession; // Only available on the browser side
} & E;
