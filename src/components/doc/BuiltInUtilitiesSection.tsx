/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { Alert, Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from 'reactstrap';
import I18nLink from '../i18n/I18nLink';
import Cards from '../utils/Cards';
import ExternalLink from '../utils/ExternalLink';
import DocSection from './DocSection';

type Props = {}

/**
 * Documentation section that showcases utilities that are built-in into NRN
 *
 * @param props
 */
const BuiltInUtilitiesSection: React.FunctionComponent<Props> = (props): JSX.Element => {
  return (
    <DocSection>
      <h2>Built-in utilities</h2>

      <Cards>
        <Card>
          <CardBody>
            <CardTitle><h3><code>I18nLink</code> component</h3></CardTitle>
            <CardSubtitle>&ldquo;Help manage i18n links with breeze&rdquo;</CardSubtitle>
            <CardText tag={'div'}>
              <div className={'buttons'}>
                <I18nLink href={'/examples/i18nLink-component'}>
                  <Button color={'link'}>See usage examples</Button>
                </I18nLink>
              </div>
            </CardText>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle><h3>Hooks</h3></CardTitle>
            <CardSubtitle>&ldquo;Help manage i18n links with breeze&rdquo;</CardSubtitle>
            <CardText tag={'div'}>
              <div className={'buttons'}>
                <I18nLink href={'/examples/hooks'}>
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

export default BuiltInUtilitiesSection;
