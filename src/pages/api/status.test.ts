import { NowRequest, NowResponse } from '@now/node/dist';

import { mockRequest, mockResponse } from '../../utils/tests-mocks';
import status from './status';

describe('status', () => {
  test('should be a function', async () => {
    expect(status).toBeInstanceOf(Function);
  });

  test('should return expected variables', async () => {
    // @ts-ignore
    const req: NowRequest = mockRequest({}, {param1: 'test-sentry-reporting-context'});
    const res: NowResponse = mockResponse();
    await status(req, res);

    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ // https://stackoverflow.com/a/55569458/2391795
      environment: 'test', // Only test the environment, as other variables won't be defined locally when running tests (should use e2e to test actual execution context)
    }));
  });
});
