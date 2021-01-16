import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React from 'react';
import CircleBtn, { Props } from '../../../components/utils/CircleBtn';
import withChildrenMock from '../../shared/hocs/withChildrenMock';

type PropsWithChildrenMock = Props & {
  text?: string;
};

export default {
  title: 'Next Right Now/Data display/CircleBtn',
  component: CircleBtn,
  argTypes: withChildrenMock({}),
} as Meta;

const Template: Story<PropsWithChildrenMock> = (props) => {
  const { text } = props;

  return (
    // @ts-ignore
    <CircleBtn
      {...props}
      onClick={(): void => console.info('Click')}
    >
      {text || 'Default text'}
    </CircleBtn>
  );
};

export const DynamicExample: Story<PropsWithChildrenMock> = Template.bind({});
DynamicExample.args = {
  text: '42',
};
