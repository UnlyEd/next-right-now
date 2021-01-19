import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React from 'react';
import PreviewModeBanner, { Props } from '@/modules/core/previewMode/components/PreviewModeBanner';

export default {
  title: 'Next Right Now/Layout/PreviewModeBanner',
  component: PreviewModeBanner,
  argTypes: {},
} as Meta;

export const DefaultExample: Story<Props> = () => {
  return (
    <PreviewModeBanner />
  );
};
