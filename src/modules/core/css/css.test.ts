import { cssToReactStyle } from './css';

/**
 * @group unit
 * @group utils
 */
describe(`utils/css.ts`, () => {
  describe(`cssToReactStyle`, () => {
    describe(`should convert to react style object correctly`, () => {
      test(`when using multiple rules but doesn't end with a ";"`, async () => {
        expect(cssToReactStyle(`border-width: 5px; padding: 8px 10px`)).toEqual({ borderWidth: `5px`, padding: `8px 10px` });
      });

      test(`when using multiple rules that end with a ";"`, async () => {
        expect(cssToReactStyle(`border-width: 5px; padding: 8px 10px;`)).toEqual({ borderWidth: `5px`, padding: `8px 10px` });
      });

      test(`when using one rule that ends with a ";"`, async () => {
        expect(cssToReactStyle(`border-width: 5px;`)).toEqual({ borderWidth: `5px` });
      });

      test(`when using one rule that doesn't end with a ";"`, async () => {
        expect(cssToReactStyle(`border-width: 5px`)).toEqual({ borderWidth: `5px` });
      });
    });
  });
});
