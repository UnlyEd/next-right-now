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

const fileLabel = 'pages/[locale]/demo/built-in-features/monitoring';
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

const ExampleMonitoringPage: NextPage<Props> = (props): JSX.Element => {
  return (
    <DemoLayout
      {...props}
      pageName={'monitoring'}
      headProps={{
        seoTitle: 'Monitoring examples - Next Right Now',
      }}
      Sidebar={BuiltInFeaturesSidebar}
    >
      <DemoPage>
        <h1 className={'pcolor'}>Monitoring examples, using Sentry</h1>

        <Alert color={'info'}>
          Monitoring works universally, both on the browser and the server.<br />
          The errors and stacktrace will be slightly different.<br />
          Also, source maps support is built-in. Beware that it <b>doesn't work during development</b>.
        </Alert>

        <div>
          <p>
            Log runtime exception<br />
            <code>
              {`
            try {
              throw new Error('test');
            } catch(e) {
              Sentry.captureException(e);
            }
            `}
            </code>
          </p>

          <p>
            Log message<br />
            <code>
              {`
              Sentry.captureMessage(warning, Sentry.Severity.Warning);
            `}
            </code>
          </p>

          <p>
            <ExternalLink href={'https://docs.sentry.io/enriching-error-data/breadcrumbs'}>
              Breadcrumbs
            </ExternalLink>
            (tracing that is only used in case an error happens)
            <br />
            <code>
              {`Sentry.addBreadcrumb({category: fileLabel, message: 'Rendering'})`}
            </code>
          </p>
        </div>
      </DemoPage>
    </DemoLayout>
  );
};

export default (ExampleMonitoringPage);
