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
      muteConsoleButLog: () => any;
      unmuteConsole: () => any;
    }
  }
}
