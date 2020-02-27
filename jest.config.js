module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    // XXX we must specify a custom tsconfig for tests because we need the typescript transform
    //  to transform jsx into js rather than leaving it jsx such as the next build requires.  you
    //  can see this setting in tsconfig.jest.json -> "jsx": "react"
    //  See https://github.com/zeit/next.js/issues/8663
    'ts-jest': {
      tsConfig: 'tsconfig.jest.json',
    },
  },
  modulePathIgnorePatterns: [
    'cypress'
  ]
};
