import {
  findNextItem,
  findPreviousItem,
} from './array';

/**
 * @group unit
 * @group utils
 */
describe(`utils/js/array.ts`, () => {
  const item1 = { a: 1 };
  const item2 = { a: 2 };
  const item3 = { a: 3 };
  const items = [item1, item2, item3];

  describe(`findPreviousItem`, () => {
    describe(`should find the previous item correctly`, () => {
      test(`when the current item is the first one`, async () => {
        expect(findPreviousItem(item1, items)).toMatchObject(item3);
      });

      test(`when the current item is the second one`, async () => {
        expect(findPreviousItem(item2, items)).toMatchObject(item1);
      });

      test(`when the current item is the last one`, async () => {
        expect(findPreviousItem(item3, items)).toMatchObject(item2);
      });
    });
  });

  describe(`findNextItem`, () => {
    describe(`should find the next item correctly`, () => {
      test(`when the current item is the first one`, async () => {
        expect(findNextItem(item1, items)).toMatchObject(item2);
      });

      test(`when the current item is the second one`, async () => {
        expect(findNextItem(item2, items)).toMatchObject(item3);
      });

      test(`when the current item is the last one`, async () => {
        expect(findNextItem(item3, items)).toMatchObject(item1);
      });
    });
  });
});
