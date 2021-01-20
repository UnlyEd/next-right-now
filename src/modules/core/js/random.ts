/**
 * Returns a random number between min (inclusive) and max (exclusive)
 *
 * @see https://stackoverflow.com/a/1527820/2391795
 */
export const getRandomArbitrary = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 *
 * @see https://stackoverflow.com/a/1527820/2391795
 */
export const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
