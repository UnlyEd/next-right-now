import { Cookies } from '../Cookies';
import { MultiversalPageProps } from './MultiversalPageProps';
import { PublicHeaders } from './PublicHeaders';
import { UserSemiPersistentSession } from '../UserSemiPersistentSession';

/**
 * Dynamic (server) properties returned by getInitialProps or getServerProps for server-side rendered pages (using SSR)
 */
export type UniversalSSRPageProps<E extends {} = {}> = {
  headers: PublicHeaders; // Headers made public to the client-side
  isServerRendering: boolean;
  readonlyCookies: Cookies; // Cookies retrieved using https://www.npmjs.com/package/next-cookies - Aren't really readonly but don't provide any setter
  userSession: UserSemiPersistentSession; // User session (cookies)
} & MultiversalPageProps & E;
