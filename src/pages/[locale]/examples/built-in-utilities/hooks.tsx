import { css } from '@emotion/core';
import { createLogger } from '@unly/utils-simple-logger';
import {
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';
import { Alert } from 'reactstrap';

import BuiltInUtilitiesSidebar from '../../../../components/doc/BuiltInUtilitiesSidebar';
import DocPage from '../../../../components/doc/DocPage';
import DefaultLayout from '../../../../components/pageLayouts/DefaultLayout';
import Code from '../../../../components/utils/Code';
import ExternalLink from '../../../../components/utils/ExternalLink';
import { CommonServerSideParams } from '../../../../types/nextjs/CommonServerSideParams';
import { OnlyBrowserPageProps } from '../../../../types/pageProps/OnlyBrowserPageProps';
import { SSGPageProps } from '../../../../types/pageProps/SSGPageProps';
import {
  getExamplesCommonStaticPaths,
  getExamplesCommonStaticProps,
} from '../../../../utils/nextjs/SSG';

const fileLabel = 'pages/[locale]/examples/built-in-utilities/hooks';
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

const HooksPage: NextPage<Props> = (props): JSX.Element => {
  return (
    <DefaultLayout
      {...props}
      pageName={'hooks'}
      headProps={{
        title: 'Hooks examples - Next Right Now',
      }}
      Sidebar={BuiltInUtilitiesSidebar}
    >
      <DocPage>
        <h1 className={'pcolor'}>Hooks examples</h1>

        <Alert color={'info'}>
          A few hooks are provided as utilities:<br />
          <ul
            css={css`
              text-align: left;
            `}
          >
            <li>
              <code>useCustomer</code>: Hook to access Customer data (theme, etc.)
            </li>
            <li>
              <code>useHasMounted</code>: Hook to properly handle expected differences between server and browser rendering.<br />
              Helps to avoid "Text content did not match" warnings, during React rehydration.
            </li>
            <li>
              <code>useI18n</code>: Hook to access i18n/localisation data
            </li>
            <li>
              <code>usePreviewMode</code>: Hook to access the native Next.js preview mode data/status
            </li>
            <li>
              <code>useUserSession</code>: Hook to access the user session data
            </li>
          </ul>
        </Alert>

        <h2>useCustomer</h2>

        <p>
          Hook to access customer data<br />
          <br />
          The customer data are pre-fetched, either during SSR or SSG and are not meant to be fetched or modified by the app (they're kinda read-only)<br />
          Thus, it's fine to use React Context for this kind of usage.<br />
        </p>

        <Alert color={'warning'}>
          If you need to store data that are meant to be updated (e.g: through forms) then using React Context is a very bad idea!<br />
          If you don't know why, you should <ExternalLink href={'https://medium.com/swlh/recoil-another-react-state-management-library-97fc979a8d2b'}>read more about it</ExternalLink>.<br />
          <br />
          Long story short, React Context is better be used with data that doesn't mutate, like theme/localisation<br />
          If you need to handle a global state that changes over time, your should rather use a dedicated library <i>(opinionated: I'd probably use Recoil)</i>
        </Alert>

        <Code
          text={`
            const customer: Customer = useCustomer();
          `}
        />

        <hr />

        <h2>useHasMounted</h2>

        <p>
          This hook helps rendering content only when the component has mounted (client-side).<br />
          It's helpful when you want some part of your app to only render on the client.<br />
          <br />
          We strongly recommend reading
          <ExternalLink href={'https://joshwcomeau.com/react/the-perils-of-rehydration/#abstractions'}>The perils of rehydration</ExternalLink>
          to familiarise yourself with this.
        </p>

        <Code
          text={`
            const MyComponent: React.FunctionComponent<Props> = (props): JSX.Element => {
              const hasMounted = useHasMounted();
              if (!hasMounted) {
                // Returns null on server-side
                // Returns null on client-side, until the component has mounted
                return null;
              }

              // Do stuff that will be executed only on the client-side, after rehydration
              return (...)
            };

            export default MyComponent;
          `}
        />

        <hr />

        <h2>useI18n</h2>

        <p>
          This hook helps access i18n data in any functional component.
        </p>

        <Code
          text={`
            const { lang, locale }: I18n = useI18n();
          `}
        />

        <hr />

        <h2>usePreviewMode</h2>

        <p>
          This hook helps access Next.js native <ExternalLink href={'https://nextjs.org/docs/advanced-features/preview-mode'}>Preview Mode data/status</ExternalLink> in any functional component.
        </p>

        <Code
          text={`
            const { preview }: PreviewMode = usePreviewMode();
          `}
        />

        <hr />

        <h2>useUserSession</h2>

        <p>
          This hook helps access user data in any functional component.
        </p>

        <Code
          text={`
            const { deviceId }: UserSession = useUserSession();
          `}
        />

        <hr />

      </DocPage>
    </DefaultLayout>
  );
};

export default (HooksPage);
