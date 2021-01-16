import { addons } from '@storybook/addons';
import { themes } from '@storybook/theming';

/**
 * Configure Storybook UI layout.
 *
 * XXX The Storybook manager seems to suffer from a cache invalidation issue, which forces us to run with `--no-manager-cache` option.
 *  @see https://github.com/storybookjs/storybook/issues/13649#issuecomment-761076960
 *  @see https://github.com/storybookjs/storybook/issues/13200
 *
 * @see https://storybook.js.org/docs/react/configure/features-and-behavior
 */
addons.setConfig({
  theme: themes.dark,
});

/**
 * Your Google Analytics tracking ID.
 *
 * If you're creating a dedicated Google Analytics property for this (you should),
 * Then make sure to create a "Universal Analytics property", not a Google Analytics 4 property (default since 2021).
 *
 * @see https://support.google.com/analytics/answer/10269537
 * @see https://github.com/storybookjs/storybook/tree/master/addons/google-analytics Google Analytic addon for Storybook
 */
window.STORYBOOK_GA_ID = 'UA-89785688-10'; // Replace by your own "UA-XXXXXXX-XX"

/**
 * React-ga options object
 *
 * @example { debug: true, gaOptions: { userId: 123 }}
 * @see https://github.com/react-ga/react-ga#api
 * @see https://github.com/storybookjs/storybook/blob/4f5ab9fe9e590da7b841ec37cb1bed8d6327ea4b/addons/google-analytics/src/register.ts#L8
 * @see https://github.com/storybookjs/storybook/tree/master/addons/google-analytics Google Analytic addon for Storybook
 */
window.STORYBOOK_REACT_GA_OPTIONS = {};
