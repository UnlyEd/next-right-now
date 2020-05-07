import { NowRequest, NowResponse } from '@now/node';

export const mockRequest = (sessionData, body): NowRequest => ({
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  session: { data: sessionData },
  body,
});

export const mockResponse = (): NowResponse => {
  const res: any = {}; // eslint-disable-line @typescript-eslint/no-explicit-any
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};
