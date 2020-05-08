import { Theme } from '../data/Theme';
import { i18n } from 'i18next';

/**
 * Additional props that are injected by MultiversalAppBootstrap to all pages
 */
export type MultiversalAppBootstrapPageProps = {
  i18nextInstance: i18n;
  theme: Theme;
}
