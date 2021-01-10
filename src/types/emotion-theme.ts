import { CustomerTheme } from './data/CustomerTheme';

/**
 * Emotion theme used thorough the whole application.
 *
 * @see https://emotion.sh/docs/emotion-11#theme-type
 */
declare module '@emotion/react' {
  export interface Theme extends CustomerTheme {
  }
}
