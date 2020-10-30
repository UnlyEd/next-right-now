import { createLogger } from '@unly/utils-simple-logger';
import {
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';

import DefaultLayout from '../../components/pageLayouts/DefaultLayout';
import { CommonServerSideParams } from '../../types/nextjs/CommonServerSideParams';
import { OnlyBrowserPageProps } from '../../types/pageProps/OnlyBrowserPageProps';
import { SSGPageProps } from '../../types/pageProps/SSGPageProps';
import {
  getCommonStaticPaths,
  getCommonStaticProps,
} from '../../utils/nextjs/SSG';

const fileLabel = 'pages/[locale]/pageTemplateSSG';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  label: fileLabel,
});

/**
 * Only executed on the server side at build time
 * Necessary when a page has dynamic routes and uses "getStaticProps"
 */
export const getStaticPaths: GetStaticPaths<CommonServerSideParams> = getCommonStaticPaths;

/**
 * Only executed on the server side at build time.
 *
 * @return Props (as "SSGPageProps") that will be passed to the Page component, as props
 *
 * @see https://github.com/vercel/next.js/discussions/10949#discussioncomment-6884
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 */
export const getStaticProps: GetStaticProps<SSGPageProps, CommonServerSideParams> = getCommonStaticProps;

/**
 * SSG pages are first rendered by the server (during static bundling)
 * Then, they're rendered by the client, and gain additional props (defined in OnlyBrowserPageProps)
 * Because this last case is the most common (server bundle only happens during development stage), we consider it a default
 * To represent this behaviour, we use the native Partial TS keyword to make all OnlyBrowserPageProps optional
 *
 * Beware props in OnlyBrowserPageProps are not available on the server
 */
type Props = {} & SSGPageProps<Partial<OnlyBrowserPageProps>>;

const PageTemplateSSG: NextPage<Props> = (props): JSX.Element => {
  const { customer: airtableCustomer } = props;
  const customer = airtableCustomer?.fields;

  return (
    <DefaultLayout
      {...props}
      pageName={'pageTemplateSSG'}
      headProps={{
        title: 'Page template SSG - Next Right Now',
      }}
    >
      <p>
        This page is a template meant to be duplicated to quickly get started with new Next.js <b>SSG pages</b>.<br />
        It gets common page properties from a default SSG build. Dynamic data (from Airtable) are accessible through <code>props.customer</code>.
      </p>
      <p>
        Customer label: {customer.label}
      </p>
    </DefaultLayout>
  );
};

export default (PageTemplateSSG);
