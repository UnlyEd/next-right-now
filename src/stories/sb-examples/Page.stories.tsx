// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React from 'react';
import * as HeaderStories from './Header.stories';

import {
  Page,
  PageProps,
} from './Page';

export default {
  title: 'Storybook/Default examples/Page',
  component: Page,
} as Meta;

const Template: Story<PageProps> = (args) => <Page {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  ...HeaderStories.LoggedIn.args,
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  ...HeaderStories.LoggedOut.args,
};
