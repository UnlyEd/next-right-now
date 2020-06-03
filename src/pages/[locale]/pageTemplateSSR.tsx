/** @jsx jsx */
import { jsx } from '@emotion/core';
import { createLogger } from '@unly/utils-simple-logger';
import { GetServerSideProps, NextPage } from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';

import DefaultLayout from '../../components/pageLayouts/DefaultLayout';
import { OnlyBrowserPageProps } from '../../types/pageProps/OnlyBrowserPageProps';
import { SSGPageProps } from '../../types/pageProps/SSGPageProps';
import { SSRPageProps } from '../../types/pageProps/SSRPageProps';
import { getExamplesCommonServerSideProps } from '../../utils/nextjs/SSR';

const fileLabel = 'pages/[locale]/pageTemplateSSR';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  label: fileLabel,
});

/**
 * Props that are only available for this page
 */
type CustomPageProps = {}

type GetServerSidePageProps = CustomPageProps & SSRPageProps

/**
 * XXX You should fetch everything you need in one single query, for performance reasons.
 *  It fetches customer data by default (through LAYOUT_QUERY), because those data are needed on all pages (displayed in footer/nav header).
 *
 * @param context
 */
// @ts-ignore
export const getServerSideProps: GetServerSideProps<GetServerSidePageProps> = getExamplesCommonServerSideProps;

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
  const { customer } = props;

  return (
    <DefaultLayout
      {...props}
      pageName={'products'}
      headProps={{
        title: `Page template SSR - Next Right Now`,
      }}
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

export default (PageTemplateSSR);
