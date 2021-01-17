import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React from 'react';
import BubbleTimer, { Props } from '@/common/components/dataDisplay/BubbleTimer';

export default {
  title: 'Next Right Now/Animation/BubbleTimer',
  component: BubbleTimer,
  argTypes: {},
} as Meta;

export const DefaultExample: Story<Props> = (props) => {
  const { duration } = props;

  return (
    <BubbleTimer
      {...props}
    >
      <p>Content displayed after {duration}ms has passed.</p>
    </BubbleTimer>
  );
};
DefaultExample.args = {
  fill: 'blue',
  duration: 2000,
};
