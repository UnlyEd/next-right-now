/**
 * Helper to avoid writing `Record<string, unknown>` everywhere you would usually use "object".
 *
 * @example (data: GenericObject) => void
 * @example variables: GenericObject<string>
 *
 * @see https://github.com/typescript-eslint/typescript-eslint/issues/2063#issuecomment-632833366
 */
export type GenericObject<T = unknown> = Record<string, T>;
