import * as Sentry from '@sentry/node';
import { createLogger } from '@unly/utils-simple-logger';
import classnames from 'classnames';
import { DocumentInitialProps } from 'next/dist/next-server/lib/utils';
import Document, {
  DocumentContext,
  DocumentProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';
import React from 'react';

import { DEFAULT_LOCALE } from '../utils/i18n/i18n';

const fileLabel = 'pages/_document';
const logger = createLogger({
  label: fileLabel,
});

/**
 * Additional props depending on our App
 *
 * Must be returned by getInitialProps and will be available in render function
 */
type Props = {
  locale: string;
  lang: string;
}

type DocumentGetInitialPropsOutput = Props & DocumentInitialProps
type DocumentRenderProps = Props & DocumentProps

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
 * See https://github.com/vercel/next.js/#custom-document
 */
class AppDocument extends Document<DocumentRenderProps> {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentGetInitialPropsOutput> {
    Sentry.addBreadcrumb({ // See https://docs.sentry.io/enriching-error-data/breadcrumbs
      category: fileLabel,
      message: `Rendering _document`,
      level: Sentry.Severity.Debug,
    });

    const initialProps: DocumentInitialProps = await Document.getInitialProps(ctx);
    const { query } = ctx;
    const hasLocaleFromUrl = !!query?.locale;
    const locale: string = hasLocaleFromUrl ? query?.locale as string : DEFAULT_LOCALE; // If the locale isn't found (e.g: 404 page)
    const lang: string = locale.split('-')?.[0];

    return {
      ...initialProps,
      locale,
      lang,
    };
  }

  render(): JSX.Element {
    const {
      lang,
      locale,
    }: DocumentRenderProps = this.props;

    return (
      <Html lang={lang}>
        <Head />
        <body
          className={classnames(
            // XXX Those variables are added to grant more flexibility if ever needed. They're not used at the moment
            'nrn', // All styles are bound to this, if you remove/rename, it'll break all CSS in src/components/appBootstrap/MultiversalGlobalStyles.tsx
            `${process.env.NEXT_PUBLIC_APP_NAME}`, // From package.json:name

            // Localisation-based styles are very useful (e.g: resize text based on locale or language)
            `locale-${locale}`,
            `lang-${lang}`,

            // For customer/stage/version based styles, could be handy in rare cases
            `${process.env.NEXT_PUBLIC_CUSTOMER_REF}`,
            `stage-${process.env.NEXT_PUBLIC_APP_STAGE}`,
            `v${process.env.NEXT_PUBLIC_APP_VERSION}`, // From package.json:version
          )}
        >
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default AppDocument;
