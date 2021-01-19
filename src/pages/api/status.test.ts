import {
  mockRequest,
  mockResponse,
} from '@/modules/core/testing/mocks/tests-mocks';
import {
  NextApiRequest,
  NextApiResponse,
} from 'next';
import status from './status';

/**
 * @group unit
 * @group api
 */
describe('status', () => {
  test('should be a function', async () => {
    expect(status).toBeInstanceOf(Function);
  });

  test('should return expected variables', async () => {
    const req: NextApiRequest = mockRequest({}, { param1: 'test-sentry-reporting-context' });
    const res: NextApiResponse = mockResponse();
    await status(req, res);

    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ // https://stackoverflow.com/a/55569458/2391795
      environment: 'test', // Only test the environment, as other variables won't be defined locally when running tests (should use e2e to test actual execution context)
    }));
  });
});
