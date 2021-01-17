import tinycolor from 'tinycolor2';

/**
 * Resolves the variant color of another color by applying an alpha on it.
 *
 * @param color
 * @param alpha
 */
export const resolveVariantColor = (color: string, alpha = 0.2): string => {
  return tinycolor(color).setAlpha(alpha).toString();
};
