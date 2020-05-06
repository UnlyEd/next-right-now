import { I18nextResources } from '../utils/i18nextLocize';
import { Cookies } from './Cookies';
import { Customer } from './data/Customer';
import { PublicHeaders } from './PublicHeaders';
import { UserSemiPersistentSession } from './UserSemiPersistentSession';

/**
 * Dynamic (server) properties returned by getInitialProps or getServerProps for server-side rendered pages (using SSR)
 */
export type UniversalSSRPageProps = {
  customer: Customer;
  customerRef: string;
  headers?: PublicHeaders; // SSR only - Headers made public to the client-side
  readonlyCookies?: Cookies; // SSR only - Cookies retrieved using https://www.npmjs.com/package/next-cookies - Aren't really readonly but don't provide any setter
  userSession?: UserSemiPersistentSession; // SSR only - User session (cookies)
  bestCountryCodes: string[];
  gcmsLocales: string;
  lang: string;
  locale: string;
  defaultLocales: I18nextResources;
  isSSRReadyToRender: boolean;
  isReadyToRender: boolean;
  statusCode?: number;
};
