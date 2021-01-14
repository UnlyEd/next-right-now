import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React from 'react';
import Code, { Props } from '../../../components/utils/Code';

export default {
  title: 'Next Right Now/Data display/Code',
  component: Code,
  argTypes: {},
} as Meta;

export const DefaultExample: Story<Props> = () => {
  return (
    <Code
      text={`
        import { css } from '@emotion/react';
        import React from 'react';
        import AnimatedLoader from '../svg/AnimatedLoader';

        export type Props = {}

        const Loader: React.FunctionComponent<Props> = (props): JSX.Element => {
          return (
            <div
              css={css\`
                justify-content: center;
                text-align: center;
                margin-left: auto;
                margin-right: auto;
              \`}
            >
              <AnimatedLoader />
            </div>
          );
        };

        export default Loader;

      `}
    />
  );
};
