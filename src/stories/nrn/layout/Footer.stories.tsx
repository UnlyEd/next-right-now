import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React from 'react';
import BaseFooter, { Props } from '@/layouts/base/components/BaseFooter';

export default {
  title: 'Next Right Now/Layout/Footer',
  component: BaseFooter,
  argTypes: {},
} as Meta;

export const DefaultExample: Story<Props> = () => {
  return (
    <BaseFooter />
  );
};
