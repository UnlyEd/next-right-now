import { CommonServerSideParams } from '@/app/types/CommonServerSideParams';
import Code from '@/common/components/dataDisplay/Code';
import { OnlyBrowserPageProps } from '@/layouts/core/types/OnlyBrowserPageProps';
import { SSGPageProps } from '@/layouts/core/types/SSGPageProps';
import BuiltInUtilitiesSidebar from '@/layouts/demo/components/BuiltInUtilitiesSidebar';
import DemoLayout from '@/layouts/demo/components/DemoLayout';
import {
  getDemoLayoutStaticPaths,
  getDemoLayoutStaticProps,
} from '@/layouts/demo/demoLayoutSSG';
import { createLogger } from '@/modules/core/logging/logger';
import * as Sentry from '@sentry/nextjs';
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
  fileLabel,
});

/**
 * Only executed on the server side at build time
 * Necessary when a page has dynamic routes and uses "getStaticProps"
 */
export const getStaticPaths: GetStaticPaths<CommonServerSideParams> = getDemoLayoutStaticPaths();

/**
 * Only executed on the server side at build time.
 *
 * @return Props (as "SSGPageProps") that will be passed to the Page component, as props
 *
 * @see https://github.com/vercel/next.js/discussions/10949#discussioncomment-6884
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 */
export const getStaticProps: GetStaticProps<SSGPageProps, CommonServerSideParams> = getDemoLayoutStaticProps();

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

      <h2>
        Dynamic error catching on user event
      </h2>

      <Alert color={'info'}>
        Throws an error once the button is clicked, the error is caught by Sentry automatically.
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

      <br />

      <h2>
        Display report dialog when an error happens
      </h2>

      <Alert color={'info'}>
        Sentry default report dialog can be handy to get user feedback when something bad happens.<br />
        If people actually use it, that is.
      </Alert>

      <div>
        <Button
          onClick={() => {
            // @ts-ignore Works fine even though TS is warning, see https://github.com/getsentry/sentry-docs/issues/3720
            Sentry.showReportDialog();
          }}
        >
          This should show the Sentry report dialog.
        </Button>
      </div>

      <br />

      <h2>
        Play around with custom error messages
      </h2>

      <Alert color={'info'}>
        Generate your own errors dynamically!
      </Alert>

      <div>
        <Button
          onClick={() => {
            const errorMessage = prompt(`Type something, it'll be used as error message and reported into Sentry!`);
            throw new Error(errorMessage);
          }}
        >
          Create an error!
        </Button>
      </div>
    </DemoLayout>
  );
};

export default (InteractiveErrorPage);
