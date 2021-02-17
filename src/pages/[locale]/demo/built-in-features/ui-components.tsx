import { CommonServerSideParams } from '@/app/types/CommonServerSideParams';
import Code from '@/common/components/dataDisplay/Code';
import ExternalLink from '@/common/components/dataDisplay/ExternalLink';
import Tooltip from '@/common/components/dataDisplay/Tooltip';
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
import {
  Alert,
  Button,
} from 'reactstrap';

const fileLabel = 'pages/[locale]/demo/built-in-features/ui-components';
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

const ExampleUIComponentsPage: NextPage<Props> = (props): JSX.Element => {
  return (
    <DemoLayout
      {...props}
      pageName={'ui-components'}
      headProps={{
        seoTitle: 'UI components examples - Next Right Now',
      }}
      Sidebar={BuiltInFeaturesSidebar}
    >
      <DemoPage>
        <h1 className={'pcolor'}>UI components examples, using Reactstrap and Bootstrap</h1>

        <Alert color={'info'}>
          <ExternalLink href={'https://reactstrap.github.io/'}>Reactstrap</ExternalLink>
          is based on
          <ExternalLink href={'https://getbootstrap.com/'} suffix={null}>Bootstrap 4</ExternalLink>.<br />
          <br />
          It wasn't an easy choice to decide which UI library to use, there are so many out there.<br />
          Eventually, we chose Bootstrap because it's very famous and seems more supported than its counterparts.<br />
          Also, it <ExternalLink href={'https://bundlephobia.com/result?p=reactstrap@8.4.1'}>relatively lightweight</ExternalLink> (~40kB).<br />
          Eventually, it really depends on what you want to use, and while NRN comes with built-in Reactstrap support, we encourage you to chose what fits your needs best.
        </Alert>

        <Alert color={'warning'}>
          We won't showcase Reactstrap usage here, because
          <ExternalLink href={'https://reactstrap.github.io/'}>the official website</ExternalLink>
          does it already (even though many things are missing, and examples could be better overall)...
        </Alert>

        <hr />

        <p>
          Below, we will showcase a few components built-in with NRN:
        </p>

        <h2>Tooltip</h2>

        <p>
          The native Reactstrap tooltip is disappointing. Not only it's hard to use, but it can also crash your whole app under particular circumstances.<br />
          To fix this, we built our own, which relies on <ExternalLink href={'https://github.com/react-component/tooltip'}><code>rc-tooltip</code></ExternalLink>.<br />
        </p>

        <p>
          Example:<br />
          <Tooltip
            overlay={<span>This is a tooltip</span>}
          >
            <Button>Hover/Click me</Button>
          </Tooltip>
        </p>
        <Code
          text={`
            <Tooltip
              overlay={<span>This is a tooltip</span>}
            >
              <Button>Hover/Click me</Button>
            </Tooltip>
          `}
        />

        <br />
        <br />

        <p>
          Example:<br />
          <Tooltip
            overlay={<span>This is a tooltip</span>}
            placement={'right'}
          >
            <Button>Hover/Click me</Button>
          </Tooltip>
        </p>
        <Code
          text={`
            <Tooltip
              overlay={<span>This is a tooltip</span>}
              placement={'right'}
            >
              <Button>Hover/Click me</Button>
            </Tooltip>
          `}
        />

      </DemoPage>
    </DemoLayout>
  );
};

export default ExampleUIComponentsPage;
