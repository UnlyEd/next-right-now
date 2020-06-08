import httpMocks from 'node-mocks-http';

import UniversalCookiesManager from './UniversalCookiesManager';

// TODO Couldn't mock server correctly in a way that is compatible with how "cookies" works
//  Needs more tests (browser is properly tested, but not server)

/**
 * @group unit
 * @group utils
 */
describe(`utils/cookies/UniversalCookiesManager.ts`, () => {
  describe(`server`, () => {
    describe(`constructor`, () => {
      test(`should init correctly (req, res)`, async () => {
        const req = httpMocks.createRequest();
        const res = httpMocks.createResponse();
        const universalCookiesManager = new UniversalCookiesManager(req, res);

        // @ts-ignore-error
        expect(universalCookiesManager.req).toBeDefined();
        // @ts-ignore-error
        expect(universalCookiesManager.res).toBeDefined();
      });
    });
  });
});
