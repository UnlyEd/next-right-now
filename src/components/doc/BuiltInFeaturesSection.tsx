/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from 'reactstrap';
import I18nLink from '../i18n/I18nLink';
import Cards from '../utils/Cards';
import ExternalLink from '../utils/ExternalLink';
import DocSection from './DocSection';

type Props = {}

/**
 * Documentation section that highlight native Next.js features
 *
 * @param props
 */
const BuiltInFeaturesSection: React.FunctionComponent<Props> = (props): JSX.Element => {
  return (
    <DocSection>
      <h2>Built-in features</h2>

      <Cards>
        <Card>
          <CardBody>
            <CardTitle><h3>Static i18n</h3></CardTitle>
            <CardSubtitle>&ldquo;Internationalisation/Localisation&rdquo;</CardSubtitle>
            <CardText tag={'div'}>
              <div className={'buttons'}>
                <ExternalLink href={'https://unlyed.github.io/next-right-now/concepts/i18n.html'}>
                  <Button color={'link'}>Read NRN documentation</Button>
                </ExternalLink>
                <I18nLink href={'/examples/static-i18n'}>
                  <Button color={'link'}>See usage examples</Button>
                </I18nLink>
              </div>
            </CardText>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle><h3>Monitoring</h3></CardTitle>
            <CardSubtitle>&ldquo;Realtime app monitoring using Sentry&rdquo;</CardSubtitle>
            <CardText tag={'div'}>
              <div className={'buttons'}>
                <ExternalLink href={'https://unlyed.github.io/next-right-now/concepts/monitoring.html'}>
                  <Button color={'link'}>Read NRN documentation</Button>
                </ExternalLink>
                <I18nLink href={'/examples/monitoring'}>
                  <Button color={'link'}>See usage examples</Button>
                </I18nLink>
              </div>
            </CardText>
          </CardBody>
        </Card>
      </Cards>
    </DocSection>
  );
};

export default BuiltInFeaturesSection;
