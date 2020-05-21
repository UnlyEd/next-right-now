/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from 'reactstrap';
import I18nLink from '../i18n/I18nLink';
import Cards from '../utils/Cards';
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
            <CardTitle><h3>Static I18n</h3></CardTitle>
            <CardSubtitle>&ldquo;Internationalisation/Localisation&rdquo;</CardSubtitle>
            <CardText tag={'div'}>
              <p>
                <I18nLink href={'/examples/static-i18n'}>
                  <Button color={'primary'} block>See usage examples</Button>
                </I18nLink>
              </p>
            </CardText>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle><h3>Monitoring</h3></CardTitle>
            <CardSubtitle>&ldquo;Realtime app monitoring using Sentry&rdquo;</CardSubtitle>
            <CardText tag={'div'}>
              <p>
                <I18nLink href={'/examples/monitoring'}>
                  <Button color={'primary'} block>See usage examples</Button>
                </I18nLink>
              </p>
            </CardText>
          </CardBody>
        </Card>
      </Cards>
    </DocSection>
  );
};

export default BuiltInFeaturesSection;
