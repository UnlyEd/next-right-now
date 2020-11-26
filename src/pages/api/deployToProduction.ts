import {createLogger} from '@unly/utils-simple-logger';
import {
  NextApiRequest,
  NextApiResponse,
} from 'next';

import Sentry, {configureReq} from '../../utils/monitoring/sentry';

const fileLabel = 'api/deployToProduction';
const logger = createLogger({
  label: fileLabel,
});

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const PRODUCTION_CI_FILE = '.github/workflows/deploy-vercel-production.yml';
  const deploymentRef = 'master'; //TODO
  try {
    configureReq(req);
    console.log('Github token: ', process.env.GITHUB_DISPATCH_TOKEN);
    console.log('Customer: ', process.env.NEXT_PUBLIC_CUSTOMER_REF);
    console.log('ref: ', deploymentRef);

    fetch('https://api.github.com/repos/UnlyEd/next-right-now/actions/workflows').then((plainData) => plainData.json()).then((data) => {
      const [productionWorkflow] = data.workflows.filter((workflow) => workflow.path === PRODUCTION_CI_FILE);
      console.log(`Fetching ${productionWorkflow.url}/dispatches`);
      fetch(`${productionWorkflow.url}/dispatches`, {
        method: 'POST',
        headers: {
          Authorization: `token ${process.env.GITHUB_DISPATCH_TOKEN}`,
          Accept: 'application/vnd.github.v3+json'
        },
        body: JSON.stringify({
          ref: deploymentRef,
          inputs: {
            customer: process.env.NEXT_PUBLIC_CUSTOMER_REF
          }
        })
      }).then((response) => {
        console.log('response: ', response);
        console.log('responseStatus: ', response.status);
      });
    });

    res.json('Hello World !');
  } catch (e) {
    logger.error(e.message);

    Sentry.withScope((scope): void => {
      scope.setTag('fileLabel', fileLabel);
      Sentry.captureException(e);
    });

    res.json({
      error: true,
      message: process.env.NEXT_PUBLIC_APP_STAGE === 'production' ? undefined : e.message,
    });
  }
};
