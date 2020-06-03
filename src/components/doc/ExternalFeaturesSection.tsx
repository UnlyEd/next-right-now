/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { Alert, Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from 'reactstrap';
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
        This section showcases features that <b>aren't built-in</b> within NRN.
      </Alert>

      <Cards>
        <Card>
          <CardBody>
            <CardTitle><h3>Backoffice/Admin site</h3></CardTitle>
            <CardSubtitle>&ldquo;Manage NRN content using Stacker&rdquo;</CardSubtitle>
            <CardText tag={'div'}>
              <Alert color={'info'}>
                You have the ability to update this demo dynamic content using Stacker.<br />
                TODO Stacker
              </Alert>

              <div className={'buttons'}>
                <ExternalLink href={''}>
                  <Button color={'link'}>Go to Stacker</Button>
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
