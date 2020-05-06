import { i18n } from 'i18next';
import { Theme } from './data/Theme';
import { MultiversalAppBootstrapProps } from './MultiversalAppBootstrapProps';
import { MultiversalPageProps } from './MultiversalPageProps';

/**
 *
 */
export type PageBootstrapProps = {
  i18nextInstance: i18n;
  theme: Theme;
} & Omit<MultiversalAppBootstrapProps, 'pageProps'> & MultiversalPageProps;
