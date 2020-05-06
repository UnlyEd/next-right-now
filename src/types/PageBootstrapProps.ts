import { i18n } from 'i18next';
import { Theme } from './data/Theme';
import { MultiversalPageBootstrapProps } from './MultiversalPageBootstrapProps';
import { MultiversalPageProps } from './MultiversalPageProps';

/**
 *
 */
export type PageBootstrapProps = {
  i18nextInstance: i18n;
  theme: Theme;
} & Omit<MultiversalPageBootstrapProps, 'pageProps'> & MultiversalPageProps;
