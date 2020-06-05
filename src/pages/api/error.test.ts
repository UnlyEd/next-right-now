import { NextApiRequest, NextApiResponse } from 'next';

import { mockRequest, mockResponse } from '../../utils/testing/tests-mocks';
import error from './error';

describe('error', () => {
  beforeEach(() => {
    // Silent console log (used by logger.warn)
    // @ts-ignore-error
    global.console = { warn: jest.fn(), log: jest.fn() };
  });

  test('should be a function', async () => {
    expect(error).toBeInstanceOf(Function);
  });

  test('should return expected variables', async () => {
    const req: NextApiRequest = mockRequest({}, {});
    const res: NextApiResponse = mockResponse();
    await error(req, res);

    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ // https://stackoverflow.com/a/55569458/2391795
      error: true,
      message: process.env.NEXT_PUBLIC_APP_STAGE === 'production' ? undefined : 'Fake error - Sentry test from /api/error',
    }));
  });
});
