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
            <CardTitle><h3>Backoffice/CMS</h3></CardTitle>
            <CardSubtitle>&ldquo;Update NRN demo using Stacker CMS&rdquo;</CardSubtitle>
            <CardText tag={'div'}>
              <Alert color={'info'}>
                Edit this demo using Stacker CMS!<br />
                <br />
                You can edit the <code>customer</code> theme, play with its primary color to see how the demo is affected depending on the various rendering modes (SSG, SSR, etc.)<br />
                <br />
                You can also edit the products, and play around, as if you were using the Stacker CMS from a customer/editor standpoint!<br />
              </Alert>

              <Alert color={'success'}>
                If you like Stacker and would like to use it, here is a coupon code to
                <ExternalLink href={'https://studio.airportal.app/register?coupon=nrn1m'}>get your first month for free!</ExternalLink>
                <br />
                <code>nrn1m</code>
              </Alert>

              <div className={'buttons'}>
                <ExternalLink href={process.env.NEXT_PUBLIC_CUSTOMER_REF === 'customer1' ? 'https://nrn.my.stacker.app/login?api_token=be1050d1-de5e-4ae0-97c8-030a132f254b&ref=unly-nrn' : 'https://nrn.my.stacker.app/login?api_token=c3a703bc-c4cc-42ee-aeac-03643636dbb0&ref=unly-nrn'}>
                  <Button color={'link'}>
                    Impersonate <b>Customer {process.env.NEXT_PUBLIC_CUSTOMER_REF === 'customer1' ? '1' : '2'} Admin</b> and play with this demo
                  </Button>
                </ExternalLink>
                <ExternalLink href={'https://airtable.com/shrnxN46JDBkQV9u1'}>
                  <Button color={'link'}>
                    See Airtable base (where data are stored)
                  </Button>
                </ExternalLink>
                <ExternalLink href={'https://stacker.app?ref=unly-nrn'}>
                  <Button color={'link'}>
                    Learn more about Stacker
                  </Button>
                </ExternalLink>
              </div>

              <Alert color={'info'}>
                Impersonating a user will grant you access to Stacker CMS with the user's permissions and will give you access to content that's related to its tenant.<br />
                <br />
                This is a great feature for <b>SaaS B2B businesses</b>, because each customer can only view/edit their own content, not what belongs to another customer.
              </Alert>
            </CardText>
          </CardBody>
        </Card>
      </Cards>
    </DocSection>
  );
};

export default ExternalFeaturesSection;
