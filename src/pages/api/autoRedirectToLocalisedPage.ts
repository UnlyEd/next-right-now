import {
  NextApiRequest,
  NextApiResponse,
} from 'next';

import localeMiddleware from '../../middlewares/localeMiddleware';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => localeMiddleware(req, res);

