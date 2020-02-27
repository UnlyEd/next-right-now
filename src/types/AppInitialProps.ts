import { AppContext } from 'next/app';
import { AppTreeType } from 'next/dist/next-server/lib/utils';

/**
 * Props that are provided to the _app:getInitialProps method
 *
 * Those props are provided by Next.js framework, and we have no control over it
 */
export interface AppInitialProps extends AppContext {
  AppTree: AppTreeType;
}
