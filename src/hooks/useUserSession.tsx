import React from 'react';
import userSessionContext, { UserSessionContext } from '../stores/userSessionContext';

export type UserSession = UserSessionContext

/**
 * Hook to access the user session data
 *
 * Uses userSessionContext internally (provides an identical API)
 *
 * This hook should be used by components in favor of userSessionContext directly,
 * because it grants higher flexibility if you ever need to change the implementation (e.g: use something else than React.Context, like Redux/MobX/Recoil)
 *
 * @see https://slides.com/djanoskova/react-context-api-create-a-reusable-snackbar#/11
 */
const useUserSession = (): UserSession => {
  return React.useContext(userSessionContext);
};

export default useUserSession;
