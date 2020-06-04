import fetch from 'node-fetch';

/**
 * @see https://github.com/vercel/next.js/discussions/13678 How to use built-in fetch in tests?
 * @see https://nextjs.org/blog/next-9-4#improved-built-in-fetch-support Next.js Blog - Improved Built-in Fetch Support
 * @see https://jestjs.io/docs/en/configuration#setupfilesafterenv-array About setupFilesAfterEnv usage
 */
// Polyfill "fetch" for node.js, so that our tests may replicate the built-in "fetch" provided by Next.js
global.fetch = fetch;

console.info('Jest env has been enhanced - See "./jest.setup.js"')
