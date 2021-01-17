import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React from 'react';
import Footer, { Props } from '@/common/components/layouts/Footer';

export default {
  title: 'Next Right Now/Layout/Footer',
  component: Footer,
  argTypes: {},
} as Meta;

export const DefaultExample: Story<Props> = () => {
  return (
    <Footer />
  );
};
