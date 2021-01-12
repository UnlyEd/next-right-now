/**
 * The doc doesn't really mention using webpack.config.js, but .storybook/main.js instead.
 *
 * Nevertheless, configuring the webpack.config.js seems to work fine.
 *
 * @param config Base config
 * @param env development | production - Depends on the webpack compilation mode
 * @param defaultConfig
 * @return {Promise<*>}
 * @see https://storybook.js.org/docs/react/configure/webpack
 * @see https://storybook.js.org/docs/react/configure/webpack#using-your-existing-config
 */
module.exports = async ({
  config,
  env,
  defaultConfig,
}) => {
  /**
   * Fixes npm packages that depend on `fs` module, etc.
   *
   * E.g: "winston" would fail to load without this, because it relies on fs, which isn't available during browser build.
   *
   * @see https://github.com/storybookjs/storybook/issues/4082#issuecomment-495370896
   */
  config.node = {
    fs: 'empty',
    tls: 'empty',
    net: 'empty',
    module: 'empty',
    console: true,
  };

  // XXX See https://github.com/vercel/next.js/blob/canary/examples/with-sentry-simple/next.config.js
  // Because StoryBook only compiles for client and has no server runtime, we must replace backend-related libs like @sentry/node to their browser counterpart
  config.resolve.alias['@sentry/node'] = '@sentry/browser';

  // TODO Unsafe
  defaultConfig.module.rules[0].use[0].options.plugins = [
    require.resolve('babel-plugin-react-docgen'),
  ];

  return config;
  // return {
  //   ...config,
  //   ...{
  //     ...config.module,
  //     ...{
  //       ...config.module.rules,
  //       ...{
  //         ...config.module.rules.use,
  //         ...{
  //           ...config.module.rules.use.options,
  //           ...[
  //             ...config.module.rules.use.options.plugins,
  //             'babel-plugin-react-docgen',
  //           ],
  //         },
  //       },
  //     },
  //   },
  // };
};
