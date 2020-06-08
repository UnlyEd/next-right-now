// "package.json:jest" config cannot be used alongside this config, all Jest config must be centralised in this file - See https://github.com/facebook/jest/issues/10123#issuecomment-638796267
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    // XXX we must specify a custom tsconfig for tests because we need the typescript transform
    //  to transform jsx into js rather than leaving it jsx such as the next build requires.  you
    //  can see this setting in tsconfig.jest.json -> "jsx": "react"
    //  See https://github.com/vercel/next.js/issues/8663
    'ts-jest': {
      tsConfig: 'tsconfig.jest.json',
    },
  },
  modulePathIgnorePatterns: [
    '.next/',
    'cypress',
  ],
  runner: 'groups', // Allow to use jest-runner-groups - See https://github.com/eugene-manuilov/jest-runner-groups#update-jest-config
  setupFilesAfterEnv: [
    'jest-extended', // Extends native "expect" abilities - See https://github.com/jest-community/jest-extended
    'jest-expect-message', // Allows to add additional message when test fails - See https://github.com/mattphillips/jest-expect-message
    './jest.setup.js',
    './jest.extends.ts',
  ],
};
