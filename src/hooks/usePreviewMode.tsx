import React from 'react';
import previewModeContext, { PreviewModeContext } from '../stores/previewModeContext';

export type PreviewMode = PreviewModeContext

/**
 * Hook to access Next.js preview mode data/status
 *
 * Uses previewModeContext internally (provides an identical API)
 *
 * This hook should be used by components in favor of previewModeContext directly,
 * because it grants higher flexibility if you ever need to change the implementation (e.g: use something else than React.Context, like Redux/MobX/Recoil)
 *
 * @see https://nextjs.org/docs/advanced-features/preview-mode
 */
const usePreviewMode = (): PreviewModeContext => {
  return React.useContext(previewModeContext);
};

export default usePreviewMode;
