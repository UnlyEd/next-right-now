import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React from 'react';
import QuickPreviewBanner, { Props } from '@/modules/core/quickPreview/components/QuickPreviewBanner';

export default {
  title: 'Next Right Now/Layout/QuickPreviewBanner',
  component: QuickPreviewBanner,
  argTypes: {},
} as Meta;

export const DefaultExample: Story<Props> = () => {
  return (
    <QuickPreviewBanner />
  );
};
