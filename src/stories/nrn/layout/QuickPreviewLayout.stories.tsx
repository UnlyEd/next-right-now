import { ExplanationTooltipOverlay } from '@/modules/core/previewMode/components/PreviewModeBanner';
import QuickPreviewLayout from '@/layouts/quickPreview/components/QuickPreviewLayout';
import { GetFCProps } from '@/modules/core/ts/types/GetFCProps';
import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React from 'react';

type Props = GetFCProps<typeof QuickPreviewLayout>;

export default {
  title: 'Next Right Now/Layout/QuickPreviewLayout',
  component: QuickPreviewLayout,
  argTypes: {},
} as Meta;

export const DefaultExample: Story<Props> = () => {
  return (
    // @ts-ignore
    <QuickPreviewLayout
      ExplanationTooltipOverlay={ExplanationTooltipOverlay}
      LeftActions={null}
      headProps={{
        seoTitle: 'Some title',
      }}
      pageName={'QuickPreviewLayout.stories'}
    >
      <div>
        Component displayed in quick preview on external 3rd party site
      </div>
    </QuickPreviewLayout>
  );
};
