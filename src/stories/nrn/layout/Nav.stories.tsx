import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React from 'react';
import Nav, { Props } from '@/layouts/base/components/BaseNav';

export default {
  title: 'Next Right Now/Layout/Nav',
  component: Nav,
  argTypes: {},
} as Meta;

export const DefaultExample: Story<Props> = () => {
  return (
    <Nav />
  );
};
