import React, {
  useEffect,
  useRef,
} from 'react';

/**
 * Similar to "setInterval", but with hooks.
 * More powerful than setInterval, as the "delay" can be dynamic.
 *
 * @example useInterval(() => { }, 1000);
 *
 * @param callback
 * @param delay
 *
 * @see https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 */
function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      // @ts-ignore
      savedCallback.current();
    }

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
