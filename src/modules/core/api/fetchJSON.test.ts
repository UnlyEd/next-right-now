import fetchJSON from './fetchJSON';

/**
 * @group unit
 * @group utils
 */
describe(`utils/api/fetchJSON.ts`, () => {
  describe(`fetchJSON`, () => {
    test(`should have a globally available "fetch" object (polyfilled from "./jest.setup.js")`, async () => {
      expect(fetch).toBeDefined();
    });
  });
});
