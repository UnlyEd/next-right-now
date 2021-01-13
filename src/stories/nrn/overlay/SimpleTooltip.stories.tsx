import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React from 'react';
import SimpleTooltip, { Props } from '../../../components/utils/SimpleTooltip';

export default {
  title: 'Next Right Now/Overlay/SimpleTooltip',
  component: SimpleTooltip,
  argTypes: {},
} as Meta;

export const DefaultExample: Story<Props> = () => {
  return (
    <SimpleTooltip text={`Simple tooltip! My code is (a bit) simpler and can be used in Markdown`}>
      <span>Hover me!</span>
    </SimpleTooltip>
  );
};
