import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React from 'react';
import Btn, { Props } from '../../../components/utils/Btn';

type PropsWithChildrenMock = Props & {
  _sbChildrenMock?: string;
};

export default {
  title: 'Next Right Now/Form/Btn',
  component: Btn,
  argTypes: {
    children: {
      table: {
        disable: false,
      },
    },
    _sbChildrenMock: {
      description: `Children mock.<br /><br /><i>This property doesn't really exist in the component.<br />It is made available to help manipulate the <code>children</code> from Storybook</i>.<br /><br />You must use <code>children</code> instead during actual code implementation.`,
    },
  },
} as Meta;

const Template: Story<PropsWithChildrenMock> = (props) => {
  const { _sbChildrenMock } = props;

  return (
    // @ts-ignore
    <Btn
      {...props}
      onClick={(): void => console.info('Click')}
    >
      {_sbChildrenMock || 'Default text'}
    </Btn>
  );
};

export const DynamicExample: Story<PropsWithChildrenMock> = Template.bind({});
DynamicExample.args = {
  _sbChildrenMock: 'Hello',
};
