import { CommonServerSideParams } from '@/app/types/CommonServerSideParams';
import ExternalLink from '@/common/components/dataDisplay/ExternalLink';
import { OnlyBrowserPageProps } from '@/layouts/core/types/OnlyBrowserPageProps';
import { SSGPageProps } from '@/layouts/core/types/SSGPageProps';
import BuiltInFeaturesSidebar from '@/layouts/demo/components/BuiltInFeaturesSidebar';
import DemoLayout from '@/layouts/demo/components/DemoLayout';
import DemoPage from '@/layouts/demo/components/DemoPage';
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
import { Alert } from 'reactstrap';

const fileLabel = 'pages/[locale]/demo/built-in-features/docs-site';
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

const DocsSiteExamplePage: NextPage<Props> = (props): JSX.Element => {
  return (
    <DemoLayout
      {...props}
      pageName={'docs-site'}
      headProps={{
        seoTitle: 'Docs site - Next Right Now',
      }}
      Sidebar={BuiltInFeaturesSidebar}
    >
      <DemoPage>
        <h1 className={'pcolor'}>Docs site, using GitHub Pages</h1>

        <Alert color={'info'}>
          GitHub Pages is a great and simple way to host documentation about your app.<br />
          Whether it's meant for internal or public use, you can use GitHub Pages to host your documentation.<br />
          Note that you'll need to secure access accordingly if it's meant for a private use only.
        </Alert>

        <div>
          <ExternalLink href={'https://unlyed.github.io/next-right-now/'}>NRN own documentation</ExternalLink>
          uses GitHub Pages.<br />
          We love the result, but it wasn't that easy to setup, to be honest.<br />
          <br />
          So, in order to help you get starter faster, we put together a very simple example, based on what we did for NRN own docs site.<br />
          We hope you love it.<br />
        </div>

        <br />

        <div>
          You can follow <ExternalLink href={'https://unlyed.github.io/next-right-now/contributing#installing-jekyll-locally'}>NRN own docs installation guide</ExternalLink> to configure and run your own local install of Jekyll.
        </div>

      </DemoPage>
    </DemoLayout>
  );
};

export default DocsSiteExamplePage;
