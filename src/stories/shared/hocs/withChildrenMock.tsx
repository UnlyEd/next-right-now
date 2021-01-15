import { ArgTypes } from '@storybook/addons/dist/types';

/**
 * HOC options.
 */
type Options = {
  hasChildren?: boolean;
  childrenMockName?: string;
};

/**
 * Options applied by default.
 */
const defaultOptions: Partial<Options> = {
  hasChildren: true,
  childrenMockName: 'text',
};

/**
 * Mocks the "argTypes" to automatically disable `children` control and add a mock field (default: `text`) with default documentation.
 * Helps avoid code duplication
 */
const withChildrenMock = (argTypes: ArgTypes, options?: Options): ArgTypes => {
  const {
    hasChildren,
    childrenMockName,
  } = { ...defaultOptions, ...options || {} };
  let computedArsTypes: ArgTypes;

  // If there is a "children" property, disable its interactivity
  if (hasChildren) {
    computedArsTypes = {
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


      [childrenMockName]: {
        description: `Children mock.<br /><br /><i>This property doesn't really exist in the component.<br />It is made available to help manipulate the <code>children</code> from Storybook</i>.<br /><br />You must use <code>children</code> instead during actual code implementation.`,
      },
    };

    return computedArsTypes;
  } else {
    return argTypes;
  }
};

export default withChildrenMock;
