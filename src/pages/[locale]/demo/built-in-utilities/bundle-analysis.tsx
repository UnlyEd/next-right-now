import { CommonServerSideParams } from '@/app/types/CommonServerSideParams';
import Code from '@/common/components/dataDisplay/Code';
import { OnlyBrowserPageProps } from '@/layouts/base/types/OnlyBrowserPageProps';
import { SSGPageProps } from '@/layouts/base/types/SSGPageProps';
import BuiltInUtilitiesSidebar from '@/layouts/demo/components/BuiltInUtilitiesSidebar';
import DefaultLayout from '@/layouts/demo/components/ExamplesLayout';
import ExamplesPage from '@/layouts/demo/components/ExamplesPage';
import {
  getDemoStaticPaths,
  getDemoStaticProps,
} from '@/layouts/demo/demoSSG';
import { createLogger } from '@unly/utils-simple-logger';
import {
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';

const fileLabel = 'pages/[locale]/demo/built-in-utilities/bundle-analysis';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  label: fileLabel,
});

/**
 * Only executed on the server side at build time
 * Necessary when a page has dynamic routes and uses "getStaticProps"
 */
export const getStaticPaths: GetStaticPaths<CommonServerSideParams> = getDemoStaticPaths;

/**
 * Only executed on the server side at build time.
 *
 * @return Props (as "SSGPageProps") that will be passed to the Page component, as props
 *
 * @see https://github.com/vercel/next.js/discussions/10949#discussioncomment-6884
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 */
export const getStaticProps: GetStaticProps<SSGPageProps, CommonServerSideParams> = getDemoStaticProps;

/**
 * SSG pages are first rendered by the server (during static bundling)
 * Then, they're rendered by the client, and gain additional props (defined in OnlyBrowserPageProps)
 * Because this last case is the most common (server bundle only happens during development stage), we consider it a default
 * To represent this behaviour, we use the native Partial TS keyword to make all OnlyBrowserPageProps optional
 *
 * Beware props in OnlyBrowserPageProps are not available on the server
 */
type Props = {} & SSGPageProps<Partial<OnlyBrowserPageProps>>;

const AnalyseBundlePage: NextPage<Props> = (props): JSX.Element => {
  return (
    <DefaultLayout
      {...props}
      pageName={'bundle-analysis'}
      headProps={{
        seoTitle: 'Bundle analysis examples - Next Right Now',
      }}
      Sidebar={BuiltInUtilitiesSidebar}
    >
      <ExamplesPage>
        <h1 className={'pcolor'}>Bundle analysis examples</h1>

        <p>
          You're most likely concerned about how big your client-side bundle is, because it'll impact your end-users experience.<br />
          NRN provides a utility script, which will start the development server locally and open 2 browser tabs automatically.<br />
          One for the front-end bundle, and one for the back-end.
        </p>

        <Code
          text={`yarn analyse:bundle`}
        />

      </ExamplesPage>
    </DefaultLayout>
  );
};

export default (AnalyseBundlePage);
