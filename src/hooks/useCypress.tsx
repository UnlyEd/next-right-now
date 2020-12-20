import React from 'react';
import cypressContext, { CypressContext } from '../stores/cypressContext';

/**
 * Hook to access Cypress data.
 */
const useCypress = (): CypressContext => {
  return React.useContext(cypressContext);
};

export default useCypress;
