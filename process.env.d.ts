/**
 * Declare known environment variables.
 * Enables auto-completion when using "process.env.".
 * Makes it easier to find env vars, and helps avoid typo mistakes.
 *
 * Unlisted env vars will still be usable.
 *
 * @see https://stackoverflow.com/a/53981706/2391795
 */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // NRN env variables
      AIRTABLE_API_KEY: string;
      AIRTABLE_BASE_ID: string;
      IS_SERVER_INITIAL_BUILD: '1' | undefined;
      LOCIZE_API_KEY: string;
      NODE_ENV: 'development' | 'production';
      NEXT_PUBLIC_AMPLITUDE_API_KEY: string;
      NEXT_PUBLIC_APP_BUILD_ID: string;
      NEXT_PUBLIC_APP_NAME: string;
      NEXT_PUBLIC_APP_VERSION: string;
      NEXT_PUBLIC_APP_NAME_VERSION: string;
      NEXT_PUBLIC_APP_VERSION_RELEASE: string;
      NEXT_PUBLIC_APP_STAGE: 'test' | 'development' | 'staging' | 'production';
      NEXT_PUBLIC_APP_BUILD_TIME: string;
      NEXT_PUBLIC_APP_BUILD_TIMESTAMP: string;
      NEXT_PUBLIC_CUSTOMER_REF: string;
      NEXT_PUBLIC_LOCIZE_PROJECT_ID: string;
      NEXT_PUBLIC_NRN_PRESET: string;
      SENTRY_DSN: string;
      UNLY_SIMPLE_LOGGER_ENV: NEXT_PUBLIC_APP_STAGE;

      // Vendor env variables
      AWS_EXECUTION_ENV: string;
      AWS_LAMBDA_FUNCTION_MEMORY_SIZE: string;
      AWS_REGION: string;
      NOW_REGION: string;

      // Other
      TZ: string; // TimeZone (":UTC")
    }
  }
}

// Trick to make this a valid module:
// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
