import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React from 'react';
import BubbleTimer, { Props } from '../../../components/utils/BubbleTimer';

export default {
  title: 'Next Right Now/Animation/BubbleTimer',
  component: BubbleTimer,
  argTypes: {},
} as Meta;

export const DefaultExample: Story<Props> = () => {
  const duration = 2000;

  return (
    <BubbleTimer
      fill={'blue'}
      duration={duration}
    >
      <p>Content displayed after {duration}ms has passed.</p>
    </BubbleTimer>
  );
};
