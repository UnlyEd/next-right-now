import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React from 'react';
import Animated3Dots, { Props } from '@/common/components/animations/Animated3Dots';

export default {
  title: 'Next Right Now/Animation/Animated3Dots',
  component: Animated3Dots,
  argTypes: {
    fill: {
      control: 'color',
    },
  },
} as Meta;

export const DefaultExample: Story<Props> = (props) => <Animated3Dots {...props} />;
DefaultExample.args = {
  fill: 'blue',
};
