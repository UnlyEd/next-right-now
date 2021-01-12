import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React from 'react';
import AnimatedTextBubble, { Props } from '../../../components/svg/AnimatedTextBubble';

export default {
  title: 'Next Right Now/Animation/AnimatedTextBubble',
  component: AnimatedTextBubble,
  argTypes: {},
} as Meta;

export const Animation: Story<Props> = () => <AnimatedTextBubble fill={'blue'} />;
