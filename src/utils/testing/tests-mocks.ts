import { TFunction } from 'i18next';
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

/**
 * Mock the I18next T function ("translation").
 * Does nothing but returning the default translation, or the key.
 *
 * @param key
 * @param defaultTranslation
 */
export const t: TFunction = (key: string, defaultTranslation: string) => {
  return defaultTranslation || key;
};
