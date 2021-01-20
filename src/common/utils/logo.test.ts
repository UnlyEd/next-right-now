import {
  generateSizes,
  toPixels,
} from './logo';

/**
 * @group unit
 * @group utils
 */
describe('utils/assets/logo.ts', () => {
  describe('toPixels', () => {
    test('should convert to pixels correctly', async () => {
      expect(toPixels(0)).toEqual('0px');
      expect(toPixels(10)).toEqual('10px');
      expect(toPixels(459.56)).toEqual('459.56px');
    });

    // Edge cases, not handled yet
    test('should convert to pixels incorrectly (edge cases)', async () => {
      expect(toPixels(null)).toEqual(null);
      // @ts-ignore-error
      expect(toPixels()).toEqual(undefined);
      expect(toPixels('string')).toEqual('string');
      expect(toPixels('50')).toEqual('50');
    });
  });

  describe('generateSizes', () => {
    test('should generate the logo for every size', async () => {
      const baseWidth = 120;
      const baseHeight = 60;

      expect(generateSizes({ baseWidth, baseHeight })).toEqual(
        {
          'xs': {
            'height': '30px',
            'width': '60px',
          },
          'sm': {
            'height': '45px',
            'width': '90px',
          },
          'md': {
            'height': '60px',
            'width': '120px',
          },
        },
      );
    });
  });
});
