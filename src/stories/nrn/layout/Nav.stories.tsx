import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React from 'react';
import ExamplesNav, { Props } from '@/modules/demo/components/ExamplesNav';

export default {
  title: 'Next Right Now/Layout/Nav',
  component: ExamplesNav,
  argTypes: {},
} as Meta;

export const DefaultExample: Story<Props> = () => {
  return (
    <ExamplesNav />
  );
};
