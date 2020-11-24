import React from 'react';
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
} from 'reactstrap';

import Cards from '../utils/Cards';
import ExternalLink from '../utils/ExternalLink';
import DocSection from './DocSection';

type Props = {}

/**
 * Documentation section that showcases features that aren't directly related to NRN
 *
 * @param props
 */
const ExternalFeaturesSection: React.FunctionComponent<Props> = (props): JSX.Element => {
  return (
    <DocSection>
      <h2>External features</h2>

      <Alert color={'info'}>
        This section showcases features that <b>aren't built-in</b> within NRN.<br />
        You can consider them as <i>"advanced integration examples"</i>.
      </Alert>

      <Cards maxCards={1}>
        <Card>
          <CardBody>
            <CardTitle><h3 style={{textDecoration: 'strikethrough'}}>Backoffice/Admin site</h3></CardTitle>
            <CardSubtitle>&ldquo;Update NRN demo using NRN-Admin CMS&rdquo;</CardSubtitle>
            <CardText tag={'div'}>

              <Alert color={'error'}>
                This experimental feature isn't available anymore, because the GraphQL provider (GraphCMS) used for this demo has changed its API (from v1 to v2) with several breaking changes.<br />
                <br />
                The NRN-Admin hasn't been updated to the new GraphCMS v2 API and thus is now unusable and changes made on NRN-Admin won't reflect here.<br />
                <br />
                This section has been kept through, to showcase what could be done. <i>(this was working properly in 2020)</i><br />
                <br />
                The NRN-Admin demo will stop working on February 1st, 2021.
              </Alert>

              <Alert color={'info'}>
                Edit this demo using NRN-Admin CMS!<br />
                <br />
                You can edit the <code>customer</code> theme, play with its primary color to see how the demo is affected depending on the various rendering modes (SSG, SSR, etc.)<br />
                <br />
                It's basically an admin site (POC/experimental), for managing content, based on
                <ExternalLink href={'https://github.com/marmelab/react-admin'} suffix={null}><code>react-admin</code></ExternalLink>, built with NRN.
              </Alert>

              <div className={'buttons'}>
                <ExternalLink href={'https://nrn-admin.now.sh/'}>
                  <Button color={'link'}>Go to NRN-Admin CMS</Button>
                </ExternalLink>
              </div>
            </CardText>
          </CardBody>
        </Card>
      </Cards>
    </DocSection>
  );
};

export default ExternalFeaturesSection;
