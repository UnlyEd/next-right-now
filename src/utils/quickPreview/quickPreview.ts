import { IncomingMessage } from 'http';
import includes from 'lodash.includes';

export const QUICK_PREVIEW_URL_PATTERN = '/quick-preview/';

/**
 * Returns whether the current request is a quick-preview.
 *
 * A quick-preview is meant to be used through an external CSM (e.g: Airtable) to preview pages from within the CMS.
 * It is different from the Next.js "Preview mode", which is a SSG-only feature.
 *
 * @param req
 */
export const isQuickPreviewRequest = (req: IncomingMessage): boolean => {
  return includes(req?.url, QUICK_PREVIEW_URL_PATTERN);
};
