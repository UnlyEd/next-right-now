import { AmplitudeClient } from 'amplitude-js';
import { i18n } from 'i18next';
import { NextRouter } from 'next/router';
import { MultiversalPageProps } from './MultiversalPageProps';

export type LayoutPropsSSR = {
  router: NextRouter;
  i18nextInstance: i18n;
  err?: Error; // Only defined if there was an error

  // Only available on the client side
  isInIframe?: boolean;
  amplitudeInstance?: AmplitudeClient;
} & MultiversalPageProps;

/**
 * Properties that are provided to the PageLayout component
 *
 * Some properties will be undefined depending on the runtime engine
 * Extracted outside of the PageLayout for reusability, as there may be several layouts in the app
 */
export declare type LayoutProps = LayoutPropsSSR;
