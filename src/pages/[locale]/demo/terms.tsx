import { CommonServerSideParams } from '@/app/types/CommonServerSideParams';
import { StaticPropsInput } from '@/app/types/StaticPropsInput';
import { TERMS_PAGE_QUERY } from '@/common/gql/pages/terms';
import LegalContent from '@/components/dataDisplay/LegalContent';
import { OnlyBrowserPageProps } from '@/layouts/core/types/OnlyBrowserPageProps';
import { SSGPageProps } from '@/layouts/core/types/SSGPageProps';
import DemoLayout from '@/layouts/demo/components/DemoLayout';
import {
  getDemoStaticPaths,
  getDemoStaticProps,
} from '@/layouts/demo/demoLayoutSSG';
import { AMPLITUDE_PAGES } from '@/modules/core/amplitude/amplitude';
import { initializeApollo } from '@/modules/core/apollo/apolloClient';
import useCustomer from '@/modules/core/data/hooks/useCustomer';
import { Customer } from '@/modules/core/data/types/Customer';
import { replaceAllOccurrences } from '@/modules/core/js/string';
import { createLogger } from '@/modules/core/logging/logger';
import serializeSafe from '@/modules/core/serializeSafe/serializeSafe';
import {
  ApolloClient,
  ApolloQueryResult,
  NormalizedCacheObject,
} from '@apollo/client';
import deepmerge from 'deepmerge';
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsResult,
  NextPage,
} from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';

const fileLabel = 'pages/[locale]/demo/terms';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  fileLabel,
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
export const getStaticProps: GetStaticProps<SSGPageProps, CommonServerSideParams> = async (props: StaticPropsInput): Promise<GetStaticPropsResult<SSGPageProps>> => {
  const demoStaticProps: GetStaticPropsResult<SSGPageProps> = await getDemoStaticProps(props);

  if ('props' in demoStaticProps) {
    const {
      customerRef,
      gcmsLocales,
    } = demoStaticProps.props;
    const apolloClient: ApolloClient<NormalizedCacheObject> = initializeApollo();
    const variables = {
      customerRef,
    };
    const queryOptions = {
      displayName: 'TERMS_PAGE_QUERY',
      query: TERMS_PAGE_QUERY,
      variables,
      context: {
        headers: {
          'gcms-locales': gcmsLocales,
        },
      },
    };

    const {
      data,
      errors,
      loading,
      networkStatus,
      ...rest
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

    const result = deepmerge(demoStaticProps, {
      props: {
        customer,
      },
    });

    result.props.serializedDataset = serializeSafe({
      customer: result.props.customer
    });

    return result;
  } else {
    return demoStaticProps;
  }
};

/**
 * SSG pages are first rendered by the server (during static bundling)
 * Then, they're rendered by the client, and gain additional props (defined in OnlyBrowserPageProps)
 * Because this last case is the most common (server bundle only happens during development stage), we consider it a default
 * To represent this behaviour, we use the native Partial TS keyword to make all OnlyBrowserPageProps optional
 *
 * Beware props in OnlyBrowserPageProps are not available on the server
 */
type Props = {} & SSGPageProps<Partial<OnlyBrowserPageProps>>;

/**
 * Terms page, that displays all legal-related information.
 *
 * Basically displays a bunch of markdown that's coming from the CMS.
 */
const TermsPage: NextPage<Props> = (props): JSX.Element => {
  const customer: Customer = useCustomer();
  console.log('customer', customer);
  const {
    termsDescription,
    serviceLabel,
  } = customer || {};

  // Replace dynamic values (like "{customerLabel}") by their actual value
  const terms = replaceAllOccurrences(termsDescription?.html, {
    serviceLabel: `**${serviceLabel}**`,
    customerLabel: `**${customer?.label}**`,
  });

  return (
    <DemoLayout
      {...props}
      pageName={AMPLITUDE_PAGES.TERMS_PAGE}
      headProps={{
        seoTitle: 'Terms - Next Right Now',
      }}
    >
      <LegalContent
        content={terms}
      />
    </DemoLayout>
  );
};

export default TermsPage;
