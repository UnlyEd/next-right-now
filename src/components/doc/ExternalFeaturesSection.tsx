/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { Alert, Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from 'reactstrap';
import Cards from '../utils/Cards';
import ExternalLink from '../utils/ExternalLink';
import DocSection from './DocSection';

type Props = {}

/**
 * Documentation section that highlight features that aren't directly related to NRN
 *
 * @param props
 */
const ExternalFeaturesSection: React.FunctionComponent<Props> = (props): JSX.Element => {
  return (
    <DocSection>
      <h2>External features</h2>

      <Alert color={'info'}>
        This section showcase features that <b>aren't built-in</b> within NRN.
      </Alert>

      <Cards>
        <Card>
          <CardBody>
            <CardTitle><h3>Backoffice/Admin site</h3></CardTitle>
            <CardSubtitle>&ldquo;Manage NRN content using NRN-Admin&rdquo;</CardSubtitle>
            <CardText tag={'div'}>
              <Alert color={'info'}>
                You have the ability to update this demo dynamic content using NRN-Admin.<br />
                It's basically an admin site (POC/experimental), for managing content, based on
                <ExternalLink href={'https://github.com/marmelab/react-admin'} suffix={null}><code>react-admin</code></ExternalLink>.
              </Alert>

              <div className={'buttons'}>
                <ExternalLink href={'https://nrn-admin.now.sh/'}>
                  <Button color={'link'}>Go to NRN-Admin</Button>
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
