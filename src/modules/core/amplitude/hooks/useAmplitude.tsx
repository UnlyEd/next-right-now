import React from 'react';
import amplitudeContext, { AmplitudeContext } from '../context/amplitudeContext';

export type Amplitude = AmplitudeContext

/**
 * Hook to access amplitude data
 *
 * Uses amplitudeContext internally (provides an identical API)
 *
 * This hook should be used by components in favor of amplitudeContext directly,
 * because it grants higher flexibility if you ever need to change the implementation (e.g: use something else than React.Context, like Redux/MobX/Recoil)
 *
 * @see https://slides.com/djanoskova/react-context-api-create-a-reusable-snackbar#/11
 */
const useAmplitude = (): Amplitude => {
  return React.useContext(amplitudeContext);
};

export default useAmplitude;
