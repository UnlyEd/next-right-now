/** @jsx jsx */
import { jsx } from '@emotion/core';
import * as Sentry from '@sentry/node';
import { isBrowser } from '@unly/utils';
import { createLogger } from '@unly/utils-simple-logger';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';
import { useTranslation } from 'react-i18next';
import { LayoutPropsSSG, LayoutPropsSSR } from '../types/LayoutProps';
import { isRunningInIframe } from '../utils/iframe';

const fileLabel = 'components/Layout';
const logger = createLogger({
  label: fileLabel,
});

/**
 * Layout of the whole app. Acts as a wrapper that displays the whole thing (menus, page, etc.)
 *
 * @param {Props} props
 * @return {JSX.Element}
 * @constructor
 */
const Layout: React.FunctionComponent<Props> = (props: Props): JSX.Element => {
  const {
    children,
    customerRef,
    gcmsLocales,
    router,
    lang,
    // amplitudeInstance,
  }: Props = props;
  const isInIframe: boolean = isRunningInIframe();

  const { t, i18n } = useTranslation();

  Sentry.addBreadcrumb({ // See https://docs.sentry.io/enriching-error-data/breadcrumbs
    category: fileLabel,
    message: `Rendering layout (${isBrowser() ? 'browser' : 'server'})`,
    level: Sentry.Severity.Debug,
  });

  // In non-production stages, bind some utilities to the browser's DOM, for ease of quick testing
  if (isBrowser() && process.env.APP_STAGE !== 'production') {
    window['i18n'] = i18n;
    window['t'] = t;
    // window['amplitudeInstance'] = amplitudeInstance;
    logger.info(`Utilities have been bound to the DOM for quick testing in non-production stages:
    - i18n
    - t
    // - amplitudeInstance
    `);
  }

  return (
    <>
      {/* Renders the current "page" in "pages/" */}
      {
        // Add additional data to every child (a child is a "page" here)
        // See https://medium.com/better-programming/passing-data-to-props-children-in-react-5399baea0356
        React.Children.map(children, (child) => {
          return React.cloneElement(child, {
            ...props,
            isInIframe,
          });
        })
      }
    </>
  );
};

type Props = {
  children: React.ReactElement;
} & (LayoutPropsSSG | LayoutPropsSSR);

export default Layout;
