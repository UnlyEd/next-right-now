import Code from '@/common/components/dataDisplay/Code';
import { GetFCProps } from '@/modules/core/ts/types/GetFCProps';
import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React from 'react';

type Props = GetFCProps<typeof Code>;

export default {
  title: 'Next Right Now/Data display/Code',
  component: Code,
  argTypes: {},
} as Meta;

const defaultText = `
  import { css } from '@emotion/react';
  import React from 'react';
  import AnimatedLoader from '../svg/AnimatedLoader';

  type Props = {}

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
  }

  export default Loader;
`;

const Template: Story<Props> = (props) => {
  return (
    <Code
      text={defaultText}
      {...props}
    />
  );
};

export const DynamicExample: Story<Props> = Template.bind({});
DynamicExample.args = {
  text: defaultText,
};
