import AnimatedTextBubble from '@/common/components/animations/AnimatedTextBubble';
import { GetFCProps } from '@/modules/core/ts/types/GetFCProps';
import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React from 'react';

type Props = GetFCProps<typeof AnimatedTextBubble>;

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
