/**
 * Babel configuration for Storybook
 *
 * Doesn't affect Next.js babel configuration, specific file for Storybook only.
 * Need to apply Emotion babel configuration, otherwise Emotion "css" cannot be used in Storybook.
 *
 * @see https://emotion.sh/docs/css-prop#babel-preset Configuring Emotion 11
 */
module.exports = {
  "presets": [
    [
      "@babel/preset-react",
      {
        "runtime": "automatic",
        "importSource": "@emotion/react"
      }
    ]
  ],
  "plugins": ["@emotion/babel-plugin"]
};
