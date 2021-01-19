import React from 'react';
import quickPreviewContext, { QuickPreviewContext } from '../contexts/quickPreviewContext';

export type QuickPreview = QuickPreviewContext

/**
 * Hook to access quick-preview data
 *
 * Uses quickPreviewContext internally (provides an identical API)
 *
 * This hook should be used by components in favor of quickPreviewContext directly,
 * because it grants higher flexibility if you ever need to change the implementation (e.g: use something else than React.Context, like Redux/MobX/Recoil)
 *
 * @see https://nextjs.org/docs/advanced-features/preview-mode
 */
const useQuickPreview = (): QuickPreviewContext => {
  return React.useContext(quickPreviewContext);
};

export default useQuickPreview;
