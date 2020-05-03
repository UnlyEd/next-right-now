import { i18n } from 'i18next';
import { NextRouter } from 'next/router';
import UniversalCookiesManager from '../utils/UniversalCookiesManager';
import { StaticProps } from './StaticProps';
import { UserSemiPersistentSession } from './UserSemiPersistentSession';

/**
 * Page props provided to pages using the PageLayout component
 *
 * @ts Extends StaticProps by default
 */
export declare type LayoutPageProps<E extends StaticProps = StaticProps> = {
  cookiesManager: UniversalCookiesManager;
  i18nextInstance: i18n;
  isInIframe: boolean;
  router: NextRouter;
  userSession: UserSemiPersistentSession;
} & E;
