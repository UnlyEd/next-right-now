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
import Btn from '../utils/Btn';

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
            <CardSubtitle>&ldquo;Update NRN demo using GraphCMS&rdquo;</CardSubtitle>
            <CardText tag={'div'}>

              <Alert color={'info'}>
                Edit this demo using GraphCMS!<br />
                <br />
                <b>Email</b>: <code style={{fontSize: 18}}>unly-nrn+contributor@unly.org</code><br />
                <b>Password</b>: <code style={{fontSize: 18}}>bbU#Ec2m6FpqU7&</code><br />
                <br />
                You can edit anything and play with the various rendering modes (SSG, SSR, etc.), the GraphCMS API is configured to use <code>DRAFT</code> content in priority.<br />
                This mean that your changes on any published content will be reflected (because changing a published content creates a draft, and that draft is being used).<br />
                This has been done on purpose, to allow visitors to manipulate the content of the demo and see their changes being reflected immediately.<br />
                <b>N.B: Please do not change the <code>customer.ref</code> values, as it would break the associated demo, if the <code>ref</code> doesn't match.</b><br />
              </Alert>

              <Alert color={'warning'}>
                Changes will be immediately be reflected on SSG pages, when the preview mode is enabled (staging environment).<br />
                But, they won't be applied on the production demo (for SSG pages), because those pages have been generated at build-time and aren't updated dynamically.<br />
                On the other hand, SSR pages will always reflect the latest version of the content.
              </Alert>

              <div className={'buttons'}>
                <ExternalLink href={'https://app.graphcms.com/b767f8ab435746e2909249461e2f1eb7/master'}>
                  <Btn mode={'primary-outline'}>Go to GraphCMS</Btn>
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
