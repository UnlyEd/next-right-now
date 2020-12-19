import { createLogger } from '@unly/utils-simple-logger';
import {
  GetServerSideProps,
  NextPage,
} from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';
import { useTranslation } from 'react-i18next';
import Home from '../../../components/home/Home';
import Footer from '../../../components/pageLayouts/Footer';
import Nav from '../../../components/pageLayouts/Nav';
import QuickPreviewLayout from '../../../components/pageLayouts/QuickPreviewLayout';
import { OnlyBrowserPageProps } from '../../../types/pageProps/OnlyBrowserPageProps';
import { SSGPageProps } from '../../../types/pageProps/SSGPageProps';
import { SSRPageProps } from '../../../types/pageProps/SSRPageProps';
import { AMPLITUDE_PAGES } from '../../../utils/analytics/amplitude';
import { getCommonServerSideProps } from '../../../utils/nextjs/SSR';

const fileLabel = 'pages/[locale]/quick-preview/preview-home';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  label: fileLabel,
});

/**
 * Props that are only available for this page
 */
type CustomPageProps = {}

type GetServerSidePageProps = CustomPageProps & SSRPageProps

/**
 * Fetches all products and customer in one single GQL query
 * We only need one
 *
 * @param context
 */
export const getServerSideProps: GetServerSideProps<GetServerSidePageProps> = getCommonServerSideProps;

/**
 * SSR pages are first rendered by the server
 * Then, they're rendered by the client, and gain additional props (defined in OnlyBrowserPageProps)
 * Because this last case is the most common (server bundle only happens during development stage), we consider it a default
 * To represent this behaviour, we use the native Partial TS keyword to make all OnlyBrowserPageProps optional
 *
 * Beware props in OnlyBrowserPageProps are not available on the server
 */
type Props = CustomPageProps & (SSRPageProps & SSGPageProps<OnlyBrowserPageProps>);

/**
 * Quick preview of the home page.
 *
 * The goal is to quickly preview how will the home page be rendered, directly from the Stacker CMS.
 *
 * This page is loaded through Stacker only.
 * It's only available on the "staging" stage (AKA customer "preview" environment).
 */
const PreviewHomePage: NextPage<Props> = (props): JSX.Element => {
  const { t } = useTranslation();

  return (
    <QuickPreviewLayout
      {...props}
      pageName={AMPLITUDE_PAGES.PREVIEW_HOME_PAGE}
      headProps={{
        seoTitle: t('quickPreviewHome.pageTitle', `Aperçu rapide`),
      }}
      ExplanationTooltipOverlay={null}
      Nav={Nav}
      Footer={Footer}
      quickPreviewTitle={t('quickPreviewHome.quickPreviewTitle', `Aperçu rapide de la page d'accueil`)}
    >
      <Home />
    </QuickPreviewLayout>
  );
};

export default (PreviewHomePage);
