import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React from 'react';
import Tooltip, { Props } from '../../../components/overlay/Tooltip';

export default {
  title: 'Next Right Now/Overlay/Tooltip',
  component: Tooltip,
  argTypes: {},
} as Meta;

export const Animation: Story<Props> = () => {
  return (
    <Tooltip
      overlay={<span>Tooltip!</span>}
    >
      <span>Hover me</span>
    </Tooltip>
  );
};
