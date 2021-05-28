import { CommonServerSideParams } from '@/app/types/CommonServerSideParams';
import { OnlyBrowserPageProps } from '@/layouts/core/types/OnlyBrowserPageProps';
import { SSGPageProps } from '@/layouts/core/types/SSGPageProps';
import PublicLayout from '@/layouts/public/components/PublicLayout';
import {
  getPublicLayoutStaticPaths,
  getPublicLayoutStaticProps,
} from '@/layouts/public/publicLayoutSSG';
import { AMPLITUDE_PAGES } from '@/modules/core/amplitude/amplitude';
import useCustomer from '@/modules/core/data/hooks/useCustomer';
import { Customer } from '@/modules/core/data/types/Customer';
import { createLogger } from '@/modules/core/logging/logger';
import {
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from 'next';
import React from 'react';

const fileLabel = 'pages/[locale]/public/index';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  fileLabel,
});

/**
 * Only executed on the server side at build time.
 * Necessary when a page has dynamic routes and uses "getStaticProps".
 */
export const getStaticPaths: GetStaticPaths<CommonServerSideParams> = getPublicLayoutStaticPaths;

/**
 * Only executed on the server side at build time.
 *
 * @return Props (as "SSGPageProps") that will be passed to the Page component, as props.
 *
 * @see https://github.com/vercel/next.js/discussions/10949#discussioncomment-6884
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 */
export const getStaticProps: GetStaticProps<SSGPageProps, CommonServerSideParams> = getPublicLayoutStaticProps;

/**
 * SSG pages are first rendered by the server (during static bundling).
 * Then, they're rendered by the client, and gain additional props (defined in OnlyBrowserPageProps).
 * Because this last case is the most common (server bundle only happens during development stage), we consider it a default.
 * To represent this behaviour, we use the native Partial TS keyword to make all OnlyBrowserPageProps optional.
 *
 * Beware props in OnlyBrowserPageProps are not available on the server.
 */
type Props = {} & SSGPageProps<Partial<OnlyBrowserPageProps>>;

/**
 * Example of a public page.
 */
const ExamplePublicPage: NextPage<Props> = (props): JSX.Element => {
  const customer: Customer = useCustomer();
  logger.info('customer', customer);

  return (
    <PublicLayout
      {...props}
      pageName={AMPLITUDE_PAGES.TEMPLATE_SSG_PAGE}
    >
      <p>
        This page was created using from <code>"/layouts/public/pagePublicTemplateSSG.tsx"</code>, which uses a completely different <b><code>layout</code></b>.<br />
        <br />
        This page uses the <code>"public"</code>
        <b>layout</b>, which comes "naked" (no nav/footer) and doesn't fetch any data. (data are mocked, and minimalist)
        <br />
        Other pages use the <code>"demo"</code> layout, which comes with its own data fetching, components, and inherent complexity.<br />
        <br />
        <br />
        If you want to use NRN as a <b>boilerplate</b> for your own project, <b>we recommend using the <code>public</code> layout</b>, because it's much simpler and doesn't rely on any particular data.<br />
        Usually, when I create a new project from NRN, I wipe the whole <code>"/layouts/demo"</code> folder, unless I want to keep it around for its documentation/examples.
        <br />
        <br />
      </p>
      <p>
        <span style={{ fontSize: 22 }}>The <code>customer</code> data are visible in the <b>browser logs</b>.</span>
      </p>
    </PublicLayout>
  );
};

export default ExamplePublicPage;
