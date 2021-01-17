import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React from 'react';
import Loader, { Props } from '@/common/components/animations/Loader';

export default {
  title: 'Next Right Now/Animation/Loader',
  component: Loader,
  parameters: {
    controls: {
      hideNoControlsWarning: true,
    },
  },
} as Meta;

export const DefaultExample: Story<Props> = () => <Loader />;
