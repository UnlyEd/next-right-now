/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { createLogger } from '@unly/utils-simple-logger';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Alert, Container } from 'reactstrap';
import uuid from 'uuid/v1';
import DocPage from '../../../../components/doc/DocPage';
import DefaultLayout from '../../../../components/pageLayouts/DefaultLayout';
import DisplayOnBrowserMount from '../../../../components/rehydration/DisplayOnBrowserMount';
import ExternalLink from '../../../../components/utils/ExternalLink';
import withApollo from '../../../../hocs/withApollo';
import { CommonServerSideParams } from '../../../../types/nextjs/CommonServerSideParams';
import { OnlyBrowserPageProps } from '../../../../types/pageProps/OnlyBrowserPageProps';
import { SSGPageProps } from '../../../../types/pageProps/SSGPageProps';
import { getExamplesCommonStaticPaths, getExamplesCommonStaticProps } from '../../../../utils/nextjs/SSG';
import BuiltInFeaturesSidebar from '../../../../components/doc/BuiltInFeaturesSidebar';

const fileLabel = 'pages/[locale]/examples/built-in-features/static-i18n';
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

const ExampleStaticI18nPage: NextPage<Props> = (props): JSX.Element => {
  const { t } = useTranslation();

  return (
    <DefaultLayout
      {...props}
      pageName={'static-i18n'}
      headProps={{
        title: 'Static i18n examples - Next Right Now',
      }}
      Sidebar={BuiltInFeaturesSidebar}
    >
      <DocPage>
        <h1 className={'pcolor'}>Static i18n examples, using i18next and Locize vendor</h1>

        <Alert color={'info'}>
          <code>i18n</code> refers to both <b>static content</b> and <b>dynamic content</b>, even though both are handled very differently.<br />
          <ExternalLink href={'https://unlyed.github.io/next-right-now/concepts/i18n.html'}>Read more about the concept</ExternalLink>
        </Alert>

        <Alert color={'warning'}>
          This section only showcases i18n for <b>static content</b> (nav, footer, etc.). <br />
          Dynamic content (DB records) is managed through <b>GraphCMS</b> and is completely unrelated.
        </Alert>

        NRN provides built-in static i18n support, based on:<br />
        <ul
          css={css`
            text-align: left;
          `}
        >
          <li>
            <ExternalLink href={'https://www.i18next.com/'}><code>i18next</code> package</ExternalLink>: Core dependency
          </li>
          <li>
            <ExternalLink href={'https://github.com/i18next/react-i18next'}><code>react-i18next</code> package</ExternalLink>: What we actually use in NRN, mostly throught the <code>t</code> and <code>Trans</code> component.
          </li>
          <li>
            <ExternalLink href={'https://locize.com/'}>Locize vendor packages (paid)</ExternalLink>: Vendor meant to help with static content localisation.
            <ExternalLink href={'https://unlyed.github.io/next-right-now/guides/i18n/use-locize.html'}>Read our "How to use" and learn more about what benefits it brings</ExternalLink>
          </li>
        </ul>

        <Alert color={'info'}>
          <div>
            Each example below shows the rendered version and the associated code snippet.<br />
            The goal is to showcase real-world examples to help you get started faster and give a wider overview of what's possible.<br />
            <ExternalLink href={'https://react.i18next.com/'}>
              Check the official documentation
            </ExternalLink>
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
        </Container>
      </DocPage>
    </DefaultLayout>
  );
};

export default withApollo()(ExampleStaticI18nPage);
