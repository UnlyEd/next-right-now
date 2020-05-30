import { isBrowser } from '@unly/utils';

export const isPreviewModeEnabled = (): boolean => {
  if (isBrowser()) {
    return false;
  }
};
