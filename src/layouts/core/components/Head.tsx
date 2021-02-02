import {
  NRN_DEFAULT_FONT,
  NRN_DEFAULT_SERVICE_LABEL,
} from '@/app/constants';
import useCustomer from '@/modules/core/data/hooks/useCustomer';
import { Customer } from '@/modules/core/data/types/Customer';
import { SUPPORTED_LOCALES } from '@/modules/core/i18n/i18n';
import { I18nLocale } from '@/modules/core/i18n/types/I18nLocale';
import { isBrowser } from '@unly/utils';
import NextHead from 'next/head';
import React from 'react';

export type HeadProps = {
  /**
   * Title of the page. (SEO)
   *
   * Displayed in the browser tab.
   */
  seoTitle?: string;

  /**
   * Description of the page. (SEO)
   *
   * Used as Open Graph and twitter description.
   */
  seoDescription?: string;

  /**
   * Url of the page. (SEO)
   *
   * Used as Open Graph url.
   */
  seoUrl?: string;

  /**
   * Image associated with the page. (SEO)
   *
   * Used as Open Graph and twitter image.
   */
  seoImage?: string;

  /**
   * Favicon.
   *
   * Websites usually use the same favicon for all their pages.
   */
  favicon?: string;

  /**
   * Additional links and scripts HTML elements.
   *
   * Can be used to load 3rd party scripts and such.
   * It is recommended to use a "<Fragment>" as wrapper.
   */
  additionalContent?: React.ReactElement;
}

/**
 * Custom Next.js Head component.
 *
 * Configures SEO, load fonts.
 *
 * TODO Fonts should be loaded differently. Lee Robinson (Vercel) has given great talks recently, see https://leerob.io/blog/fonts
 * TODO SEO should be done differently. See https://github.com/UnlyEd/next-right-now/issues/150
 *
 * XXX Core component, meant to be used by other layouts, shouldn't be used by other components directly.
 *
 * https://github.com/vercel/next.js#populating-head
 */
const Head: React.FunctionComponent<HeadProps> = (props): JSX.Element => {
  const customer: Customer = useCustomer();

  const defaultDescription = 'Flexible production-grade boilerplate with Next.js 9, Vercel and TypeScript. Includes multiple opt-in presets using Storybook, Airtable, Analytics, CSS-in-JS, Monitoring, End-to-end testing, Internationalization, CI/CD and SaaS B2B multiple single-tenants (monorepo) support';
  const defaultMetaURL = 'https://github.com/UnlyEd/next-right-now';
  const defaultMetaImage = customer?.theme?.logo?.url;
  const defaultFavicon = '/favicon.ico';

  const {
    seoTitle = NRN_DEFAULT_SERVICE_LABEL,
    seoDescription = defaultDescription,
    seoImage = defaultMetaImage,
    seoUrl = defaultMetaURL,
    favicon = defaultFavicon,
    additionalContent = null,
  } = props;

  if (isBrowser()) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const WebFontLoader = require('webfontloader');

    // Load our fonts. Until they're loaded, fallback fonts will be used (configured in MultiversalGlobalStyles)
    // This fixed an issue when loading fonts from external sources that don't show the text until the font is loaded
    // With this, instead of not showing any text, it'll show the text using its fallback font, and then show the font once loaded
    // XXX See https://github.com/typekit/webfontloader#custom
    WebFontLoader.load({
      custom: {
        families: [NRN_DEFAULT_FONT],
        urls: ['/static/fonts/NeuzeitGrotesk/font.css'],
      },
    });
  }

  return (
    <NextHead>
      <meta charSet="UTF-8" />
      <title>{seoTitle}</title>
      <meta
        name="description"
        content={seoDescription}
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/*<link rel="icon" sizes="192x192" href="/touch-icon.png" />*/}
      {/*<link rel="apple-touch-icon" href="/touch-icon.png" />*/}
      {/*<link rel="mask-icon" href="/favicon-mask.svg" color="#49B882" />*/}
      <link rel="icon" href={favicon} />

      {/* Perf optimisation (preload normal and bold fonts because they're the most used) - See https://web.dev/uses-rel-preload*/}
      {/* TODO See if it's actually a good thing, seems to conflict with WebFontLoader - See https://github.com/GoogleChrome/lighthouse/issues/10892 */}
      <link rel="preload" as="style" href={'/static/fonts/NeuzeitGrotesk/font.css'} />
      <link rel="preload" as="font" href={'/static/fonts/NeuzeitGrotesk/NeuzeitGrotesk-bold.woff'} type="font/woff" crossOrigin="anonymous" />
      <link rel="preload" as="font" href={'/static/fonts/NeuzeitGrotesk/NeuzeitGrotesk-bold.woff2'} type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" as="font" href={'/static/fonts/NeuzeitGrotesk/NeuzeitGrotesk-black.woff'} type="font/woff" crossOrigin="anonymous" />
      <link rel="preload" as="font" href={'/static/fonts/NeuzeitGrotesk/NeuzeitGrotesk-black.woff2'} type="font/woff2" crossOrigin="anonymous" />

      {
        SUPPORTED_LOCALES.map((supportedLocale: I18nLocale) => {
          // Google best practice for SEO https://webmasters.googleblog.com/2011/12/new-markup-for-multilingual-content.html
          // Google accepts relative links for hreflang
          // See https://stackoverflow.com/questions/28291574/are-relative-links-valid-in-link-rel-alternate-hreflang-tags
          // See https://webmasters.googleblog.com/2013/04/5-common-mistakes-with-relcanonical.html
          return (
            <link key={supportedLocale?.name} rel="alternate" hrefLang={supportedLocale?.name || 'en'} href={`/${supportedLocale?.name || 'en'}`} />
          );
        })
      }

      <meta property="og:url" content={seoUrl} />
      <meta property="og:title" content={seoTitle} />
      <meta
        property="og:description"
        content={seoDescription}
      />
      <meta name="twitter:site" content={seoUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={seoImage} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Detect outdated browser and display a popup about how to upgrade to a more recent browser/version */}
      {/* XXX See public/static/libs/detect-outdated-browser/README.md */}
      {/*
        XXX DISABLED because of https://github.com/mikemaccana/outdated-browser-rework/issues/57#issuecomment-620532590
          TLDR; Display false-positive warnings on embedded browsers (on mobile devices) if they're too old and the user can't do anything about it (e.g: Facebook Chrome, Linkedin Chrome, etc.)
      */}
      {/*<script async={true} src="/assets/libs/outdated-browser-rework/outdated-browser-rework.min.js" />*/}
      {/*<link rel="stylesheet" href="/assets/libs/outdated-browser-rework/outdated-browser-rework.css" />*/}

      {
        additionalContent && (
          additionalContent
        )
      }

    </NextHead>
  );
};

export default Head;
