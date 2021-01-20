import { Cookies } from '@/modules/core/cookiesManager/types/Cookies';
import { UserSemiPersistentSession } from '@/modules/core/userSession/types/UserSemiPersistentSession';
import { PublicHeaders } from './PublicHeaders';

/**
 * Props only available on the server side, for all pages
 */
export type OnlyServerPageProps = {
  headers: PublicHeaders; // Headers made public to the client-side
  readonlyCookies: Cookies; // Cookies retrieved using https://www.npmjs.com/package/next-cookies - Aren't really readonly but don't provide any setter
  userSession: UserSemiPersistentSession; // User session (from server cookies)
};
