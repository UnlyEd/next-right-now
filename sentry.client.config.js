// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';
import { configureSentry } from './src/modules/core/sentry/init';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  enabled: process.env.NODE_ENV !== 'test',
  environment: process.env.NEXT_PUBLIC_APP_STAGE,
  debug: process.env.NODE_ENV === 'development', // You'll need to configure "debug" in sentry.x.config.js files as well as next.config.js
  tracesSampleRate: 1.0,

  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});

configureSentry();
