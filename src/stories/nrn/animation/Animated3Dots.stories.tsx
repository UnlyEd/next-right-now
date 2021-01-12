import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React from 'react';
import Animated3Dots, { Props } from '../../../components/svg/Animated3Dots';

export default {
  title: 'Next Right Now/Animation/Animated3Dots',
  component: Animated3Dots,
  argTypes: {},
} as Meta;

export const Animation: Story<Props> = () => <Animated3Dots fill={'blue'} />;
