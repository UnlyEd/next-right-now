import React from 'react';

type Props = {
  children: React.ReactElement | React.ReactElement[];
};

/**
 * Utility component to properly handle expected differences between server and browser rendering.
 * Helps to avoid "Text content did not match" warnings, during React rehydration.
 *
 * XXX Use this helper to avoid rendering small UI (presentational) components that depend on browser-related data (e.g: localStorage, cookie, session-related data, etc.)
 *  Do not use this helper to avoid rendering big react Providers, or components who define big part of your UI layout
 *
 * When a React app rehydrates, it assumes that the DOM structure will match.
 * When the React app runs on the client for the first time, it builds up a mental picture of what the DOM should look like, by mounting all of your components.
 * Then it squints at the DOM nodes already on the page, and tries to fit the two together.
 * It's not playing the “spot-the-differences” game it does during a typical update, it's just trying to snap the two together, so that future updates will be handled correctly.
 *
 * If you render something different depending on whether you're on server or browser, you're hacking the system.
 * Because you're rendering one thing on the server, but then telling React to expect something else on the client.
 * And this is what causes "Text content did not match" react warning.
 *
 * To avoid this situation, we use "useEffect", which only fires after the component has mounted.
 * Inside the "useEffect" call, we immediately trigger a re-render, setting hasMounted to true. When this value is true, the "real" content gets rendered.
 * When the React app adapts the DOM during rehydration, useEffect hasn't been called yet, and so we're meeting React's expectation.
 *
 * This process is named "Two pass rendering":
 * The first pass, at compile-time, produces all of the static non-personal content, and leaves holes where the dynamic content will go.
 * Then, after the React app has mounted on the user's device, a second pass stamps in all the dynamic bits that depend on client state.
 * The downside to two-pass rendering is that it can delay time-to-interactive.
 *
 * @param props
 * @see https://joshwcomeau.com/react/the-perils-of-rehydration/#abstractions Strongly inspired by "ClientOnly" abstraction
 * @see https://joshwcomeau.com/react/the-perils-of-rehydration/#two-pass-rendering Two pass rendering and performances implications
 * @see https://twitter.com/Vadorequest/status/1257658553361408002 Discussion with Josh regarding advanced usage
 */
const DisplayOnBrowserMount: React.FunctionComponent<Props> = (props) => {
  const {
    children,
  } = props;
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <>
      {children}
    </>
  );
};

export default DisplayOnBrowserMount;
