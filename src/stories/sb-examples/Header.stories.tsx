// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React from 'react';

import {
  Header,
  HeaderProps,
} from './Header';

export default {
  title: 'Storybook/Default examples/Header',
  component: Header,
} as Meta;

const Template: Story<HeaderProps> = (args) => <Header {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  user: {},
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
