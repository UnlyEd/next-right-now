import * as Sentry from '@sentry/node';
import universalLanguageDetect from '@unly/universal-language-detector';
import { ERROR_LEVELS } from '@unly/universal-language-detector/lib/utils/error';
import { isBrowser } from '@unly/utils';
import { createLogger } from '@unly/utils-simple-logger';
import classnames from 'classnames';
import get from 'lodash.get';
import { NextPageContext } from 'next';
import NextCookies from 'next-cookies';
import Document, { DocumentContext, DocumentProps, Head, Main, NextScript } from 'next/document';
import React from 'react';

import { Cookies } from '../types/Cookies';
import { DocumentInitialProps } from '../types/DocumentInitialProps';
import { LANG_EN, SUPPORTED_LANGUAGES } from '../utils/i18n';

const fileLabel = 'pages/_document';
const logger = createLogger({
  label: fileLabel,
});

/**
 * Send to Sentry all unhandled rejections.
 *
 * If such error happens in this file, it will completely crash the server and render "Internal Server Error" on the client.
 * @see https://leerob.io/blog/configuring-sentry-for-nextjs-apps
 */
process.on('unhandledRejection', (e: Error): void => {
  Sentry.captureException(e);
});

/**
 * Send to Sentry all uncaught exceptions.
 *
 * If such error happens in this file, it will completely crash the server and render "Internal Server Error" on the client.
 * @see https://leerob.io/blog/configuring-sentry-for-nextjs-apps
 */
process.on('uncaughtException', (e: Error): void => {
  Sentry.captureException(e);
});

/**
 * XXX Is only rendered on the server side and not on the client side
 *
 * Used to inject <html lang=""> tag
 *
 * See https://github.com/zeit/next.js/#custom-document
 */
class NRNDocument extends Document<Props> {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    try {
      Sentry.addBreadcrumb({ // See https://docs.sentry.io/enriching-error-data/breadcrumbs
        category: fileLabel,
        message: `Preparing document (${isBrowser() ? 'browser' : 'server'})`,
        level: Sentry.Severity.Debug,
      });

      const initialProps: DocumentInitialProps = await Document.getInitialProps(ctx);
      const { req }: NextPageContext = ctx;
      const cookies: Cookies = NextCookies(ctx); // Parses Next.js cookies in a universal way (server + client)
      const lang: string = universalLanguageDetect({
        supportedLanguages: SUPPORTED_LANGUAGES, // Whitelist of supported languages, will be used to filter out languages that aren't supported
        fallbackLanguage: LANG_EN, // Fallback language in case the user's language cannot be resolved
        acceptLanguageHeader: get(req, 'headers.accept-language'), // Optional - Accept-language header will be used when resolving the language on the server side
        serverCookies: cookies, // Optional - Cookie "i18next" takes precedence over navigator configuration (ex: "i18next: fr"), will only be used on the server side
        errorHandler: (error: Error, level: ERROR_LEVELS, origin: string, context: object): void => {
          Sentry.withScope((scope): void => {
            scope.setExtra('level', level);
            scope.setExtra('origin', origin);
            scope.setContext('context', context);
            Sentry.captureException(error);
          });
          logger.error(error.message);
        },
      });

      return { ...initialProps, lang };
    } catch (e) {
      // If an error happens, log it and then try to render the page again with minimal processing
      // This way, it'll render something on the client. (otherwise, it'd completely crash the server and render "Internal Server Error" on the client)
      Sentry.captureException(e);

      const initialProps: DocumentInitialProps = await Document.getInitialProps(ctx);
      return { ...initialProps };
    }
  }

  render(): JSX.Element {
    const { lang }: DocumentProps & { lang: string } = this.props;

    return (
      <html lang={this.props.lang}>
        <Head />
        <body className={classnames('nrn', `lang-${lang}`)}>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

type Props = {
  lang: string;
} & DocumentProps

export default NRNDocument;
