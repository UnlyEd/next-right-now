/**
 * User data stored in the semi-persistent session
 *
 * We use cookies to store our persistent session (instead of browser LocalStorage), so that we may use them from both the client and the server
 *
 * XXX "semi-persistent" stand for "persistent, but may be lost"
 *  As this session is stored in the browser cookies, it may be reused, or it may be lost the next time the user comes back
 */
export type UserSemiPersistentSession = {
  id: string;
  deviceId: string;
}

/**
 * Patched user data
 *
 * Allow any property allowed in UserSemiPersistentSession,
 * but omit and override those that are required and aren't meant to be updated
 */
export type PatchedUserSemiPersistentSession = {
  // Remove all properties that aren't meant to be overridden
  // Optionally override required properties to make them optional in the patch
} & Omit<UserSemiPersistentSession, 'id' | 'deviceId'>
