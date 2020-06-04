import { i18n } from 'i18next';
import { CustomerTheme } from '../data/CustomerTheme';

/**
 * Additional props that are injected by MultiversalAppBootstrap to all pages
 */
export type MultiversalAppBootstrapPageProps = {
  i18nextInstance: i18n;
  isSSGFallbackInitialBuild: boolean; // When true, means the app is loading a SSG page, with fallback mode enabled, and this page hasn't been built before
  customerTheme: CustomerTheme;
}
