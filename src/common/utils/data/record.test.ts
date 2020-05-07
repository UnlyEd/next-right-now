import {
  FallbackConfig, FallbackConfigTransformProps, filterSelectedRecords, getValue, getValueFallback, hasValue, NOT_FOUND, Record, STRATEGY_DO_NOTHING,
} from './record';

describe('utils/record.ts', () => {
  beforeEach(() => {
    // Silent console log (used by logger.warn)
    // @ts-ignore
    global.console = { warn: jest.fn(), log: jest.fn() };
  });

  describe('hasValue', () => {
    test('should return false when the given value is not defined', async () => {
      const item: Record = {
        '': '',
        emptyObject: {},
        emptyArray: [],
        null: null,
        notFound: NOT_FOUND,
        htmlEmptyParagraph: '<p></p>',
      };

      // @ts-ignore
      expect(hasValue(item)).toEqual(false);
      expect(hasValue(item, null)).toEqual(false);
      expect(hasValue(item, undefined)).toEqual(false);
      expect(hasValue(item, '')).toEqual(false);
      expect(hasValue(item, 'emptyObject')).toEqual(false);
      expect(hasValue(item, 'emptyArray')).toEqual(false);
      expect(hasValue(item, 'null')).toEqual(false);
      expect(hasValue(item, 'notFound')).toEqual(false);
      expect(hasValue(item, 'htmlEmptyParagraph')).toEqual(false);
    });

    // Edge cases, not handled yet
    test('should return true when the given value is defined', async () => {
      const item: Record = {
        string: 'string',
        string2: '0',
        string3: '-1',
        object: { a: 0 },
        object2: { 0: 0 },
        object3: { '': 0 },
        array: [0],
        array1: [1],
        array2: [-1],
        htmlParagraph: '<p>a</p>',
      };

      expect(hasValue(item, 'string')).toEqual(true);
      expect(hasValue(item, 'string2')).toEqual(true);
      expect(hasValue(item, 'string3')).toEqual(true);
      expect(hasValue(item, 'object')).toEqual(true);
      expect(hasValue(item, 'object2')).toEqual(true);
      expect(hasValue(item, 'object3')).toEqual(true);
      expect(hasValue(item, 'array')).toEqual(true);
      expect(hasValue(item, 'array1')).toEqual(true);
      expect(hasValue(item, 'array2')).toEqual(true);
      expect(hasValue(item, 'htmlParagraph')).toEqual(true);
    });
  });

  describe('getValue', () => {
    test('should return null when the given key is not defined without logging the error (with STRATEGY_DO_NOTHING)', async () => {
      const item: Record = {
        false: false,
        true: true,
        empty: '',
        0: 0,
      };

      expect(getValue(item, 'notThere', null, STRATEGY_DO_NOTHING)).toEqual(null);
      expect(getValue(item, 'notThereEither', null, STRATEGY_DO_NOTHING)).toEqual(null);
      expect(getValue(item, '1', null, STRATEGY_DO_NOTHING)).toEqual(null);
      expect(getValue(item, '_', null, STRATEGY_DO_NOTHING)).toEqual(null);
      expect(getValue(item, '', null, STRATEGY_DO_NOTHING)).toEqual(null);
      expect(getValue(item, null, null, STRATEGY_DO_NOTHING)).toEqual(null);
      // @ts-ignore
      expect(getValue(item, 50.5, null, STRATEGY_DO_NOTHING)).toEqual(null);
      // @ts-ignore
      expect(getValue(item, {}, null, STRATEGY_DO_NOTHING)).toEqual(null);
      // @ts-ignore
      expect(getValue(item, { 0: 0 }, null, STRATEGY_DO_NOTHING)).toEqual(null);
      // @ts-ignore
      expect(getValue(item, 0, null, STRATEGY_DO_NOTHING)).toEqual(null);
      expect(console.log).not.toBeCalled();
    });

    test('should return null when the given key is not defined and log the error (without STRATEGY_DO_NOTHING)', async () => {
      const item: Record = {
        false: false,
        true: true,
        empty: '',
        0: 0,
      };

      expect(getValue(item, 'notThere')).toEqual(null);
      expect(console.log).toBeCalled();
      expect(getValue(item, 'notThereEither')).toEqual(null);
      expect(console.log).toBeCalled();
      expect(getValue(item, '1')).toEqual(null);
      expect(console.log).toBeCalled();
      expect(getValue(item, '_')).toEqual(null);
      expect(console.log).toBeCalled();
      expect(getValue(item, '')).toEqual(null);
      expect(console.log).toBeCalled();
      expect(getValue(item, null)).toEqual(null);
      expect(console.log).toBeCalled();
      // @ts-ignore
      expect(getValue(item, 50.5)).toEqual(null);
      expect(console.log).toBeCalled();
      // @ts-ignore
      expect(getValue(item, {})).toEqual(null);
      expect(console.log).toBeCalled();
      // @ts-ignore
      expect(getValue(item, { 0: 0 })).toEqual(null);
      expect(console.log).toBeCalled();
      // @ts-ignore
      expect(getValue(item, 0)).toEqual(null);
      expect(console.log).toBeCalled();
    });

    test('should return the expected value when the given value is defined (with multi depths)', async () => {
      const item: Record = {
        // @ts-ignore
        string: 'string',
        string2: '0',
        string3: '-1',
        object: { a: 0 },
        object2: { 0: 0 },
        object3: { '': 0 },
        array: [0],
        array1: [1],
        array2: [-1],
        htmlParagraph: '<p>a</p>',
        htmlParagraphEmpty: '<p></p>',
        objectDeep1: { 'a': { a: 2 } },
        objectDeep2: { 1: { a: [0] } },
        objectDeep3: { '-99': { a: [{ b: { c: 5 } }] } },
      };

      expect(getValue(item, 'string')).toEqual('string');
      expect(getValue(item, 'string2')).toEqual('0');
      expect(getValue(item, 'string3')).toEqual('-1');
      expect(getValue(item, 'object')).toMatchObject({ a: 0 });
      expect(getValue(item, 'object2')).toMatchObject({ 0: 0 });
      expect(getValue(item, 'object3')).toMatchObject({ '': 0 });
      expect(getValue(item, 'array')).toEqual([0]);
      expect(getValue(item, 'array1')).toEqual([1]);
      expect(getValue(item, 'array2')).toEqual([-1]);
      expect(getValue(item, 'htmlParagraph')).toEqual('<p>a</p>');
      expect(getValue(item, 'htmlParagraphEmpty')).toEqual('<p></p>');
      expect(getValue(item, 'objectDeep1.a.a')).toEqual(2);
      expect(getValue(item, 'objectDeep2.1.a')).toEqual([0]);
      expect(getValue(item, 'objectDeep2.1.a[0]')).toEqual(0);
      expect(getValue(item, 'objectDeep3.-99.a[0].b')).toMatchObject({ c: 5 });
      expect(getValue(item, 'objectDeep3.-99.a[0].b["c"]')).toEqual(5);
      expect(console.log).not.toBeCalled();
    });
  });

  describe('getValueFallback', () => {
    test('should return the expected value when given a proper "fallbacks" to fallback from (1 fallbacks)', async () => {
      const fallbacks: Array<FallbackConfig> = [
        {
          record: {
            a: 1, // XXX Should be considered as valid value and stop the loop
          },
          key: 'a',
        },
      ];

      expect(getValueFallback(fallbacks)).toEqual(1);
      expect(console.log).not.toBeCalled();
    });

    test('should return the expected value when given a proper "fallbacks" to fallback from (2 fallbacks)', async () => {
      // @ts-ignore
      const fallbacks: Array<FallbackConfig> = [
        {
          record: {
            a: null, // Should not be considered as a valid value (go to next next fallback)
          },
          key: 'a',
        },
        {
          record: {
            a: 1, // XXX Should be considered as valid value and stop the loop
          },
          key: 'a',
        },
      ];

      expect(getValueFallback(fallbacks)).toEqual(1);
      expect(console.log).not.toBeCalled();
    });

    test('should return the expected value when given a proper "fallbacks" to fallback from (3 fallbacks)', async () => {
      // @ts-ignore
      const fallbacks: Array<FallbackConfig> = [
        {
          record: {
            a: null, // Should not be considered as a valid value (go to next next fallback)
          },
          key: 'a',
        },
        {
          record: {
            a: undefined, // Should not be considered as a valid value (go to next next fallback)
          },
          key: 'a',
        },
        {
          record: {
            a: 1, // XXX Should be considered as valid value and stop the loop
          },
          key: 'a',
        },
      ];

      expect(getValueFallback(fallbacks)).toEqual(1);
      expect(console.log).not.toBeCalled();
    });

    test('should return the expected value when given a proper "fallbacks" to fallback from (4 fallbacks)', async () => {
      // @ts-ignore
      const fallbacks: Array<FallbackConfig> = [
        {
          record: {
            a: null, // Should not be considered as a valid value (go to next next fallback)
          },
          key: 'a',
        },
        {
          record: {
            a: undefined, // Should not be considered as a valid value (go to next next fallback)
          },
          key: 'a',
        },
        {
          record: {
            a: 1, // XXX Should be considered as valid value and stop the loop
          },
          key: 'a',
        },
        {
          record: {
            a: 2, // Shouldn't be tested against
          },
          key: 'a',
        },
      ];

      expect(getValueFallback(fallbacks)).toEqual(1);
      expect(console.log).not.toBeCalled();
    });

    test('should return the expected value when given a proper "fallbacks" to fallback from (4 fallbacks bis)', async () => {
      // @ts-ignore
      const fallbacks: Array<FallbackConfig> = [
        {
          record: {
            a: '', // Should not be considered as a valid value (go to next next fallback)
          },
          key: 'a',
        },
        {
          record: {
            a: 0, // Should not be considered as a valid value (go to next next fallback)
          },
          key: 'a',
        },
        {
          record: {
            a: 1, // XXX Should be considered as valid value and stop the loop
          },
          key: 'a',
        },
        {
          record: {
            a: 2, // Shouldn't be tested against
          },
          key: 'a',
        },
      ];

      expect(getValueFallback(fallbacks)).toEqual(1);
      expect(console.log).not.toBeCalled();
    });

    test('should return the default value when given an improper "fallbacks" to fallback from', async () => {
      expect(getValueFallback(null)).toEqual(null);
      expect(console.log).toBeCalled();
      // @ts-ignore
      expect(getValueFallback(1)).toEqual(null);
      expect(console.log).toBeCalled();
      // @ts-ignore
      expect(getValueFallback(0)).toEqual(null);
      expect(console.log).toBeCalled();
      // @ts-ignore
      expect(getValueFallback('')).toEqual(null);
      expect(console.log).toBeCalled();
      // @ts-ignore
      expect(getValueFallback({})).toEqual(null);
      expect(console.log).toBeCalled();
      // @ts-ignore
      expect(getValueFallback({ a: 5 })).toEqual(null);
      expect(console.log).toBeCalled();
      // @ts-ignore
      expect(getValueFallback(-42.00)).toEqual(null);
      expect(console.log).toBeCalled();
      // @ts-ignore
      expect(getValueFallback(NaN)).toEqual(null);
      expect(console.log).toBeCalled();
    });

    test('should return the expected value when given an improper "fallbacks" to fallback from', async () => {
      expect(getValueFallback(null, 55)).toEqual(55);
      expect(console.log).toBeCalled();
      // @ts-ignore
      expect(getValueFallback(1, 'fallbackValue')).toEqual('fallbackValue');
      expect(console.log).toBeCalled();
      // @ts-ignore
      expect(getValueFallback(0, true)).toEqual(true);
      expect(console.log).toBeCalled();
      // @ts-ignore
      expect(getValueFallback('', false)).toEqual(false);
      expect(console.log).toBeCalled();
      // @ts-ignore
      expect(getValueFallback({}, {})).toMatchObject({});
      expect(console.log).toBeCalled();
      // @ts-ignore
      expect(getValueFallback({ a: 5 }, { a: 5 })).toMatchObject({ a: 5 });
      expect(console.log).toBeCalled();
      // @ts-ignore
      expect(getValueFallback(-42.00, [6])).toEqual([6]);
      expect(console.log).toBeCalled();
      // @ts-ignore
      expect(getValueFallback(NaN, NaN)).toEqual(NaN);
      expect(console.log).toBeCalled();
    });

    test('should log a warning when proper "fallbacks" to fallback from are provided but none matches', async () => {
      const fallbacks: Array<FallbackConfig> = [
        {
          record: {
            a: 50, // Should not be considered as a valid value (go to next next fallback)
          },
          key: 'b',
        },
        {
          record: {
            a: 51, // Should not be considered as a valid value (go to next next fallback), but aren't any left
          },
          key: 'c',
        },
      ];

      expect(getValueFallback(fallbacks, 55)).toEqual(55);
      expect(console.log).toBeCalled();
    });

    test('should apply "transform" to the matching record and have expected props', async () => {
      const fallbacks: Array<FallbackConfig> = [
        {
          record: {
            a: 1, // XXX Should be considered as valid value and stop the loop
          },
          key: 'a',
          transform(value: string | object | any, props: FallbackConfigTransformProps): any {
            return {
              value: value + 'x',
              ...props,
            };
          },
        },
      ];

      expect(getValueFallback(fallbacks, 55).value).toEqual('1x');
      expect(getValueFallback(fallbacks, 55).record).toMatchObject({ a: 1 });
      expect(getValueFallback(fallbacks, 55).fallbacks).toMatchObject(fallbacks);
      expect(getValueFallback(fallbacks, 55).defaultValue).toEqual(55);
      expect(getValueFallback(fallbacks, 55).key).toEqual('a');
      expect(console.log).not.toBeCalled();
    });
  });

  describe('filterSelectedRecords', () => {
    const allRecords: Record[] = [
      { id: '1' },
      { id: '2' },
      { id: '3' },
    ];

    describe('should filter an array of records', () => {
      test('when there is no selected records', async () => {
        expect(filterSelectedRecords(allRecords, [])).toEqual(allRecords);
      });

      test('when there is one selected records', async () => {
        expect(filterSelectedRecords(allRecords, [{ id: '1' }])).toEqual([{ id: '2' }, { id: '3' }]);
      });

      test('when there is many selected records', async () => {
        expect(filterSelectedRecords(allRecords, [{ id: '1' }, { id: '2' }])).toEqual([{ id: '3' }]);
      });

      test('when all records are selected', async () => {
        expect(filterSelectedRecords(allRecords, [{ id: '1' }, { id: '2' }, { id: '3' }])).toEqual([]);
      });
    });
  });

});
