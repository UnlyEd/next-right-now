/**
 * Babel configuration for Next.js
 *
 * The official documentation uses a ".babelrc" file, but we prefer using "babel.config.js" for better documentation support.
 *
 * @see https://nextjs.org/docs/advanced-features/customizing-babel-config Official doc reference v10
 * @see https://github.com/vercel/next.js/blob/canary/packages/next/build/babel/preset.ts You can take a look at this file to learn about the presets included by next/babel.
 * @see https://emotion.sh/docs/css-prop#babel-preset Configuring Emotion 11
 * @example https://github.com/vercel/next.js/tree/canary/examples/with-custom-babel-config Next.js official example of customizing Babel
 */
module.exports = {
  presets: [
    [
      "next/babel",
      {
        "preset-react": {
          "runtime": "automatic",
          "importSource": "@emotion/react"
        }
      }
    ]
  ],
  plugins: ["@emotion/babel-plugin"],
};
