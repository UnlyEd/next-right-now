/**
 * This test is meant to detect quickly when required ENV variables are missing.
 * We encourage you to list all your env variables to make sure you detect misconfiguration early.
 *
 * It was added after encountering this particular issue https://github.com/vercel/next.js/issues/13780
 * Where a missing env var would crash the "next build" locally, because of the particular behaviour of the "fetch" package
 * It can be hard to track down such misconfiguration, and it's a good practice to detect those as early as possible (and avoid deploying a misconfigured release)
 *
 * @group integration
 * @group utils
 */
describe(`utils/env/env.ts`, () => {
  describe(`should load env vars properly depending on the environment (NODE_ENV="${process.env.NODE_ENV}")`, () => {
    test(`NEXT_PUBLIC_APP_STAGE`, async () => {
      expect(process.env.NEXT_PUBLIC_APP_STAGE, 'NEXT_PUBLIC_APP_STAGE is not valid').toBeOneOf(['production', 'staging', 'development']);
    });

    test(`NEXT_PUBLIC_NRN_PRESET`, async () => {
      expect(process.env.NEXT_PUBLIC_NRN_PRESET, 'NEXT_PUBLIC_NRN_PRESET must be defined but is not').toStartWith('v');
    });

    test(`NEXT_PUBLIC_LOCIZE_PROJECT_ID`, async () => {
      expect(process.env.NEXT_PUBLIC_LOCIZE_PROJECT_ID, 'NEXT_PUBLIC_LOCIZE_PROJECT_ID must be defined but is not').toBeDefined();
    });

    test(`NEXT_PUBLIC_APP_BUILD_ID`, async () => {
      // This ENV var is injected by Webpack and not available when running the tests suite when building a local build (because webpack hasn't been executed yet)
      if (process.env.NODE_ENV === 'production') {
        expect(process.env.NEXT_PUBLIC_APP_BUILD_ID, 'NEXT_PUBLIC_APP_BUILD_ID must be defined but is not').toBeDefined();
      } else {
        expect(process.env.NEXT_PUBLIC_APP_BUILD_ID, 'NEXT_PUBLIC_APP_BUILD_ID should not be defined when building a non-production release').not.toBeDefined();
      }
    });

    test(`NEXT_PUBLIC_APP_NAME`, async () => {
      // This ENV var is injected by Webpack and not available when running the tests suite when building a local build (because webpack hasn't been executed yet)
      if (process.env.NODE_ENV === 'production') {
        expect(process.env.NEXT_PUBLIC_APP_NAME, 'NEXT_PUBLIC_APP_NAME must be defined but is not').toBeDefined();
      } else {
        expect(process.env.NEXT_PUBLIC_APP_NAME, 'NEXT_PUBLIC_APP_NAME should not be defined when building a non-production release').not.toBeDefined();
      }
    });

    test(`NEXT_PUBLIC_APP_VERSION`, async () => {
      // This ENV var is injected by Webpack and not available when running the tests suite when building a local build (because webpack hasn't been executed yet)
      if (process.env.NODE_ENV === 'production') {
        expect(process.env.NEXT_PUBLIC_APP_VERSION, 'NEXT_PUBLIC_APP_VERSION must be defined but is not').toBeDefined();
      } else {
        expect(process.env.NEXT_PUBLIC_APP_VERSION, 'NEXT_PUBLIC_APP_VERSION should not be defined when building a non-production release').not.toBeDefined();
      }
    });

    test(`NEXT_PUBLIC_APP_VERSION_RELEASE`, async () => {
      // This ENV var is injected by Webpack and not available when running the tests suite when building a local build (because webpack hasn't been executed yet)
      if (process.env.NODE_ENV === 'production') {
        expect(process.env.NEXT_PUBLIC_APP_VERSION_RELEASE, 'NEXT_PUBLIC_APP_VERSION_RELEASE must be defined but is not').toBeDefined();
      } else {
        expect(process.env.NEXT_PUBLIC_APP_VERSION_RELEASE, 'NEXT_PUBLIC_APP_VERSION_RELEASE should not be defined when building a non-production release').not.toBeDefined();
      }
    });

    test(`NEXT_PUBLIC_APP_BUILD_TIME`, async () => {
      // This ENV var is injected by Webpack and not available when running the tests suite when building a local build (because webpack hasn't been executed yet)
      if (process.env.NODE_ENV === 'production') {
        expect(process.env.NEXT_PUBLIC_APP_BUILD_TIME, 'NEXT_PUBLIC_APP_BUILD_TIME must be defined but is not').toBeDefined();
      } else {
        expect(process.env.NEXT_PUBLIC_APP_BUILD_TIME, 'NEXT_PUBLIC_APP_BUILD_TIME should not be defined when building a non-production release').not.toBeDefined();
      }
    });

    test(`NEXT_PUBLIC_APP_BUILD_TIMESTAMP`, async () => {
      // This ENV var is injected by Webpack and not available when running the tests suite when building a local build (because webpack hasn't been executed yet)
      if (process.env.NODE_ENV === 'production') {
        expect(process.env.NEXT_PUBLIC_APP_BUILD_TIMESTAMP, 'NEXT_PUBLIC_APP_BUILD_TIMESTAMP must be defined but is not').toBeDefined();
      } else {
        expect(process.env.NEXT_PUBLIC_APP_BUILD_TIMESTAMP, 'NEXT_PUBLIC_APP_BUILD_TIMESTAMP should not be defined when building a non-production release').not.toBeDefined();
      }
    });
    test(`IS_SERVER_INITIAL_BUILD`, async () => {
      // This ENV var is injected by Webpack and not available when running the tests suite when building a local build (because webpack hasn't been executed yet)
      if (process.env.NODE_ENV === 'production') {
        expect(process.env.IS_SERVER_INITIAL_BUILD, 'IS_SERVER_INITIAL_BUILD is not valid').toEqual('1');
      } else {
        expect(process.env.IS_SERVER_INITIAL_BUILD, 'IS_SERVER_INITIAL_BUILD should not be defined when building a non-production release').not.toBeDefined();
      }
    });

    test(`NEXT_PUBLIC_CUSTOMER_REF`, async () => {
      expect(process.env.NEXT_PUBLIC_CUSTOMER_REF, 'NEXT_PUBLIC_CUSTOMER_REF must be defined but is not').toBeDefined();
    });

    test(`AIRTABLE_API_KEY`, async () => {
      expect(process.env.AIRTABLE_API_KEY, 'AIRTABLE_API_KEY must be defined but is not').toBeDefined();
    });

    test(`AIRTABLE_BASE_ID`, async () => {
      expect(process.env.AIRTABLE_BASE_ID, 'AIRTABLE_BASE_ID must be defined but is not').toBeDefined();
    });

    // XXX Below tests are meant to warn the user about potential misconfiguration of optional variables
    //  If those variables are not defined then the app will still function normally
    //  We do this to avoid forcing people (using NRN as a boilerplate) to have to go through all non-required vendors configuration, before actually deploying anything

    test(`LOCIZE_API_KEY`, async () => {
      if (typeof process.env.LOCIZE_API_KEY === 'undefined') {
        console.warn(`[warning] LOCIZE_API_KEY environment variable isn't defined. This is not critical and the app will still function normally, but you may want to look into this. \nYou can define this variable in ".env.local". You may also disable this warning in "src/utils/env/env.test.ts".`);
      }
      expect(1).toEqual(1);
    });

    test(`SENTRY_DSN`, async () => {
      if (typeof process.env.SENTRY_DSN === 'undefined') {
        console.warn(`[warning] SENTRY_DSN environment variable isn't defined. This is not critical and the app will still function normally, but you may want to look into this. \nYou can define this variable in ".env.local". You may also disable this warning in "src/utils/env/env.test.ts".`);
      }
      expect(1).toEqual(1);
    });
  });
});
