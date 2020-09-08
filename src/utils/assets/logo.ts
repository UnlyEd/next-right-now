import map from 'lodash.map';

import { Logo } from '../../types/data/Logo';
import { GenericObject } from '../../types/GenericObject';

export const SIZE_XS = 'xs';
export const SIZE_SM = 'sm';
export const SIZE_MD = 'md';
export const SIZE_LG = 'lg';
export const SIZE_XL = 'xl';
export const SIZES = [
  SIZE_XS,
  SIZE_SM,
  SIZE_MD,
  SIZE_LG,
  SIZE_XL,
];

export const DEFAULT_SIZES_MULTIPLIERS: SizeMultiplier[] = [
  {
    size: SIZE_XS,
    multiplier: 0.5,
  },
  {
    size: SIZE_SM,
    multiplier: 0.75,
  },
  {
    size: SIZE_MD,
    multiplier: 1,
  },
];

export type Size = {
  width: number | string;
  height: number | string;
}

export type SizeMultiplier = {
  size: string;
  multiplier: number;
}

/**
 * Convert a number to pixels, left strings untouched
 *
 * @param value {string|number} Value to convert to pixels, will be converted to string
 * @example
 * toPixels(50) => '50px'
 * toPixels('50') => '50'
 * toPixels('50px') => '50px'
 *
 * @returns {string}
 */
export const toPixels = (value: number | string): string => {
  if (typeof value === 'number') {
    return `${value}px`;
  }

  return value;
};

/**
 * Generates an array of sizes containing as many sizes as there are DEFAULT_SIZES_MULTIPLIERS, based on a "medium" logo sizes.
 * Each generated size contains a logo data model.
 * Allows for customized image, width, height per size,
 *
 * @param baseWidth {number} Value to use as base for a logo of 'medium' size
 * @param baseHeight {number} Value to use as base for a logo of 'medium' size
 * @param sizesMultipliers
 * @returns {object}
 */
export const generateSizes = ({ baseWidth, baseHeight, sizesMultipliers = DEFAULT_SIZES_MULTIPLIERS }: { baseWidth: number; baseHeight: number; sizesMultipliers?: SizeMultiplier[] }): GenericObject => {
  const sizes = {};

  map(sizesMultipliers, (sizeMultiplier) => {
    sizes[sizeMultiplier.size] = {
      width: toPixels(baseWidth * sizeMultiplier.multiplier),
      height: toPixels(baseHeight * sizeMultiplier.multiplier),
    };
  });

  return sizes;
};

/**
 * Resolve the unknown width/height based on base width/height, using a cross-multiplication
 *
 * @param baseWidth
 * @param baseHeight
 * @param width
 * @param height
 * @returns {{width:}}
 */
export const resolveRatio = ({ baseWidth, baseHeight, width, height }): Size => {
  if (width) {
    // Need to resolve the height
    return {
      width,
      height: toPixels(parseFloat(width) * parseFloat(baseHeight) / parseFloat(baseWidth)),
    };
  } else {
    // Need to resolve the width
    return {
      width: toPixels(parseFloat(height) * parseFloat(baseWidth) / parseFloat(baseHeight)),
      height,
    };
  }
};

/**
 * Resolve the size to apply to a logo, based on whether its height or width was provided.
 * If both are provided, then do not changes them.
 * If none are provided, then use the logo default values.
 * If one of them is provided, then resolves the other value using a cross-multiplication.
 *
 * @param width
 * @param height
 * @param logo
 * @returns {{width: *, height: *}}
 */
export const resolveSize = ({ width, height, logo }: Size & { logo: Logo }): Size => {
  if (width && height) {
    // Both width and height provided, which means we force the logo's size
    return {
      width: width,
      height: height,
    };
  } else if (width) {
    // Only the width is provided, therefore only the width should be set
    return {
      width: width,
      height: resolveRatio({ baseHeight: logo?.thumbnails?.small?.height, baseWidth: logo?.thumbnails?.small?.width, width, height }).height,
    };
  } else if (height) {
    // Only the height is provided, therefore only the height should be set
    return {
      width: resolveRatio({ baseHeight: logo?.thumbnails?.small?.height, baseWidth: logo?.thumbnails?.small?.width, width, height }).width,
      height: height,
    };
  } else {
    // If no height nor width are provided, use the default logo values
    return {
      width: logo?.thumbnails?.small?.width,
      height: logo?.thumbnails?.small?.height,
    };
  }
};
