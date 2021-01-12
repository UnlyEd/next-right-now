/**
 * Babel configuration for Storybook
 *
 * Doesn't affect Next.js babel configuration, specific file for Storybook only.
 * Need to apply Emotion babel configuration, otherwise Emotion "css" cannot be used in Storybook.
 *
 * XXX We use the "classic" way instead of the "automatic" way for Storybook, that's because MDX isn't compatible with "automatic".
 *
 * @see https://emotion.sh/docs/css-prop#babel-preset Configuring Emotion 11
 */
module.exports = {
  "presets": ["@emotion/babel-preset-css-prop"]
};
