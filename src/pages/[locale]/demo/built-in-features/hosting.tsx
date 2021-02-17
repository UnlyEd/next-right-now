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

const fileLabel = 'pages/[locale]/demo/built-in-features/hosting';
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

const HostingPage: NextPage<Props> = (props): JSX.Element => {
  return (
    <DemoLayout
      {...props}
      pageName={'hosting'}
      headProps={{
        seoTitle: 'Hosting - Next Right Now',
      }}
      Sidebar={BuiltInFeaturesSidebar}
    >
      <DemoPage>
        <h1 className={'pcolor'}>Hosting, using Vercel vendor</h1>

        <Alert color={'info'}>
          Vercel is the company that made the Next.js framework.<br />
          Therefore, they made
          <ExternalLink href={'https://nextjs.org/docs/deployment#optimized-for-nextjs'} suffix={null}>some handy optimisations</ExternalLink>.<br />
          Not only deploying using Vercel is very easy, it also brings some enhancements out of the box, compared to different hosting vendors.
        </Alert>

        <div>
          Vercel is very great if you just want to play around and build a POC or demo.<br />
          It's also great for real business apps, but like any other vendor, it's up to you to check if they pricing fits your usage.
        </div>

        <br />

        <Alert color={'warning'}>
          We are a bit wary about recent changes and decisions made by the Vercel team, in particular regarding their 2020 April Pricing changes, and
          <ExternalLink href={'https://github.com/vercel/vercel/discussions/4029'} suffix={null}>we led a discussion about it</ExternalLink>.<br />
          <br />
          Currently, the most controversial decision they've made is about the 12-24 max serverless functions. <br />
          We suggest you
          <ExternalLink href={'https://github.com/vercel/vercel/discussions/4029#discussioncomment-8449'}>learn heavily about that</ExternalLink>
          if you're considering Vercel.
        </Alert>

      </DemoPage>
    </DemoLayout>
  );
};

export default HostingPage;
