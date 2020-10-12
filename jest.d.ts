import 'jest-extended';

/**
 * Enhance the Node.js environment "global" variable to add our own types
 *
 * @see https://stackoverflow.com/a/42304473/2391795
 */
declare global {
  namespace NodeJS {
    interface Global {
      muteConsole: () => any;
      unmuteConsole: () => any;
    }
  }

  /**
   * Advanced Jest support for custom extends.
   *
   * Those additional utilities must be loaded through jest.extends.ts
   *
   * @see https://medium.com/javascript-in-plain-english/jest-how-to-use-extend-with-typescript-4011582a2217
   */
  namespace jest {
    interface Matchers<R, T> {
      toContainObject(expected: any): R;
    }
  }
}
