import QuickPreviewBanner from '@/layouts/quickPreview/components/QuickPreviewBanner';
import { GetFCProps } from '@/modules/core/ts/types/GetFCProps';
import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React from 'react';

type Props = GetFCProps<typeof QuickPreviewBanner>;

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
