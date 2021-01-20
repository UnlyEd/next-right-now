import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React from 'react';
import AnimatedTextBubble, { Props } from '@/common/components/animations/AnimatedTextBubble';

export default {
  title: 'Next Right Now/Animation/AnimatedTextBubble',
  component: AnimatedTextBubble,
  argTypes: {
    fill: {
      control: 'color',
    },
  },
} as Meta;

export const DefaultExample: Story<Props> = (props) => <AnimatedTextBubble {...props} />;
DefaultExample.args = {
  fill: 'blue',
};
