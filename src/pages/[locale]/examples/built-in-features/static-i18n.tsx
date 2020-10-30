import { css } from '@emotion/core';
import { createLogger } from '@unly/utils-simple-logger';
import {
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';
import {
  Trans,
  useTranslation,
} from 'react-i18next';
import {
  Alert,
  Container,
} from 'reactstrap';
import { v1 as uuid } from 'uuid';

import BuiltInFeaturesSidebar from '../../../../components/doc/BuiltInFeaturesSidebar';
import DocPage from '../../../../components/doc/DocPage';
import DefaultLayout from '../../../../components/pageLayouts/DefaultLayout';
import DisplayOnBrowserMount from '../../../../components/rehydration/DisplayOnBrowserMount';
import Code from '../../../../components/utils/Code';
import ExternalLink from '../../../../components/utils/ExternalLink';
import useI18n, { I18n } from '../../../../hooks/useI18n';
import { CommonServerSideParams } from '../../../../types/nextjs/CommonServerSideParams';
import { OnlyBrowserPageProps } from '../../../../types/pageProps/OnlyBrowserPageProps';
import { SSGPageProps } from '../../../../types/pageProps/SSGPageProps';
import { resolveCustomerVariationLang } from '../../../../utils/i18n/i18n';
import {
  getExamplesCommonStaticPaths,
  getExamplesCommonStaticProps,
} from '../../../../utils/nextjs/SSG';

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
  const { lang }: I18n = useI18n();

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
          Dynamic content (DB records) is managed through <b>Airtable</b> and is completely unrelated.
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
          <h2>Translation using <code>t</code> function</h2>

          <div>
            {t('examples.i18n.simpleTranslation', 'Traduction simple')}<br />
            <Code
              text={`
                {t('examples.i18n.simpleTranslation', 'Traduction simple')}
              `}
            />
          </div>
          <hr />

          <h2>Translation with plurals</h2>

          <Alert color={'info'}>
            Plurals work with the <code>count</code> property, which is the amount of items.<br />
            It's a very particular variable, only meant for that purpose.<br />
            <ExternalLink href={'https://www.i18next.com/translation-function/plurals'}>Read the doc</ExternalLink>
          </Alert>

          <div>
            {t('examples.i18n.pluralTranslation', 'Traduction avec gestion du pluriel', { count: 1 })}<br />
            <Code
              text={`
                {t('examples.i18n.pluralTranslation', 'Traduction avec gestion du pluriel', { count: 1 })}
              `}
            />
          </div>
          <br />
          <div>
            {t('examples.i18n.pluralTranslation', 'Traduction avec gestion du pluriel', { count: 2 })}<br />
            <Code
              text={`
                {t('examples.i18n.pluralTranslation', 'Traduction avec gestion du pluriel', { count: 2 })}
              `}
            />
          </div>
          <br />

          <div>
            <Trans
              i18nKey={'examples.i18n.dynamicPluralTranslation'}
              count={1}
            >
              Nous avons trouvé {{ count: 1 }} solution pour vous.
            </Trans>
            <br />
            <Code
              text={`
                <Trans
                  i18nKey={'examples.i18n.dynamicPluralTranslation'}
                  count={1}
                >
                  Nous avons trouvé {{ count: 1 }} solution pour vous.
                </Trans>
              `}
            />
          </div>
          <br />

          <div>
            <Trans
              i18nKey={'examples.i18n.dynamicPluralTranslation'}
              count={2}
            >
              Nous avons trouvé {{ count: 2 }} solution pour vous.
            </Trans>
            <br />
            <Code
              text={`
                <Trans
                  i18nKey={'examples.i18n.dynamicPluralTranslation'}
                  count={2}
                >
                  Nous avons trouvé {{ count: 2 }} solution pour vous.
                </Trans>
              `}
            />
          </div>
          <hr />

          <h2>Translation using variables</h2>

          <div>
            <DisplayOnBrowserMount>
              <Trans
                i18nKey={'examples.i18n.dynamicTranslation'}
              >
                Contenu dynamique : <b>{{ uuid: uuid() }}</b>
              </Trans>
              <br />
              <Code
                text={`
                  <Trans
                    i18nKey={'examples.i18n.dynamicTranslation'}
                  >
                    Contenu dynamique : <b>{{ uuid: uuid() }}</b>
                  </Trans>
                `}
              />
            </DisplayOnBrowserMount>
          </div>
          <hr />

          <h2>Automated fallback - Handling missing translations</h2>

          <Alert color={'info'}>
            It will happen that some translations are missing, in such case NRN has been configured to fallback to another language (AKA "fallback" language).<br />
            French has been defined as the default language in NRN (Locize configuration), meaning all translations must always exist for the French language.<br />
          </Alert>

          <div>
            <Trans
              i18nKey={'examples.i18n.missingTranslationWithFallback'}
            >
              Cette phrase n'est pas traduite en anglais, et sera affichée en Français même quand la langue anglaise est utilisée<br />
              (This sentence is not translated in English, and will be displayed in French even when English language is being used)<br />
              <i>
                Note that I actually translated it (within the same sentence), so that non-French speakers may understand the explanation/feature.<br />
                Basically, if a static translation is not found in any non-primary language, then NRN automatically fall backs to another language, so that something gets displayed in any way.
              </i>
            </Trans>
            <br />
            <Code
              text={`
                <Trans
                  i18nKey={'examples.i18n.missingTranslationWithFallback'}
                >
                  Cette phrase n'est pas traduite en anglais, et sera affichée en Français même quand la langue anglaise est utilisée<br />
                  (This sentence is not translated in English, and will be displayed in French even when English language is being used)<br />
                  <i>
                    Note that I actually translated it (within the same sentence), so that non-French speakers may understand the explanation/feature.<br />
                    Basically, if a static translation is not found in any non-primary language, then NRN automatically fall backs to another language, so that something gets displayed in any way.
                  </i>
                </Trans>
              `}
            />
          </div>
          <hr />

          <h2>Customising translations, per customer</h2>

          <Alert color={'info'}>
            You may need to allow some translations to be overridden by a particular customer.<br />
            NRN comes with built-in support for this advanced need, and uses additional Locize "Languages" to store "variations" of the translations.
          </Alert>

          <div>
            <Trans
              i18nKey={'examples.i18n.translationUsingCustomerVariation'}
            >
              Cette traduction est spécifique au customer "{{ customerRef: process.env.NEXT_PUBLIC_CUSTOMER_REF }}". <br />
              Chaque customer peut surcharger ses propres traductions, en créant une clé Locize dans son <code>"{{ customerVariationLang: resolveCustomerVariationLang(lang) }}"</code> langage.<br />
              Cette traduction va surcharger/remplacer la traduction de base, pour ce customer.<br />
              <br />
              Exemple:
            </Trans>
            <br />
            <Code
              text={`
                <Trans
                  i18nKey={'examples.i18n.translationUsingCustomerVariation'}
                >
                  Cette traduction est spécifique au customer "{{ customerRef: process.env.NEXT_PUBLIC_CUSTOMER_REF }}". <br />
                  Chaque customer peut surcharger ses propres traductions, en créant une clé Locize dans son <code>"{{ customerVariationLang: resolveCustomerVariationLang(lang)}}"</code> langage.<br />
                  Cette traduction va surcharger/remplacer la traduction de base, pour ce customer.<br />
                  <br />
                  Exemple:
                </Trans>
              `}
            />
            <Alert color={'warning'}>
              This requires you create a new <code>Language</code> in Locize first, for instance: <code>fr-x-customer1</code> and <code>en-x-customer1</code><br />
              <br />
              The <code>-x-</code> stands for "variation", it's the official way to create custom language variations that are specific to your business needs, when using i18next.
            </Alert>
            <Alert color={'info'}>
              You will need to check how this page displays on other customers to see this particular behaviour. <br />
              <ExternalLink href={'https://github.com/UnlyEd/next-right-now#overview-of-available-presets'}>Check out the README to see all other demos.</ExternalLink> (e.g: customer 1/2)
            </Alert>
          </div>
        </Container>
      </DocPage>
    </DefaultLayout>
  );
};

export default (ExampleStaticI18nPage);
