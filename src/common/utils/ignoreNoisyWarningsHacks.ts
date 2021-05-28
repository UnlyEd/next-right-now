// eslint-disable-next-line no-console
const originalError = console.error;

// eslint-disable-next-line no-console
console.error = (...args): void => {
  if (/Warning.*Function components cannot be given refs/.test(args[0])) {
    // XXX Muting error, fix as soon as https://github.com/vercel/next.js/issues/7915 gets resolved
    return;
  } else if (/Warning.*Expected server HTML to contain a matching/.test(args[0]) && /Footer/.test(args[3])) {
    // XXX Silent false-positive warning (server doesn't render that part because it can't on server when using SSG, perfectly normal and not an actual issue)
    return;
  } else if (/Warning: Legacy context API has been detected within a strict-mode tree/.test(args[0]) && /at AmplitudeProvider/.test(args[2])) {
    // XXX Muting warning from AmplitudeProvider (can't do anything about it ourselves), see https://github.com/amplitude/react-amplitude/issues/48
    return;
  } else if (/Warning: %s is deprecated in StrictMode/.test(args[0]) && /reactstrap/.test(args[4])) {
    // XXX Muting warning from Reactstrap (can't do anything about it ourselves)
    return;
  }
  originalError.call(console, ...args);
};

// eslint-disable-next-line no-console
console.warn = (...args): void => {
  if (/Warning.*componentWillMount has been renamed, and is not recommended for use/.test(args[0])) {
    // XXX Muting warning, fix as soon as https://github.com/amplitude/react-amplitude/issues/19 gets resolved
    return;
  } else if (/Warning.*componentWillReceiveProps has been renamed, and is not recommended for use/.test(args[0])) {
    // XXX Muting warning, fix as soon as https://github.com/amplitude/react-amplitude/issues/19 gets resolved
    return;
  } else if (/Warning.*componentWillMount has been renamed, and is not recommended for use/.test(args[0])) {
    // XXX Muting warning, fix as soon as https://github.com/amplitude/react-amplitude/issues/19 gets resolved
    return;
  }
  originalError.call(console, ...args);
};
