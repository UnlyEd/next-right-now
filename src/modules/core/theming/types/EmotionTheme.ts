import { CustomerTheme } from '@/modules/core/data/types/CustomerTheme';

/**
 * Emotion theme used thorough the whole application.
 *
 * @see https://emotion.sh/docs/emotion-11#theme-type
 */
declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends CustomerTheme {
  }
}
