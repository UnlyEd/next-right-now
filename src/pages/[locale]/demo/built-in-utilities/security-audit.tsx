import { CommonServerSideParams } from '@/app/types/CommonServerSideParams';
import Code from '@/common/components/dataDisplay/Code';
import { OnlyBrowserPageProps } from '@/layouts/core/types/OnlyBrowserPageProps';
import { SSGPageProps } from '@/layouts/core/types/SSGPageProps';
import BuiltInUtilitiesSidebar from '@/layouts/demo/components/BuiltInUtilitiesSidebar';
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

const fileLabel = 'pages/[locale]/demo/built-in-utilities/security-audit';
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

const SecurityAuditPage: NextPage<Props> = (props): JSX.Element => {
  return (
    <DemoLayout
      {...props}
      pageName={'security-audit'}
      headProps={{
        seoTitle: 'Security audit examples - Next Right Now',
      }}
      Sidebar={BuiltInUtilitiesSidebar}
    >
      <DemoPage>
        <h1 className={'pcolor'}>Security audit examples</h1>

        <p>
          Security is a big thing, and quite a complicated topic.<br />
          It's very hard to keep track of node packages, because there is no tool that tells you "This is a real security risk for you and your users". <br />
          What most tools tell you, is that a package as a security issue, and it's <i>up to you to define how critical it is</i>.<br />
          Even specialised tools like <b>Github alerts for vulnerable dependencies</b> or <b>Snyk</b> mostly generate tons of false-positive warnings that are mostly a big waste of time.<br />
        </p>

        <Alert color={'warning'}>
          This makes tracking security risks and issues a quite complicated topic, and we don't provide any good solution at the moment.<br />
        </Alert>

        <Code
          text={`
            yarn security:audit

            // Tons of noise...

            ┌───────────────┬──────────────────────────────────────────────────────────────┐
            │ low           │ Prototype Pollution                                          │
            ├───────────────┼──────────────────────────────────────────────────────────────┤
            │ Package       │ yargs-parser                                                 │
            ├───────────────┼──────────────────────────────────────────────────────────────┤
            │ Patched in    │ >=13.1.2 <14.0.0 || >=15.0.1 <16.0.0 || >=18.1.2             │
            ├───────────────┼──────────────────────────────────────────────────────────────┤
            │ Dependency of │ concurrently                                                 │
            ├───────────────┼──────────────────────────────────────────────────────────────┤
            │ Path          │ concurrently > yargs > yargs-parser                          │
            ├───────────────┼──────────────────────────────────────────────────────────────┤
            │ More info     │ https://www.npmjs.com/advisories/1500                        │
            └───────────────┴──────────────────────────────────────────────────────────────┘
            283 vulnerabilities found - Packages audited: 1874
            Severity: 283 Low
            error Command failed with exit code 2.
          `}
        />

        <p>
          At the time of writing, NRN comes with about 300 vulnerabilities of <code>Low</code> level.<br />
          That may sound like a lot, but you need to consider that most of those are due to small vulnerabilities that are only exploitable in a development environment.<br />
          The above warning, for example, is based on the <code>concurrently</code> package, which is only used during development, when running the app in debug mode.<br />
        </p>

        <Alert color={'info'}>
          What we recommend is to ignore <code>Low</code> level vulnerabilities, and rather focus on those that are more critical.<br />
          But even though, you'll notice most of them aren't real vulnerabilities. The real vulnerabilities are probably hidden behind all that noise.<br />
          <br />
          If you know of a better way to manage security in your app, don't hesitate to open a Github issue/discussion about it!
        </Alert>

      </DemoPage>
    </DemoLayout>
  );
};

export default (SecurityAuditPage);
