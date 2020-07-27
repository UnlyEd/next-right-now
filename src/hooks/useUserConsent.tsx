import React from 'react';
import userConsentContext from '../stores/userConsentContext';
import { UserConsent } from '../types/UserConsent';

/**
 * Hook to access the user consent data
 *
 * Uses userConsentContext internally (provides an identical API)
 *
 * This hook should be used by components in favor of userSessionContext directly,
 * because it grants higher flexibility if you ever need to change the implementation (e.g: use something else than React.Context, like Redux/MobX/Recoil)
 *
 * @see https://slides.com/djanoskova/react-context-api-create-a-reusable-snackbar#/11
 */
const useUserConsent = (): UserConsent => {
  return React.useContext(userConsentContext);
};

export default useUserConsent;
