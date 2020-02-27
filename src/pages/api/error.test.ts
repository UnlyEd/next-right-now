import { NowRequest, NowResponse } from '@now/node/dist';

import { mockRequest, mockResponse } from '../../utils/tests-mocks';
import error from './error';

describe('error', () => {
  beforeEach(() => {
    // Silent console log (used by logger.warn)
    // @ts-ignore
    global.console = { warn: jest.fn(), log: jest.fn() };
  });

  test('should be a function', async () => {
    expect(error).toBeInstanceOf(Function);
  });

  test('should return expected variables', async () => {
    // @ts-ignore
    const req: NowRequest = mockRequest({}, {});
    const res: NowResponse = mockResponse();
    await error(req, res);

    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ // https://stackoverflow.com/a/55569458/2391795
      error: true,
      message: process.env.APP_STAGE === 'production' ? undefined : 'Fake error - Sentry test from /api/error',
    }));
  });
});
