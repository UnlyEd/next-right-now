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

import I18nLink from '../i18n/I18nLink';
import Cards from '../utils/Cards';
import ExternalLink from '../utils/ExternalLink';
import DocSection from './DocSection';

type Props = {}

/**
 * Documentation section that showcases features that are built-in into NRN
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
            <CardTitle><h3>Hosting on Vercel vendor</h3></CardTitle>
            <CardSubtitle>&ldquo;Deploy your app online in a breeze&rdquo;</CardSubtitle>
            <CardText tag={'div'}>
              <div className={'buttons'}>
                <ExternalLink href={'https://vercel.com/docs'}>
                  <Button color={'link'}>Learn more about the Vercel cloud platform</Button>
                </ExternalLink>
                <ExternalLink href={'https://unlyed.github.io/next-right-now/guides/online-deployment/'}>
                  <Button color={'link'}>Learn how to configure and use Vercel</Button>
                </ExternalLink>
                <I18nLink href={'/examples/built-in-features/hosting'}>
                  <Button color={'link'}>Learn why we chose Vercel</Button>
                </I18nLink>
              </div>
            </CardText>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle><h3>Stages & secrets</h3></CardTitle>
            <CardSubtitle>&ldquo;How to deal with secrets, using Vercel vendor&rdquo;</CardSubtitle>
            <CardText tag={'div'}>
              <div className={'buttons'}>
                <ExternalLink href={'https://unlyed.github.io/next-right-now/concepts/env-and-stages.html'}>
                  <Button color={'link'}>Learn more about the "env and stages" concept</Button>
                </ExternalLink>
                <ExternalLink href={'https://vercel.com/docs/cli?#commands/secrets'}>
                  <Button color={'link'}>Learn how to configure Vercel secrets, using the CLI</Button>
                </ExternalLink>
                <I18nLink href={'/examples/built-in-features/stages-and-secrets'}>
                  <Button color={'link'}>Learn more about their usage and differences</Button>
                </I18nLink>
              </div>
            </CardText>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle><h3>SaaS B2B MST</h3></CardTitle>
            <CardSubtitle>&ldquo;Multi Single Tenancy for SaaS B2B businesses who need it&rdquo;</CardSubtitle>
            <CardText tag={'div'}>
              <Alert color={'info'}>
                <code>MST</code> is similar to the <code>monorepo</code> design, where the same source code can be used to deploy multiple instances.
              </Alert>
              <div className={'buttons'}>
                <ExternalLink href={'https://unlyed.github.io/next-right-now/concepts/tenancy.html'}>
                  <Button color={'link'}>Learn more about the "tenancy" concept and what <code>MST</code> means</Button>
                </ExternalLink>
              </div>
            </CardText>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle><h3>CI/CD</h3></CardTitle>
            <CardSubtitle>&ldquo;Continuous Integrations and Continuous Deployments made free and easy, using Github Actions&rdquo;</CardSubtitle>
            <CardText tag={'div'}>
              <div className={'buttons'}>
                <ExternalLink href={'https://unlyed.github.io/next-right-now/concepts/ci-cd.html'}>
                  <Button color={'link'}>Learn more about the "CI/CD" concept</Button>
                </ExternalLink>
                <ExternalLink href={'https://unlyed.github.io/next-right-now/guides/ci-cd/setup-github-actions.html'}>
                  <Button color={'link'}>Learn how to setup CI/CD</Button>
                </ExternalLink>
                <I18nLink href={'/examples/built-in-features/manual-deployments'}>
                  <Button color={'link'}>See how to bypass automated CI/CD and deploy manually</Button>
                </I18nLink>
              </div>
            </CardText>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle><h3>Static i18n</h3></CardTitle>
            <CardSubtitle>&ldquo;Content internationalisation using i18next and Locize vendor&rdquo;</CardSubtitle>
            <CardText tag={'div'}>
              <div className={'buttons'}>
                <ExternalLink href={'https://unlyed.github.io/next-right-now/concepts/i18n.html'}>
                  <Button color={'link'}>Learn more about the "i18n" concept</Button>
                </ExternalLink>
                <ExternalLink href={'https://unlyed.github.io/next-right-now/guides/i18n/use-locize.html'}>
                  <Button color={'link'}>Learn how to use the "Locize" vendor</Button>
                </ExternalLink>
                <I18nLink href={'/examples/built-in-features/static-i18n'}>
                  <Button color={'link'}>See usage examples</Button>
                </I18nLink>
              </div>
            </CardText>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle><h3>Monitoring</h3></CardTitle>
            <CardSubtitle>&ldquo;Realtime app monitoring using Sentry vendor&rdquo;</CardSubtitle>
            <CardText tag={'div'}>
              <div className={'buttons'}>
                <ExternalLink href={'https://unlyed.github.io/next-right-now/concepts/monitoring.html'}>
                  <Button color={'link'}>Learn more about the "Monitoring" concept</Button>
                </ExternalLink>
                <ExternalLink href={'https://unlyed.github.io/next-right-now/guides/monitoring/use-sentry.html'}>
                  <Button color={'link'}>Learn how to use the "Sentry" vendor</Button>
                </ExternalLink>
                <I18nLink href={'/examples/built-in-features/monitoring'}>
                  <Button color={'link'}>See usage examples</Button>
                </I18nLink>
              </div>
            </CardText>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle><h3>API</h3></CardTitle>
            <CardSubtitle>&ldquo;API fetching using Amplitude vendor (REST))&rdquo;</CardSubtitle>
            <CardText tag={'div'}>
              <div className={'buttons'}>
                <I18nLink href={'/examples/built-in-features/api'}>
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
                <I18nLink href={'/examples/built-in-features/css-in-js'}>
                  <Button color={'link'}>See usage examples</Button>
                </I18nLink>
              </div>
            </CardText>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle><h3>Cookies consent</h3></CardTitle>
            <CardSubtitle>&ldquo;Cookies consent using <code>CookieConsent</code> OSS library&rdquo;</CardSubtitle>
            <CardText tag={'div'}>
              <div className={'buttons'}>
                <ExternalLink href={'https://github.com/osano/cookieconsent'}>
                  <Button color={'link'}>Learn more about the "Cookie consent" library</Button>
                </ExternalLink>
                <I18nLink href={'/examples/built-in-features/cookies-consent'}>
                  <Button color={'link'}>Learn more about user consent and its impact on analytics</Button>
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
                <I18nLink href={'/examples/built-in-features/analytics'}>
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
                <I18nLink href={'/examples/built-in-features/icons'}>
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
                <I18nLink href={'/examples/built-in-features/animations'}>
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
                <I18nLink href={'/examples/built-in-features/ui-components'}>
                  <Button color={'link'}>See components examples</Button>
                </I18nLink>
              </div>
            </CardText>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle><h3>Docs site</h3></CardTitle>
            <CardSubtitle>&ldquo;Dedicated GitHub pages website, using Jekyll&rdquo;</CardSubtitle>
            <CardText tag={'div'}>
              <div className={'buttons'}>
                <ExternalLink href={'https://pages.github.com/'}>
                  <Button color={'link'}>Learn more about "GitHub pages"</Button>
                </ExternalLink>
                <ExternalLink href={'https://pmarsceill.github.io/just-the-docs/'}>
                  <Button color={'link'}>Learn more about "just-the-docs" built-in template</Button>
                </ExternalLink>
                <I18nLink href={'/examples/built-in-features/docs-site'}>
                  <Button color={'link'}>Learn how to use it</Button>
                </I18nLink>
              </div>
            </CardText>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle><h3>Markdown as JSX components at runtime</h3></CardTitle>
            <CardSubtitle>&ldquo;Dynamically transform Markdown into JSX components at runtime&rdquo;</CardSubtitle>
            <CardText tag={'div'}>
              <div className={'buttons'}>
                <I18nLink href={'/examples/built-in-features/md-as-jsx'}>
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
