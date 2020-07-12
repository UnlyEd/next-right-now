import React from 'react';
import i18nContext, { I18nContext } from '../stores/i18nContext';

export type I18n = I18nContext

/**
 * Hook to access i18n/localisation data
 *
 * Uses i18nContext internally (provides an identical API)
 *
 * This hook should be used by components in favor of i18nContext directly,
 * because it grants higher flexibility if you ever need to change the implementation (e.g: use something else than React.Context, like Redux/MobX/Recoil)
 *
 * @see https://slides.com/djanoskova/react-context-api-create-a-reusable-snackbar#/11
 */
const useI18n = (): I18n => {
  return React.useContext(i18nContext);
};

export default useI18n;
