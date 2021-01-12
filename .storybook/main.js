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
  ],
};
