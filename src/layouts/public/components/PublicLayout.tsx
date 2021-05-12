import CoreLayout, { Props as CoreLayoutProps } from '@/layouts/core/components/CoreLayout';
import { createLogger } from '@/modules/core/logging/logger';
import React from 'react';

const fileLabel = 'layouts/public/components/PublicLayout';
const logger = createLogger({
  fileLabel,
});

type Props = CoreLayoutProps;

/**
 * Overrides the CoreLayout to adapt it to the Public layout.
 *
 * Hides nav, footer and preview banner.
 */
const PublicLayout: React.FunctionComponent<Props> = (props): JSX.Element => {
  return (
    <CoreLayout
      {...props}
      hideFooter={true}
      hideNav={true}
      hidePreviewBanner={true}
    />
  );
};

export default PublicLayout;
