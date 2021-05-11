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
      GITHUB_DISPATCH_TOKEN: string;
      AIRTABLE_API_KEY: string;
      AIRTABLE_BASE_ID: string;
      IS_SERVER_INITIAL_BUILD: '1' | undefined;
      LOCIZE_API_KEY: string;
      NODE_ENV: 'development' | 'production';
      NEXT_PUBLIC_AMPLITUDE_API_KEY: string;
      NEXT_PUBLIC_APP_BASE_URL: string;
      NEXT_PUBLIC_APP_BUILD_ID: string;
      NEXT_PUBLIC_APP_DOMAIN: string;
      NEXT_PUBLIC_APP_NAME: string;
      NEXT_PUBLIC_APP_NAME_VERSION: string;
      NEXT_PUBLIC_APP_VERSION_RELEASE: string;
      NEXT_PUBLIC_APP_STAGE: 'test' | 'development' | 'staging' | 'production';
      NEXT_PUBLIC_APP_BUILD_TIME: string;
      NEXT_PUBLIC_APP_BUILD_TIMESTAMP: string;
      NEXT_PUBLIC_CUSTOMER_REF: string;
      NEXT_PUBLIC_LOCIZE_PROJECT_ID: string;
      NEXT_PUBLIC_NRN_PRESET: string;
      SENTRY_DSN: string;

      // Git env variables
      GIT_COMMIT_SHA_SHORT: string;
      GIT_COMMIT_SHA: string;
      GIT_COMMIT_REF: string;
      GIT_COMMIT_TAGS: string;

      // Vercel (+ AWS) env variables - See https://vercel.com/docs/environment-variables#system-environment-variables
      AWS_EXECUTION_ENV: string;
      AWS_LAMBDA_FUNCTION_MEMORY_SIZE: string;
      AWS_REGION: string;
      VERCEL: string; // An indicator that the app is deployed and running on Vercel. Example: '1'.
      VERCEL_ENV: string; // The Environment that the app is deployed an running on. The value can be either 'production', 'preview', or 'development'.
      VERCEL_REGION: string; // The ID of the Region where the app is running. Example: 'cdg1'. XXX: This Variable is only exposed during Runtime for Serverless Functions.
      VERCEL_URL: string; // The URL of the deployment. Example: 'my-site-7q03y4pi5.vercel.app'. XXX Do not use. Using NEXT_PUBLIC_APP_DOMAIN is preferred (alias)
      CI: string; // An indicator that the code is running in a Continuous Integration environment. Example: '1'. XXX: This Variable is only exposed during Build Step.

      // Other
      TZ: string; // TimeZone (":UTC")
    }
  }
}

// Trick to make this a valid module:
// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
