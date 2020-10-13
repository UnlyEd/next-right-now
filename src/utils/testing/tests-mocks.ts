import {
  NextApiRequest,
  NextApiResponse,
} from 'next';

export const mockRequest = (sessionData, body): NextApiRequest => ({
  // @ts-ignore-error
  session: { data: sessionData },
  body,
});

export const mockResponse = (): NextApiResponse => {
  const res: any = {}; // eslint-disable-line @typescript-eslint/no-explicit-any
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};
