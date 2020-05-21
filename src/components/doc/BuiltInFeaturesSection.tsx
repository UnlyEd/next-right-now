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
                  <Button color={'link'}>Learn more about the "i18n" concept</Button>
                </ExternalLink>
                <ExternalLink href={'https://unlyed.github.io/next-right-now/guides/i18n/use-locize.html'}>
                  <Button color={'link'}>Learn how to use the "Locize" vendor</Button>
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
                  <Button color={'link'}>Learn more about the "Monitoring" concept</Button>
                </ExternalLink>
                <ExternalLink href={'https://unlyed.github.io/next-right-now/guides/monitoring/use-sentry.html'}>
                  <Button color={'link'}>Learn how to use the "Sentry" vendor</Button>
                </ExternalLink>
                <I18nLink href={'/examples/monitoring'}>
                  <Button color={'link'}>See usage examples</Button>
                </I18nLink>
              </div>
            </CardText>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle><h3>GraphQL</h3></CardTitle>
            <CardSubtitle>&ldquo;GraphQL API fetching using GraphCMS vendor and Apollo&rdquo;</CardSubtitle>
            <CardText tag={'div'}>
              <div className={'buttons'}>
                <ExternalLink href={'https://unlyed.github.io/next-right-now/concepts/graphql.html'}>
                  <Button color={'link'}>Learn more about the "GraphQL" concept</Button>
                </ExternalLink>
                <ExternalLink href={'https://unlyed.github.io/next-right-now/guides/graphql-api/use-graphcms.html'}>
                  <Button color={'link'}>Learn how to use the "GraphCMS" vendor</Button>
                </ExternalLink>
                <I18nLink href={'/examples/graphql'}>
                  <Button color={'link'}>See usage examples</Button>
                </I18nLink>
              </div>
            </CardText>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle><h3>CSS-in-JS</h3></CardTitle>
            <CardSubtitle>&ldquo;Styling components with Emotion&rdquo;</CardSubtitle>
            <CardText tag={'div'}>
              <div className={'buttons'}>
                <ExternalLink href={'https://unlyed.github.io/next-right-now/guides/css-in-js/use-emotion.html'}>
                  <Button color={'link'}>Learn how to use the "Emotion" library</Button>
                </ExternalLink>
                <I18nLink href={'/examples/css-in-js'}>
                  <Button color={'link'}>See usage examples</Button>
                </I18nLink>
              </div>
            </CardText>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle><h3>Analytics</h3></CardTitle>
            <CardSubtitle>&ldquo;Analytics using Amplitude vendor&rdquo;</CardSubtitle>
            <CardText tag={'div'}>
              <div className={'buttons'}>
                <ExternalLink href={'https://unlyed.github.io/next-right-now/concepts/analytics.html'}>
                  <Button color={'link'}>Learn more about the "Analytics" concept</Button>
                </ExternalLink>
                <ExternalLink href={'https://unlyed.github.io/next-right-now/guides/analytics/use-amplitude.html'}>
                  <Button color={'link'}>Learn how to use the "Amplitude" vendor</Button>
                </ExternalLink>
                <I18nLink href={'/examples/analytics'}>
                  <Button color={'link'}>See usage examples</Button>
                </I18nLink>
              </div>
            </CardText>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle><h3>Testing</h3></CardTitle>
            <CardSubtitle>&ldquo;Unit tests using Jest and E2E tests using Cypress&rdquo;</CardSubtitle>
            <CardText tag={'div'}>
              <div className={'buttons'}>
                <ExternalLink href={'https://unlyed.github.io/next-right-now/concepts/testing.html'}>
                  <Button color={'link'}>Learn more about the "Testing" concept</Button>
                </ExternalLink>
                <ExternalLink href={'https://unlyed.github.io/next-right-now/guides/testing/use-cypress.html'}>
                  <Button color={'link'}>Learn how to use the "Cypress" library (E2E)</Button>
                </ExternalLink>
              </div>
            </CardText>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle><h3>Icons</h3></CardTitle>
            <CardSubtitle>&ldquo;Icons library using Font-Awesome&rdquo;</CardSubtitle>
            <CardText tag={'div'}>
              <div className={'buttons'}>
                <ExternalLink href={'https://fontawesome.com/icons'}>
                  <Button color={'link'}>See all available FA icons</Button>
                </ExternalLink>
                <I18nLink href={'/examples/icons'}>
                  <Button color={'link'}>See usage examples</Button>
                </I18nLink>
              </div>
            </CardText>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle><h3>CSS Animations</h3></CardTitle>
            <CardSubtitle>&ldquo;Animations using Animate.css&rdquo;</CardSubtitle>
            <CardText tag={'div'}>
              <div className={'buttons'}>
                <ExternalLink href={'https://animate.style/'}>
                  <Button color={'link'}>See all available animations</Button>
                </ExternalLink>
                <I18nLink href={'/examples/animations'}>
                  <Button color={'link'}>See usage examples</Button>
                </I18nLink>
              </div>
            </CardText>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle><h3>UI components library</h3></CardTitle>
            <CardSubtitle>&ldquo;React components using Reactstrap and Bootstrap&rdquo;</CardSubtitle>
            <CardText tag={'div'}>
              <div className={'buttons'}>
                <ExternalLink href={'https://reactstrap.github.io/components'}>
                  <Button color={'link'}>See all available Reactstrap components</Button>
                </ExternalLink>
                <I18nLink href={'/examples/ui-components'}>
                  <Button color={'link'}>See components examples</Button>
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
