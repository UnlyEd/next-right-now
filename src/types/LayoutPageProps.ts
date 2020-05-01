import { StaticProps } from './StaticProps';
import { NextRouter } from 'next/router';

/**
 * Page props provided to pages using the Layout component
 *
 * @ts Extends StaticProps by default
 */
export declare type LayoutPageProps<E extends StaticProps = StaticProps> = {
  children: React.ReactElement;
  router: NextRouter;
} & E;
