import EllipsisText from '@/common/components/dataDisplay/EllipsisText';
import { GetFCProps } from '@/modules/core/ts/types/GetFCProps';
import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React from 'react';
import withPropMock from '../../shared/hocs/withPropMock';

type Props = GetFCProps<typeof EllipsisText>;

type PropsWithChildrenMock = Props & {
  text?: string;
};

export default {
  title: 'Next Right Now/Text/EllipsisText',
  component: EllipsisText,
  argTypes: withPropMock({}),
} as Meta;

const Template: Story<PropsWithChildrenMock> = (props) => {
  const { text } = props;

  return (
    <EllipsisText
      {...props}
    >
      {text || 'Default text'}
    </EllipsisText>
  );
};

export const DynamicExample: Story<PropsWithChildrenMock> = Template.bind({});
DynamicExample.args = {
  text: `Super-long-file-name-because-your-customers-don't-like-to-rename-them.pdf`,
  title: `Super-long-file-name-because-your-customers-don't-like-to-rename-them.pdf`,
};
