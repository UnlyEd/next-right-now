/**
 * Declare our interesting environment variables.
 * Enables auto-completion when using "process.env.".
 *
 * @see https://stackoverflow.com/a/53981706/2391795
 */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      NEXT_PUBLIC_APP_STAGE: 'development' | 'staging' | 'production';
      NEXT_PUBLIC_NRN_PRESET: string;
      NEXT_PUBLIC_CUSTOMER_REF: string;
      NEXT_PUBLIC_LOCIZE_PROJECT_ID: string;
      NEXT_PUBLIC_AMPLITUDE_API_KEY: string;
      GRAPHQL_API_ENDPOINT: string;
      GRAPHQL_API_KEY: string;
      LOCIZE_API_KEY: string;
      SENTRY_DSN: string;
      ANALYZE_BUNDLE: string;
      UNLY_SIMPLE_LOGGER_ENV: NEXT_PUBLIC_APP_STAGE;
    }
  }
}

// Trick to make this a valid module:
// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
