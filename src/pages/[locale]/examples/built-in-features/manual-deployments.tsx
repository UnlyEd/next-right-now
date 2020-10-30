import { createLogger } from '@unly/utils-simple-logger';
import {
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';
import { Alert } from 'reactstrap';

import BuiltInFeaturesSidebar from '../../../../components/doc/BuiltInFeaturesSidebar';
import DocPage from '../../../../components/doc/DocPage';
import DefaultLayout from '../../../../components/pageLayouts/DefaultLayout';
import Code from '../../../../components/utils/Code';
import { CommonServerSideParams } from '../../../../types/nextjs/CommonServerSideParams';
import { OnlyBrowserPageProps } from '../../../../types/pageProps/OnlyBrowserPageProps';
import { SSGPageProps } from '../../../../types/pageProps/SSGPageProps';
import {
  getExamplesCommonStaticPaths,
  getExamplesCommonStaticProps,
} from '../../../../utils/nextjs/SSG';

const fileLabel = 'pages/[locale]/examples/built-in-features/manual-deployments';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  label: fileLabel,
});

/**
 * Only executed on the server side at build time
 * Necessary when a page has dynamic routes and uses "getStaticProps"
 */
export const getStaticPaths: GetStaticPaths<CommonServerSideParams> = getExamplesCommonStaticPaths;

/**
 * Only executed on the server side at build time.
 *
 * @return Props (as "SSGPageProps") that will be passed to the Page component, as props
 *
 * @see https://github.com/vercel/next.js/discussions/10949#discussioncomment-6884
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 */
export const getStaticProps: GetStaticProps<SSGPageProps, CommonServerSideParams> = getExamplesCommonStaticProps;

/**
 * SSG pages are first rendered by the server (during static bundling)
 * Then, they're rendered by the client, and gain additional props (defined in OnlyBrowserPageProps)
 * Because this last case is the most common (server bundle only happens during development stage), we consider it a default
 * To represent this behaviour, we use the native Partial TS keyword to make all OnlyBrowserPageProps optional
 *
 * Beware props in OnlyBrowserPageProps are not available on the server
 */
type Props = {} & SSGPageProps<Partial<OnlyBrowserPageProps>>;

const ManualDeploymentsPage: NextPage<Props> = (props): JSX.Element => {
  return (
    <DefaultLayout
      {...props}
      pageName={'manual-deployments'}
      headProps={{
        title: 'Manual-deployments examples - Next Right Now',
      }}
      Sidebar={BuiltInFeaturesSidebar}
    >
      <DocPage>
        <h1 className={'pcolor'}>Manual-deployments examples, using the CLI</h1>

        <Alert color={'info'}>
          CI/CD is great, but sometimes you need to manually deploy stuff from your computer.<br />
          This happens especially when you need to deploy an old version of the software, or want to avoid CI/CD (it's faster).<br />
          <br />
          Also, they're necessary when you're running a MST app (Multiple Single Tenants), and want to deploy a specific tenant's app.<br />
          For example, we use it with MST to deploy our customers to production, CI/CD being configured to automatically deploy our own internal demo only.<br />
          <br />
          Eventually, there are many reasons manual deploys can be necessary. <br />
          We don't encourage you to use them as your default workflow, but it can be handy sometimes.
        </Alert>

        <p>
          Manual deployments are triggered through yarn/npm scripts.<br />
          We have one command for each customer (when running MST app) and for each stage (staging, production).<br />
          We also have helper commands meant to deploy all customers (per stage, etc.), similar to bulk actions.
        </p>

        <Code
          text={`
            yarn deploy # Alias to yarn deploy:customer1
            yarn deploy:customer1 # Deploy customer1 in staging
            yarn deploy:customer1:production # Deploy customer1 in production

            yarn deploy:customer2 # Deploy customer2 in staging
            yarn deploy:customer2:production # Deploy customer2 in production

            yarn deploy:customer1:all # Deploy customer1 to staging and then to production (bulk action)
            yarn deploy:all # Deploy all customers to staging (bulk action)
            yarn deploy:all:all # Deploy all customers to staging and then production (bulk action)
          `}
        />
        <br />

        <p>
          Those commands are meant to be manually executed on your computer, and will use your local files when doing so.<br />
        </p>

        <Alert color={'info'}>
          They're also used by CI/CD scripts. <br />
          Note that when deploying through CI/CD, the deployed customer depends on which file is targeted as symbolic link by the <code>now.json</code> file.<br />
          Changing the symbolic link, or "hardcoding" the file will change which customer gets deployed by default.<br />
          You can also change the way CI/CD works and deploy all your customers at once every time, but we preferred to deploy one customer in particular (our own internal demo) by default, as we judged it was less risky in case anything goes wrong.
        </Alert>
      </DocPage>
    </DefaultLayout>
  );
};

export default (ManualDeploymentsPage);
