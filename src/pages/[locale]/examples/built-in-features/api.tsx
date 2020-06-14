/** @jsx jsx */
import { jsx } from '@emotion/core';
import { createLogger } from '@unly/utils-simple-logger';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';
import { Alert } from 'reactstrap';
import BuiltInFeaturesSidebar from '../../../../components/doc/BuiltInFeaturesSidebar';
import DocPage from '../../../../components/doc/DocPage';
import DefaultLayout from '../../../../components/pageLayouts/DefaultLayout';
import Code from '../../../../components/utils/Code';
import ExternalLink from '../../../../components/utils/ExternalLink';
import { CommonServerSideParams } from '../../../../types/nextjs/CommonServerSideParams';
import { OnlyBrowserPageProps } from '../../../../types/pageProps/OnlyBrowserPageProps';
import { SSGPageProps } from '../../../../types/pageProps/SSGPageProps';
import { getExamplesCommonStaticPaths, getExamplesCommonStaticProps } from '../../../../utils/nextjs/SSG';

const fileLabel = 'pages/[locale]/examples/built-in-features/api';
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

const ExampleApiPage: NextPage<Props> = (props): JSX.Element => {
  return (
    <DefaultLayout
      {...props}
      pageName={'api'}
      headProps={{
        title: 'API examples - Next Right Now',
      }}
      Sidebar={BuiltInFeaturesSidebar}
    >
      <DocPage>
        <h1 className={'pcolor'}>API examples, using Airtable vendor</h1>

        <Alert color={'info'}>
          We wrote a helper <code>fetchCustomer</code> that handles a lot of things.<br />
          It basically reconciliates all data that belongs to a customer and resolved nested deps. <br />
          It also handles i18n fields and resolves the best value to use based on the wanted locale and available translations.<br />
        </Alert>

        <Code
          text={`
            // Fetches all Airtable tables and returns a consolidated Customer object with all relations resolved
            // Relations are only resolved on the two first levels (to avoid circular dependencies)
            const customer: AirtableRecord<Customer> = await fetchCustomer(bestCountryCodes);
          `}
        />

        <br />

        <p>
          The above code is what we actually use in <code>getCommonStaticProps</code>, to fetch data that are shared by all SSG pages.
        </p>

        <hr />

        <Alert color={'info'}>
          We use a cache using disk storage during build time (for SSG pages), so that each page doesn't have to fetch the Airtable API.<br />
          This is very important when generating static pages, otherwise we end up making hundreds of API calls (3 calls per page, because we fetch 3 tables). <br />
          Storing cache in memory doesn't work, because each page generation is executed in different processes (or so) and don't share the same memory (RAM).<br />
          Creating files like this requires a writable disk,
          <ExternalLink href={'https://github.com/vercel/next.js/discussions/13765#discussioncomment-22703'} suffix={null}>which is the case with Vercel</ExternalLink>.
        </Alert>

        <Code
          text={`
            const customerRef = process.env.NEXT_PUBLIC_CUSTOMER_REF;
            const { records: airtableCustomers } = await hybridCache('CustomerTable', async () => await fetchAirtableTable<GenericListApiResponse<AirtableRecord<Customer>>>('Customer'), {
              enabled: !!process.env.IS_SERVER_INITIAL_BUILD && process.env.NODE_ENV !== 'development',
              storage: { type: 'disk', options: { filename: 'CustomerTable' } },
            });
          `}
        />

        <br />

        <p>
          The above code is part of what we actually use in <code>fetchCustomer</code>, to fetch data from all tables.
        </p>

      </DocPage>
    </DefaultLayout>
  );
};

export default (ExampleApiPage);
