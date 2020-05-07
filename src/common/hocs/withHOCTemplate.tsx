import React from 'react';
import { wrapDisplayName } from 'recompose';

// Props you want the resulting component to take (besides the props of the wrapped component)
type ExternalProps = {}

// Props the HOC adds to the wrapped component
export type InjectedProps = {}

// Options for the HOC factory that are not dependent on props values
type Options = {}

/**
 * HOC template meant to be duplicated to build your custom HOC
 * Use this as a utility to save yourself some time
 *
 * @see Inspired from https://gist.github.com/rosskevin/6c103846237ecbc77862ea0f3218187d
 */
const withHOCTemplate = ({}: Options = {}) => <OriginalProps extends {}>(
  WrappedComponent: React.ComponentType<OriginalProps & InjectedProps>,
): React.ComponentClass<OriginalProps> => {
  class WithHOCTemplate extends React.Component<OriginalProps & ExternalProps> {
    render(): JSX.Element {
      console.log('WithHOCTemplate props', this.props);

      return (
        <WrappedComponent {...this.props} />
      );
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    (WithHOCTemplate as any).displayName = wrapDisplayName(WrappedComponent, 'withoutNoisySSG');
  }

  return WithHOCTemplate;
};

export default withHOCTemplate;
