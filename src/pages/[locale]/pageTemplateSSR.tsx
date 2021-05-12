import { CommonServerSideParams } from '@/app/types/CommonServerSideParams';
import { LAYOUT_QUERY } from '@/common/gql/layoutQuery';
import { OnlyBrowserPageProps } from '@/layouts/core/types/OnlyBrowserPageProps';
import { SSGPageProps } from '@/layouts/core/types/SSGPageProps';
import { SSRPageProps } from '@/layouts/core/types/SSRPageProps';
import DefaultLayout from '@/layouts/default/components/DefaultLayout';
import {
  getDefaultServerSideProps,
  GetDefaultServerSidePropsResults,
} from '@/layouts/default/defaultSSR';
import { AMPLITUDE_PAGES } from '@/modules/core/amplitude/amplitude';
import {
  APOLLO_STATE_PROP_NAME,
  getApolloState,
} from '@/modules/core/apollo/apolloClient';
import useCustomer from '@/modules/core/data/hooks/useCustomer';
import { Customer } from '@/modules/core/data/types/Customer';
import { createLogger } from '@/modules/core/logging/logger';
import serializeSafe from '@/modules/core/serializeSafe/serializeSafe';
import { ApolloQueryResult } from '@apollo/client';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import React from 'react';

const fileLabel = 'pages/[locale]/pageTemplateSSR';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  fileLabel,
});

/**
 * Props that are only available for this page
 */
type CustomPageProps = {
  [key: string]: any;
}

type GetServerSidePageProps = CustomPageProps & SSRPageProps

/**
 * Fetches all products and customer in one single GQL query
 *
 * XXX You should fetch everything you need in one single query, for performance reasons.
 *  It fetches all customer data by default, because those data are needed on all pages (displayed in footer/nav header).
 *
 * @param context
 */
export const getServerSideProps: GetServerSideProps<GetServerSidePageProps> = async (context: GetServerSidePropsContext<CommonServerSideParams>): Promise<GetServerSidePropsResult<GetServerSidePageProps>> => {
  const commonServerSideProps: GetServerSidePropsResult<Omit<GetDefaultServerSidePropsResults, 'serializedDataset'>> = await getDefaultServerSideProps(context);

  if ('props' in commonServerSideProps) {
    const {
      props: {
        apolloClient,
        layoutQueryOptions,
        ...pageData
      },
    } = commonServerSideProps;
    const queryOptions = { // Override query (keep existing variables and headers)
      ...layoutQueryOptions,
      displayName: 'LAYOUT_QUERY',
      query: LAYOUT_QUERY,
    };

    const {
      data,
      errors,
    }: ApolloQueryResult<{
      customer: Customer;
    }> = await apolloClient.query(queryOptions);

    if (errors) {
      // eslint-disable-next-line no-console
      console.error(errors);
      throw new Error('Errors were detected in GraphQL query.');
    }

    const {
      customer,
    } = data || {}; // XXX Use empty object as fallback, to avoid app crash when destructuring, if no data is returned
    const dataset = {
      customer,
    };

    return {
      // Props returned here will be available as page properties (pageProps)
      props: {
        ...pageData,
        [APOLLO_STATE_PROP_NAME]: getApolloState(apolloClient),
        serializedDataset: serializeSafe(dataset),
      },
    };
  } else {
    return commonServerSideProps;
  }
};

/**
 * SSR pages are first rendered by the server
 * Then, they're rendered by the client, and gain additional props (defined in OnlyBrowserPageProps)
 * Because this last case is the most common (server bundle only happens during development stage), we consider it a default
 * To represent this behaviour, we use the native Partial TS keyword to make all OnlyBrowserPageProps optional
 *
 * Beware props in OnlyBrowserPageProps are not available on the server
 */
type Props = CustomPageProps & (SSRPageProps & SSGPageProps<OnlyBrowserPageProps>);

const PageTemplateSSR: NextPage<Props> = (props): JSX.Element => {
  const customer: Customer = useCustomer();

  return (
    <DefaultLayout
      {...props}
      pageName={AMPLITUDE_PAGES.TEMPLATE_SSR_PAGE}
    >
      <p>
        This page is a template meant to be duplicated to quickly get started with new Next.js <b>SSR pages</b>.
        It gets common page properties from a default SSR build. Dynamic data (from GraphCMS) are accessible through <code>props.customer</code>.<br />
        In order to keep it simple, it fetches <code>LAYOUT_QUERY</code> GraphQL query, which contains the above customer data.<br />
        Unlike SSG (where you can perform multiple GQL queries without performance concerns because they are executed at build time), SSR should rather only run one GQL query to optimise round trips network calls.
      </p>
      <p>
        Customer label: {customer.label}
      </p>
    </DefaultLayout>
  );
};

export default PageTemplateSSR;
