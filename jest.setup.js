// XXX Unlike what could be expected, once an ENV var is found by dotenv, it won't be overridden
//  So, the order must be from the most important to the less important
//  See https://github.com/motdotla/dotenv/issues/256#issuecomment-598676663
require('dotenv').config({ path: '.env.local' });
require('dotenv').config({ path: '.env' });

/**
 * Importing next during test applies automated polyfills:
 *  - Polyfill the built-in "fetch" provided by Next.js
 *
 * @see https://github.com/vercel/next.js/discussions/13678#discussioncomment-22383 How to use built-in fetch in tests?
 * @see https://nextjs.org/blog/next-9-4#improved-built-in-fetch-support Next.js Blog - Improved Built-in Fetch Support
 * @see https://jestjs.io/docs/en/configuration#setupfilesafterenv-array About setupFilesAfterEnv usage
 */
require('next');


