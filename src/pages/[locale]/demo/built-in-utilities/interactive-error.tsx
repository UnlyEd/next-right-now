import { CommonServerSideParams } from '@/app/types/CommonServerSideParams';
import Code from '@/common/components/dataDisplay/Code';
import { OnlyBrowserPageProps } from '@/layouts/core/types/OnlyBrowserPageProps';
import { SSGPageProps } from '@/layouts/core/types/SSGPageProps';
import BuiltInUtilitiesSidebar from '@/layouts/demo/components/BuiltInUtilitiesSidebar';
import DemoLayout from '@/layouts/demo/components/DemoLayout';
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
import React, { useState } from 'react';
import {
  Alert,
  Button,
} from 'reactstrap';

const fileLabel = 'pages/[locale]/demo/built-in-utilities/interactive-error';
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

const InteractiveErrorPage: NextPage<Props> = (props): JSX.Element => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <DemoLayout
      {...props}
      pageName={'interactive-error'}
      headProps={{
        seoTitle: 'Page 500 error example - Next Right Now',
      }}
      Sidebar={BuiltInUtilitiesSidebar}
    >
      <h1>
        Interactive error
      </h1>

      <Alert color={'info'}>
        This page throws an error once the button is clicked.
      </Alert>

      <div>
        <Button
          onClick={(): void => {
            setIsClicked(true);
            throw new Error('Page 500 error example');
          }}
        >
          Will it crash the whole app?
        </Button>
      </div>
      <br />

      {
        isClicked && (
          <Alert color={'success'}>
            The error was automatically caught and stacktrace has been sent to Sentry.<br />
            The end-user won't know a fatal error happened on the background (look at the browser console).<br />
            But you might want to manually catch those errors and display a proper contextual error message instead of doing nothing.
          </Alert>
        )
      }

      <Code
        text={`
          <Button
            onClick={(): void => {
              setIsClicked(true);
              throw new Error('Page 500 error example');
            }}
          >
            Will it crash the whole app?
          </Button>
        `}
      />
    </DemoLayout>
  );
};

export default (InteractiveErrorPage);
