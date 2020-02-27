// @ts-ignore
// eslint-disable-next-line no-console
const originalError = console.error;

// eslint-disable-next-line no-console
console.error = (...args): void => {
  if (/Warning.*Function components cannot be given refs/.test(args[0])) {
    // HACK: Muting error, fix as soon as https://github.com/zeit/next.js/issues/7915 gets resolved
    return;
  }
  originalError.call(console, ...args);
};

// eslint-disable-next-line no-console
console.warn = (...args): void => {
  if (/Warning.*componentWillMount has been renamed, and is not recommended for use/.test(args[0])) {
    // HACK: Muting warning, fix as soon as https://github.com/amplitude/react-amplitude/issues/19 gets resolved
    return;
  } else if (/Warning.*componentWillReceiveProps has been renamed, and is not recommended for use/.test(args[0])) {
    // HACK: Muting warning, fix as soon as https://github.com/amplitude/react-amplitude/issues/19 gets resolved
    return;
  } else if (/Warning.*componentWillMount has been renamed, and is not recommended for use/.test(args[0])) {
    // HACK: Muting warning, fix as soon as https://github.com/amplitude/react-amplitude/issues/19 gets resolved
    return;
  }
  originalError.call(console, ...args);
};
