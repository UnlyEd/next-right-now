import { AppContext } from 'next/app';
import { AppTreeType } from 'next/dist/next-server/lib/utils';

/**
 * Props that are provided to the _app:getInitialProps method
 *
 * Those props are provided by Next.js framework, and we have no control over it
 * XXX This isn't used at this time, it's only useful if you intend to use _app.getInitialProps
 */
export interface AppInitialProps extends AppContext {
  AppTree: AppTreeType;
}
