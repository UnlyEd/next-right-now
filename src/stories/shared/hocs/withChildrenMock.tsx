import { ArgTypes } from '@storybook/addons/dist/types';

/**
 * HOC options.
 */
type Options = {
  hasChildren?: boolean;
  hasChildrenMock?: boolean;
  childrenMockName?: string;
};

/**
 * Options applied by default.
 */
const defaultOptions: Partial<Options> = {
  hasChildren: true,
  hasChildrenMock: true,
  childrenMockName: 'text',
};

/**
 * Mocks the "argTypes" to automatically disable `children` control and add a mock field (default: `text`) with default documentation.
 * Helps avoid code duplication
 */
const withChildrenMock = (argTypes: ArgTypes, options?: Options): ArgTypes => {
  const {
    hasChildren,
    hasChildrenMock,
    childrenMockName,
  } = { ...defaultOptions, ...options || {} };
  let computedArgTypes: ArgTypes;

  // If there is a "children" property, disable its interactivity
  if (hasChildren) {
    computedArgTypes = {
      ...argTypes,

      /**
       * Disables children control by default, as it's often JSX and not user-friendly.
       * Also, can often crash the app if not proper children is passed down, bad UX.
       */
      children: {
        control: {
          disable: true,
        },
      },
    };

    if (hasChildrenMock) {
      computedArgTypes = {
        ...computedArgTypes,

        /**
         * `children` mock field, meant to replace the `children` prop by providing interactivity (controls enabled).
         * Must be added to the Story `args` with a default value to be interactive.
         *
         * @default text
         */
        [childrenMockName]: {
          description: `<code>children</code> mock.<br /><br /><span className="tip">Mock</span><i>This property doesn't really exist in the component.<br />It is made available to help manipulate the <code>children</code> from Storybook</i>.<br /><br />You must use <code>children</code> instead during actual code implementation.`,
        },
      };
    }

    return computedArgTypes;
  } else {
    return argTypes;
  }
};

export default withChildrenMock;
