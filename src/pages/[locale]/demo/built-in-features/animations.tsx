import { CommonServerSideParams } from '@/app/types/CommonServerSideParams';
import AnimatedLoader from '@/common/components/animations/AnimatedLoader';
import Code from '@/common/components/dataDisplay/Code';
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

const fileLabel = 'pages/[locale]/demo/built-in-features/animations';
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

const ExampleAnimationPage: NextPage<Props> = (props): JSX.Element => {
  return (
    <DemoLayout
      {...props}
      pageName={'animations'}
      headProps={{
        seoTitle: 'Animations examples - Next Right Now',
      }}
      Sidebar={BuiltInFeaturesSidebar}
    >
      <DemoPage>
        <h1 className={'pcolor'}>CSS animations examples, using Animate.css</h1>

        <p>
          We decided to use <ExternalLink href={'https://animate.style/'}>animate.css</ExternalLink> because it's very easy to get started with,
          <ExternalLink href={'https://bundlephobia.com/result?p=animate.css@4.1.0'}>and very lightweight</ExternalLink> too.
        </p>

        <AnimatedLoader />
        <br />
        <br />

        <Code
          text={`
            const AnimatedLoader = props => {
              return (
                <svg
                  viewBox="0 0 200 200"
                  style={{
                    width: '6%',
                    minWidth: 150,
                  }}
                  {...props}
                >
                  <circle
                    cx={100.112}
                    cy={139.165}
                    r={11.27}
                    fill={'#0028FF'}
                    // Look at the animate.css classes below, that's what performs the animation
                    className={'animate__animated animate__bounce animate__infinite animate__slower'}
                   />
                  <path d="M100.885 189.549c-21.767 0-40.771-17.789-40.771-38.12v-43.313h20.883v43.423c0 8.839 9.613 17.237 19.778 17.237 9.834 0 18.342-8.066 18.342-17.237v-43.423H140v43.423c.11 20.552-17.9 38.01-39.115 38.01z" />
                </svg>
              );
            };

            <AnimatedLoader />
          `}
        />

      </DemoPage>
    </DemoLayout>
  );
};

export default ExampleAnimationPage;
