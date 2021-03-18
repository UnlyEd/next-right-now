import Loader from '@/common/components/animations/Loader';
import { GetFCProps } from '@/modules/core/ts/types/GetFCProps';
import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React from 'react';

type Props = GetFCProps<typeof Loader>;

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
