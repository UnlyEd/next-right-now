/** @jsx jsx */
import { jsx } from '@emotion/core';
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
            <CardTitle><h3>Backoffice/Admin site</h3></CardTitle>
            <CardSubtitle>&ldquo;Update NRN demo using NRN-Admin CMS&rdquo;</CardSubtitle>
            <CardText tag={'div'}>
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
