import { CommonServerSideParams } from '@/app/types/CommonServerSideParams';
import { OnlyBrowserPageProps } from '@/layouts/core/types/OnlyBrowserPageProps';
import { SSGPageProps } from '@/layouts/core/types/SSGPageProps';
import PublicLayout from '@/layouts/public/components/PublicLayout';
import {
  getPublicLayoutStaticPaths,
  getPublicLayoutStaticProps,
} from '@/layouts/public/publicLayoutSSG';
import { AMPLITUDE_PAGES } from '@/modules/core/amplitude/events';
import useCustomer from '@/modules/core/data/hooks/useCustomer';
import { Customer } from '@/modules/core/data/types/Customer';
import { createLogger } from '@/modules/core/logging/logger';
import {
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from 'next';
import React from 'react';

const fileLabel = 'pages/[locale]/public/pagePublicTemplateSSG';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  fileLabel,
});

/**
 * Generates pages for all enabled languages.
 *
 * Only executed on the server side at build time.
 * Necessary when a page has dynamic routes and uses "getStaticProps".
 */
export const getStaticPaths: GetStaticPaths<CommonServerSideParams> = getPublicLayoutStaticPaths();

/**
 * Fetches mocked data.
 *
 * Only executed on the server side at build time.
 *
 * @return Props (as "SSGPageProps") that will be passed to the Page component, as props.
 *
 * @see https://github.com/vercel/next.js/discussions/10949#discussioncomment-6884
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 */
export const getStaticProps: GetStaticProps<SSGPageProps, CommonServerSideParams> = getPublicLayoutStaticProps();

/**
 * SSG pages are first rendered by the server (during static bundling).
 * Then, they're rendered by the client, and gain additional props (defined in OnlyBrowserPageProps).
 * Because this last case is the most common (server bundle only happens during development stage), we consider it a d.efault.
 * To represent this behaviour, we use the native Partial TS keyword to make all OnlyBrowserPageProps optional
 *
 * Beware props in OnlyBrowserPageProps are not available on the server.
 */
type Props = {} & SSGPageProps<Partial<OnlyBrowserPageProps>>;

const PagePublicTemplateSSG: NextPage<Props> = (props): JSX.Element => {
  const customer: Customer = useCustomer();

  return (
    <PublicLayout
      {...props}
      pageName={AMPLITUDE_PAGES.TEMPLATE_SSG_PAGE}
    >
      <p>
        This page is a template meant to be duplicated into "/pages", to quickly get started with new Next.js <b>SSG pages</b>.<br />
      </p>
    </PublicLayout>
  );
};

export default PagePublicTemplateSSG;
