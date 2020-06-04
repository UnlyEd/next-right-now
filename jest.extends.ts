import { toMatchOneOf, toMatchShapeOf } from 'jest-to-match-shape-of'; // See https://www.npmjs.com/package/jest-to-match-shape-of

// Extend Jest "expect" function
expect.extend({
  toMatchOneOf,
  toMatchShapeOf,
});
