import { CommonServerSideParams } from '@/app/types/CommonServerSideParams';
import { OnlyBrowserPageProps } from '@/layouts/core/types/OnlyBrowserPageProps';
import { SSGPageProps } from '@/layouts/core/types/SSGPageProps';
import { SSRPageProps } from '@/layouts/core/types/SSRPageProps';
import PublicLayout from '@/layouts/public/components/PublicLayout';
import {
  getPublicLayoutServerSideProps,
  GetPublicLayoutServerSidePropsResults,
} from '@/layouts/public/publicLayoutSSR';
import { AMPLITUDE_PAGES } from '@/modules/core/amplitude/events';
import useCustomer from '@/modules/core/data/hooks/useCustomer';
import { Customer } from '@/modules/core/data/types/Customer';
import { createLogger } from '@/modules/core/logging/logger';
import {
  GetServerSideProps,
  NextPage,
} from 'next';
import React from 'react';

const fileLabel = 'pages/[locale]/public/pagePublicTemplateSSR';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  fileLabel,
});

/**
 * Fetches mocked data.
 *
 * Only executed on the server side at build time.
 * Necessary when a page has dynamic routes and uses "getStaticProps".
 */
export const getServerSideProps: GetServerSideProps<GetPublicLayoutServerSidePropsResults, CommonServerSideParams> = getPublicLayoutServerSideProps();

/**
 * SSR pages are first rendered by the server
 * Then, they're rendered by the client, and gain additional props (defined in OnlyBrowserPageProps)
 * Because this last case is the most common (server bundle only happens during development stage), we consider it a default
 * To represent this behaviour, we use the native Partial TS keyword to make all OnlyBrowserPageProps optional
 *
 * Beware props in OnlyBrowserPageProps are not available on the server
 */
type Props = SSRPageProps & SSGPageProps<OnlyBrowserPageProps>;

const PagePublicTemplateSSR: NextPage<Props> = (props): JSX.Element => {
  const customer: Customer = useCustomer();

  return (
    <PublicLayout
      {...props}
      pageName={AMPLITUDE_PAGES.TEMPLATE_SSR_PAGE}
    >
      <p>
        This page is a template meant to be duplicated into "/pages", to quickly get started with new Next.js <b>SSR pages</b>.<br />
      </p>
    </PublicLayout>
  );
};

export default PagePublicTemplateSSR;
