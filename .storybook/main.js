module.exports = {
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',

    /**
     * We use Google Analytics for tracking analytics usage.
     *
     * It's much easier to setup than Amplitude, because there is an official dedicated plugin for this.
     * See ".storybook/manager.js" for Google Analytics configuration.
     *
     * @see https://github.com/storybookjs/storybook/tree/master/addons/google-analytics
     */
    '@storybook/addon-google-analytics',

    /**
     * Adds support for CSS Modules.
     *
     * Even though Next Right Now doesn't encourage the use of CSS Modules,
     * we thought it's an interesting feature to support, which is natively supported by Next.js.
     *
     * @see https://www.npmjs.com/package/storybook-css-modules-preset How to configure Storybook to support CSS Modules
     * @see https://nextjs.org/docs/basic-features/built-in-css-support#adding-component-level-css How to use CSS Modules with Next.js
     */
    'storybook-css-modules-preset',
  ],
};
