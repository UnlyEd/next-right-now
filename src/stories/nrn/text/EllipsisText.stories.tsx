import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React from 'react';
import EllipsisText, { Props } from '../../../components/utils/EllipsisText';
import withChildrenMock from '../../shared/hocs/withChildrenMock';

type PropsWithChildrenMock = Props & {
  text?: string;
};

export default {
  title: 'Next Right Now/Text/EllipsisText',
  component: EllipsisText,
  argTypes: withChildrenMock({}),
} as Meta;

const Template: Story<PropsWithChildrenMock> = (props) => {
  const { text } = props;

  return (
    // @ts-ignore
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
