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
      tsconfig: 'tsconfig.jest.json',
    },
  },

  /**
   * Map our module path aliases, so that Jest can understand modules loaded using "@/common" and load the proper file.
   * Required, or Jest will fail to import dependencies from tests.
   *
   * XXX The below list must match `tsconfig.json:compilerOptions.paths`, so the Next.js app and Jest resolve all aliases the same way.
   *
   * @see https://nextjs.org/docs/advanced-features/module-path-aliases
   * @see https://github.com/ilearnio/module-alias/issues/46#issuecomment-546154015
   */
  moduleNameMapper: {
    '^@/app/(.*)$': '<rootDir>/src/app/$1',
    '^@/common/(.*)$': '<rootDir>/src/common/$1',
    '^@/components/(.*)$': '<rootDir>/src/common/components/$1',
    '^@/utils/(.*)$': '<rootDir>/src/common/utils/$1',
    '^@/layouts/(.*)$': '<rootDir>/src/layouts/$1',
    '^@/modules/(.*)$': '<rootDir>/src/modules/$1',
    '^@/pages/(.*)$': '<rootDir>/src/pages/$1',
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
