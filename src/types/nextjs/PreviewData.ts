/**
 * Preview data type, set when preview mode is enabled
 * XXX Currently "unused", doesn't store any data
 *
 * Set to "undefined" when preview mode is disabled (by Next.js)
 * We override any falsy value to "null" to avoid a serialisation issue ("undefined" cannot be serialised)
 *
 * @see https://nextjs.org/docs/advanced-features/preview-mode#step-2-update-getstaticprops
 */
export type PreviewData = null | {};
