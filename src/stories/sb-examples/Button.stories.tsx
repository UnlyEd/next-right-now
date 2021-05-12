// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React from 'react';

import {
  Button,
  ButtonProps,
} from './Button';

export default {
  title: 'Storybook/Default examples/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Button',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Button',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Button',
};
