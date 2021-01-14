import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React from 'react';
import Btn, { Props } from '../../../components/utils/Btn';

type PropsWithText = Props & { text?: string };

export default {
  title: 'Next Right Now/Form/Btn',
  component: Btn,
  argTypes: {
    children: {
      control: {
        disable: true,
      },
    },
  }
} as Meta;

const Template: Story<PropsWithText> = (props) => {
  const { text = 'Default text' } = props;

  return (
    // @ts-ignore
    <Btn
      {...props}
      onClick={(): void => console.info('Click')}
    >
      {text}
    </Btn>
  );
};

export const BtnDynamicExample: Story<Props> = Template.bind({});

export const BtnDynamicTextExample: Story<PropsWithText> = Template.bind({});
BtnDynamicTextExample.args = {
  text: 'Hello',
};
