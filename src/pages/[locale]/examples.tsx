/** @jsx jsx */
import { jsx } from '@emotion/core';
import * as Sentry from '@sentry/node';
import { createLogger } from '@unly/utils-simple-logger';
import { ApolloQueryResult } from 'apollo-client';
import deepmerge from 'deepmerge';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Alert, Container } from 'reactstrap';
import uuid from 'uuid/v1';
import Products from '../../components/data/Products';
import DefaultLayout from '../../components/pageLayouts/DefaultLayout';

import DisplayOnBrowserMount from '../../components/rehydration/DisplayOnBrowserMount';
import { EXAMPLES_PAGE_QUERY } from '../../gql/pages/examples';
import withApollo from '../../hocs/withApollo';
import { Product } from '../../types/data/Product';
import { StaticParams } from '../../types/nextjs/StaticParams';
import { StaticPropsInput } from '../../types/nextjs/StaticPropsInput';
import { StaticPropsOutput } from '../../types/nextjs/StaticPropsOutput';
import { OnlyBrowserPageProps } from '../../types/pageProps/OnlyBrowserPageProps';
import { SSGPageProps } from '../../types/pageProps/SSGPageProps';
import { createApolloClient } from '../../utils/gql/graphql';
import { getCommonStaticPaths, getCommonStaticProps } from '../../utils/nextjs/SSG';

const fileLabel = 'pages/examples';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  label: fileLabel,
});

/**
 * Only executed on the server side at build time.
 *
 * Note that when a page uses "getStaticProps", then "_app:getInitialProps" is executed (if defined) but not actually used by the page,
 * only the results from getStaticProps are actually injected into the page (as "SSGPageProps").
 *
 * @return Props (as "SSGPageProps") that will be passed to the Page component, as props
 *
 * @see https://github.com/zeit/next.js/discussions/10949#discussioncomment-6884
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 */
export const getStaticProps: GetStaticProps<SSGPageProps, StaticParams> = async (props: StaticPropsInput): Promise<StaticPropsOutput> => {
  const commonStaticProps = await getCommonStaticProps(props);
  const { customerRef, gcmsLocales } = commonStaticProps.props;

  const apolloClient = createApolloClient();
  const variables = {
    customerRef,
  };
  const queryOptions = {
    displayName: 'EXAMPLES_PAGE_QUERY',
    query: EXAMPLES_PAGE_QUERY,
    variables,
    context: {
      headers: {
        'gcms-locale': gcmsLocales,
      },
    },
  };

  const {
    data,
    errors,
    loading,
    networkStatus,
    stale,
  }: ApolloQueryResult<{
    products: Product[];
  }> = await apolloClient.query(queryOptions);

  if (errors) {
    console.error(errors);
    throw new Error('Errors were detected in GraphQL query.');
  }

  const {
    products,
  } = data || {}; // XXX Use empty object as fallback, to avoid app crash when destructuring, if no data is returned

  return deepmerge(commonStaticProps, {
    props: {
      products, // XXX What's the best way to store page-specific variables coming from props? with "customer" it was different because it's injected in all pages
    },
  });
};

/**
 * Only executed on the server side at build time
 * Necessary when a page has dynamic routes and uses "getStaticProps"
 */
export const getStaticPaths: GetStaticPaths<StaticParams> = getCommonStaticPaths;

/**
 * SSG pages are first rendered by the server (during static bundling)
 * Then, they're rendered by the client, and gain additional props (defined in OnlyBrowserPageProps)
 * Because this last case is the most common (server bundle only happens during development stage), we consider it a default
 * To represent this behaviour, we use the native Partial TS keyword to make all OnlyBrowserPageProps optional
 *
 * Beware props in OnlyBrowserPageProps are not available on the server
 */
type Props = {
  products: Product[];
} & SSGPageProps<Partial<OnlyBrowserPageProps>>;

