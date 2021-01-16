import { ArgTypes } from '@storybook/addons/dist/types';

/**
 * HOC options.
 */
type Options = {
  /**
   * Name of the property to mock.
   *
   * Disables `children` by default, because it's the main reason why we use this HOC.
   * Also, can often crash the app if not proper `children` is passed down, bad UX.
   *
   * @default children
   */
  propName: string;

  /**
   * Whether to mock the `propName`.
   *
   * @default true
   */
  shouldMockProp?: boolean;

  /**
   * Name of the property that mocks the `propName`.
   *
   * Replaces `children` prop by `text` by default, because that's our most common use-case.
   *
   * @default text
   */
  propMockName?: string;
};

/**
 * Options applied by default.
 */
const defaultOptions: Partial<Options> = {
  propName: 'children',
  shouldMockProp: true,
  propMockName: 'text',
};

/**
 * Mocks the "argTypes" to disable `propName` (default: `children`) control and add a mock field (default: `text`) with built-in documentation.
 * Helps avoid code duplication, while avoid misunderstanding about what are the real props and the mocked props.
 */
const withPropMock = (argTypes: ArgTypes, options?: Options): ArgTypes => {
  const {
    propName,
    shouldMockProp,
    propMockName,
  } = { ...defaultOptions, ...options || {} };
  let computedArgTypes: ArgTypes;

  if (shouldMockProp) {
    computedArgTypes = {
      ...argTypes,

      /**
       * Disables `propName` control.
       */
      [propName]: {
        control: {
          disable: true,
        },
      },

      /**
       * `propName` mock field, meant to replace the `propName` prop by providing interactivity (controls enabled).
       * Must be added to the Story `args` with a default value to be interactive.
       */
      [propMockName]: {
        description: `<code>${propName}</code> mock property.<br /><br /><span className="tip">Mock</span><i>This property doesn't really exist in the component.<br />It is made available to help manipulate the <code>${propName}</code> from Storybook</i>.<br /><br />You must use <code>${propName}</code> instead during actual code implementation.`,
      },
    };
  }

  return computedArgTypes;
};

export default withPropMock;
