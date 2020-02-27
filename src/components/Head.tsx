import { isBrowser } from '@unly/utils';
import NextHead from 'next/head';
import React from 'react';

import { NRN_DEFAULT_SERVICE_LABEL } from '../constants';

const defaultTitle = NRN_DEFAULT_SERVICE_LABEL;
const defaultDescription = ''; // TODO
const defaultOGURL = ''; // TODO
const defaultOGImage = ''; // TODO
const defaultFavicon = 'https://storage.googleapis.com/the-funding-place/assets/images/default_favicon.ico';

/**
 * Custom Head component
 *
 * https://github.com/zeit/next.js#populating-head
 *
 * @param title
 * @param description
 * @param ogImage
 * @param url
 * @param favicon
 * @param lang
 * @constructor
 */
const Head: React.FunctionComponent<Props> = (
  {
    title,
    description,
    ogImage,
    url,
    favicon,
    additionalContent,
  },
): JSX.Element => {
  if (isBrowser()) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const WebFontLoader = require('webfontloader');

    // Load our fonts. Until they're loaded, their fallback fonts will be used
    // This fixed an issue when loading fonts from external sources that don't show the text until the font is loaded
    // With this, instead of not showing any text, it'll show the text using its fallback font, and then show the font once loaded
    // Note that we must load the font file synchronously to avoid a FOUT effect (see <link> below)
    // XXX See https://www.npmjs.com/package/webfontloader#custom
    WebFontLoader.load({
      custom: {
        families: ['neuzeit-grotesk'],
      },
    });
  }

  return (
    <NextHead>
      <meta charSet="UTF-8" />
      <title>{title || defaultTitle}</title>
      <meta
        name="description"
        content={description || defaultDescription}
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" sizes="192x192" href="/touch-icon.png" />
      <link rel="apple-touch-icon" href="/touch-icon.png" />
      <link rel="mask-icon" href="/favicon-mask.svg" color="#49B882" />
      <link rel="icon" href={favicon || defaultFavicon} />
      <link rel="stylesheet" href="/static/fonts/CircularStd-Book/font.css" media="all" />
      <link rel="stylesheet" href="/static/fonts/NeuzeitGrotesk/font.css" media="all" />

      <meta property="og:url" content={url || defaultOGURL} />
      <meta property="og:title" content={title || ''} />
      <meta
        property="og:description"
        content={description || defaultDescription}
      />
      <meta name="twitter:site" content={url || defaultOGURL} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={ogImage || defaultOGImage} />
      <meta property="og:image" content={ogImage || defaultOGImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Detect outdated browser and display a popup about how to upgrade to a more recent browser/version */}
      {/* XXX See public/static/CDN/README.md */}
      <script async={true} src="https://storage.googleapis.com/the-funding-place/assets/libs/outdated-browser-rework/outdated-browser-rework.min.js" />
      <link rel="stylesheet" href="https://storage.googleapis.com/the-funding-place/assets/libs/outdated-browser-rework/outdated-browser-rework.css" />

      {
        additionalContent && (
          additionalContent
        )
      }

    </NextHead>
  );
};

type Props = {
  title?: string;
  description?: string;
  url?: string;
  ogImage?: string;
  favicon?: string;
  additionalContent?: React.ReactElement;
}

export default Head;
