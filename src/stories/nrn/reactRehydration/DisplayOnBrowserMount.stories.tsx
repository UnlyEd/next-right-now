import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React from 'react';
import DisplayOnBrowserMount, { Props } from '@/common/components/rehydration/DisplayOnBrowserMount';

export default {
  title: 'Next Right Now/React rehydration/DisplayOnBrowserMount',
  component: DisplayOnBrowserMount,
  argTypes: {},
} as Meta;

export const DefaultExample: Story<Props> = () => {
  return (
    <DisplayOnBrowserMount>
      This will be displayed only on the browser.<br />
      The server will not render it.
    </DisplayOnBrowserMount>
  );
};
