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
import ExternalLink from '../../../../components/utils/ExternalLink';
import { CommonServerSideParams } from '../../../../types/nextjs/CommonServerSideParams';
import { OnlyBrowserPageProps } from '../../../../types/pageProps/OnlyBrowserPageProps';
import { SSGPageProps } from '../../../../types/pageProps/SSGPageProps';
import {
  getExamplesCommonStaticPaths,
  getExamplesCommonStaticProps,
} from '../../../../utils/nextjs/SSG';

const fileLabel = 'pages/[locale]/examples/built-in-features/stages-and-secrets';
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

const StagesAndSecretsPage: NextPage<Props> = (props): JSX.Element => {
  return (
    <DefaultLayout
      {...props}
      pageName={'stages-and-secrets'}
      headProps={{
        title: 'Stages & secrets - Next Right Now',
      }}
      Sidebar={BuiltInFeaturesSidebar}
    >
      <DocPage>
        <h1 className={'pcolor'}>Stages & secrets, using the best of both Next.js and Vercel vendor</h1>

        <Alert color={'info'}>
          Next.js doesn't come with a built-in stages configuration. It doesn't know about the concept of "stage". <br />
          But it does help you about handling ENV vars, and Vercel helps about handling secrets.<br />
          It's a bit complex to get it right though, and that's where NRN comes in, to help you configure this and keep it simple.<br />
          <br />
          Secrets are
          <ExternalLink href={'https://vercel.com/docs/v2/build-step#environment-variables'}>securely stored</ExternalLink>
          on Vercel.<br />
        </Alert>

        <div>
          Our setup puts the best of Vercel and Next together, it works differently depending on the stage.<br />

          <ul>
            <li>
              <code>development</code>:
              All your secrets and env vars are configured in the <code>.env.build</code> file.<br />
              When you're working locally, you're working on one project at a time.<br />
              Thus, all the config is located in a single file.
            </li>
            <li>
              <code>staging</code> and <code>development</code> stages:
              Your env vars are configured in the <code>now.*.json</code> files, per customer and per stage.<br />
              Env vars are basically hardcoded in those files, while secrets are referenced there, but nobody can read their value.<br />
            </li>
          </ul>
          <br />
          Overall, we made it easy to use: Just hardcode your non-sensitive env vars in <code>now.*.json</code> and store your sensitive secrets on Vercel, that's it.
        </div>

        <Alert color={'warning'}>
          Beware about the <code>"environment variables"</code> term, which may mean something different whether you mean it locally, or on Vercel.<br />
          <br />
          Before, only <code>secrets</code> existed, but since <code>now@18</code> they've introduced the concept of <code>environment variables</code>.<br />
          It can be a bit hard to understand how the 2 should be used together.<br />
          Basically put, <code>secrets</code> are global and shared across all projects, while <code>env vars</code> are scoped by project.<br />
          <ExternalLink href={'https://github.com/vercel/now/discussions/4065'}>There are other differences</ExternalLink>, though.<br />
        </Alert>

        <Alert color={'info'}>
          This new "environment variable" feature made things more complicated to comprehend, in our opinion.<br />
          Therefore, we recommend to use the term <code>secrets</code> for everything that's securely stored on Vercel, and the term <code>environment variables</code> for everything that's not securely stored (git tracked, readable from code files).
        </Alert>

      </DocPage>
    </DefaultLayout>
  );
};

export default (StagesAndSecretsPage);