const ExamplesPage: NextPage<Props> = (props): JSX.Element => {
  const { products } = props;
  const { t } = useTranslation();

  Sentry.addBreadcrumb({ // See https://docs.sentry.io/enriching-error-data/breadcrumbs
    category: fileLabel,
    message: `Rendering ${fileLabel}`,
    level: Sentry.Severity.Debug,
  });

  return (
    <DefaultLayout
      pageName={'examples'}
      headProps={{
        title: 'Examples - Next Right Now',
      }}
      {...props}
    >
      <Container
        className={'container-white'}
      >
        <h1>Examples</h1>

        <hr />

        <div>
          <h2 className={'pcolor'}>Analytics front-end examples</h2>

          Log event on&nbsp;
          <a
            href={'https://github.com/amplitude/react-amplitude#children'}
            target={'_blank'}
            rel={'noopener'}
          >
            link click
          </a>
          <br />
          <code>
            {`
              <a href="{'/examples'}" onClick={() => { logEvent('open-examples'); }}>Open</a>
            `}
          </code>
          <br />
          <br />

          Log event on&nbsp;
          <a
            href={'https://github.com/amplitude/react-amplitude#logonmount-props'}
            target={'_blank'}
            rel={'noopener'}
          >
            component mount
          </a> (once only)
          <br />
          <code>
            {`
              <LogOnMount eventType="page-displayed" />
            `}
          </code>
        </div>

        <hr />

        <div>
          <h2 className={'pcolor'}>GraphQL & GraphCMS universal examples</h2>
          <blockquote>Fetching products from GraphCMS API</blockquote>
          <div>
            The below products are fetched from GraphCMS API, using GraphQL and Apollo.<br />
            We don't do anything fancy with them, it's just a simple example of data fetching and displaying.<br />
            Note that the GraphQL API can be auto-completed on the IDE, that's quite useful. <br />
            We also split our <code>.gql</code> files into reusable fragments to avoid duplicating code.<br />
            We use a custom component <code>GraphCMSAsset</code> to display images.<br />
          </div>

          <Products
            products={products}
          />
        </div>

        <hr />

        <div>
          <h2 className={'pcolor'}>Monitoring universal examples</h2>

          Log runtime exception<br />
          <code>
            {`try{throw new Error('test')}catch(e){Sentry.captureException(e)}`}
          </code>
          <br />
          <br />

          Log message<br />
          <code>
            {`Sentry.captureMessage(warning, Sentry.Severity.Warning);`}
          </code>
          <br />
          <br />

          Severity examples<br />
          <code>Severity.Fatal</code>
          <code>Severity.Error</code>
          <code>Severity.Warning</code>
          <code>Severity.Log</code>
          <code>Severity.Info</code>
          <code>Severity.Debug</code>
          <code>Severity.Critical</code>
          <br />
          <br />

          <a
            href={'https://docs.sentry.io/enriching-error-data/breadcrumbs'}
            target={'_blank'}
            rel={'noopener'}
          >
            Breadcrumbs documentation
          </a><br />
          <code>
            {`Sentry.addBreadcrumb({category: fileLabel, message: 'Rendering'})`}
          </code>
        </div>

        <hr />

        <div>
          <h2 className={'pcolor'}>I18n universal examples <small>(using Locize 3rd party vendor)</small></h2>
          <Alert color={'info'}>
            <div>
              Each example shows the rendered version and its code snippet.<br />
              The goal is to showcase real-world examples to help you get started faster and give a wider overview of what's possible.<br />
              <a href={'https://react.i18next.com/'} target="blank" rel={'nofollow noreferrer'}>
                Check the official documentation
              </a>
            </div>
          </Alert>

          <Container>
            <div>
              {t('examples.i18n.simpleTranslation', 'Traduction simple')}<br />
              <code>{'{t(\'examples.i18n.simpleTranslation\', \'Traduction simple\')}'}</code>
            </div>
            <hr />

            <div>
              {t('examples.i18n.pluralTranslation', 'Traduction avec gestion du pluriel', { count: 1 })}<br />
              <code>{'{t(\'examples.i18n.pluralTranslation\', \'Traduction avec gestion du pluriel\', { count: 1 })}'}</code>
            </div>
            <div>
              {t('examples.i18n.pluralTranslation', 'Traduction avec gestion du pluriel', { count: 2 })}<br />
              <code>{'{t(\'examples.i18n.pluralTranslation\', \'Traduction avec gestion du pluriel\', { count: 2 })}'}</code>
            </div>
            <hr />

            <div>
              <DisplayOnBrowserMount>
                <Trans
                  i18nKey={'examples.i18n.dynamicTranslation'}
                >
                  Contenu dynamique : <b>{{ uuid: uuid() }}</b>
                </Trans>
                <br />
                <code>
                  {'<Trans\n' +
                  '  i18nKey="{\'examples.i18n.dynamicTranslation\'}"\n' +
                  '>\n' +
                  '  Contenu dynamique : <b>{{ uuid: uuid() }}</b>\n' +
                  '</Trans>'}
                </code>
              </DisplayOnBrowserMount>
            </div>
            <hr />

            <div>
              <Trans
                i18nKey={'examples.i18n.dynamicPluralTranslation'}
                count={1}
              >
                Nous avons trouvé {{ count: 1 }} solution pour vous.
              </Trans>
              <br />
              <code>
                {'<Trans\n' +
                '  i18nKey="{\'examples.i18n.dynamicPluralTranslation\'}"\n' +
                '  count="{1}"\n' +
                '>\n' +
                '  Nous avons trouvé {{ count: 1 }} solution pour vous.\n' +
                '</Trans>'}
              </code>
            </div>
            <hr />

            <div>
              <Trans
                i18nKey={'examples.i18n.dynamicPluralTranslation'}
                count={2}
              >
                Nous avons trouvé {{ count: 2 }} solution pour vous.
              </Trans>
              <br />
              <code>
                {'<Trans\n' +
                '  i18nKey="{\'examples.i18n.dynamicPluralTranslation\'}"\n' +
                '  count="{2}"\n' +
                '>\n' +
                '  Nous avons trouvé {{ count: 2 }} solution pour vous.\n' +
                '</Trans>'}
              </code>
            </div>
            <div>
              <h2>Image optimisation</h2>

              <div>
                Image from web:<br />
                <img
                  src={'https://upload.wikimedia.org/wikipedia/commons/3/3f/Fronalpstock_big.jpg'}
                  alt={'paysage'}
                  width={'800px'}
                  height={'600px'}
                />
              </div>

              <div>
                Image from /public:<br />
                <img
                  src={'/static/images/Fronalpstock_big.jpg'}
                  alt={'paysage'}
                  width={'800px'}
                  height={'600px'}
                />
              </div>
            </div>
          </Container>
        </div>


      </Container>
    </DefaultLayout>
  );
};

export default withApollo()(ExamplesPage);
