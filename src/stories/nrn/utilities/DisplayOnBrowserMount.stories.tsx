import { Meta } from '@storybook/react/types-6-0';
import React from 'react';
import DisplayOnBrowserMount, { Props } from '../../../components/rehydration/DisplayOnBrowserMount';

export default {
  title: 'Utilities/DisplayOnBrowserMount',
  component: DisplayOnBrowserMount,
  argTypes: {},
} as Meta;

export const DefaultExample: React.VFC<Props> = () => {
  return (
    <DisplayOnBrowserMount>
      This will be displayed only on the browser.<br />
      The server will not render it.
    </DisplayOnBrowserMount>
  );
};
