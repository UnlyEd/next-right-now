import React, { useState } from 'react';

/**
 * Utility hook to properly handle expected differences between server and browser rendering.
 * Helps to avoid "Text content did not match" warnings, during React rehydration.
 *
 * Similar to "DisplayOnBrowserMount" component, but as a hook.
 *
 * @see https://joshwcomeau.com/react/the-perils-of-rehydration/#abstractions Strongly inspired from useHasMounted
 */
const useHasMounted = (): boolean => {
  const [hasMounted, setHasMounted] = useState<boolean>(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  return hasMounted;
};

export default useHasMounted;
