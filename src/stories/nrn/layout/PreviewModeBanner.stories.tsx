import PreviewModeBanner from '@/modules/core/previewMode/components/PreviewModeBanner';
import { GetFCProps } from '@/modules/core/ts/types/GetFCProps';
import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React from 'react';

type Props = GetFCProps<typeof PreviewModeBanner>;

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
