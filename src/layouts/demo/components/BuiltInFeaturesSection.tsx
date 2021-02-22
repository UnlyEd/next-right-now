import Btn from '@/components/dataDisplay/Btn';
import Cards from '@/components/dataDisplay/Cards';
import ExternalLink from '@/components/dataDisplay/ExternalLink';
import I18nLink from '@/modules/core/i18n/components/I18nLink';
import React from 'react';
import {
  Alert,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
} from 'reactstrap';
import DemoSection from './DemoSection';

type Props = {}

/**
 * Documentation section that showcases features that are built-in into NRN
 *
 * XXX Demo component, not meant to be modified. It's a copy of the core implementation, so the demo keeps working even the core implementation changes.
 */
const BuiltInFeaturesSection: React.FunctionComponent<Props> = (props): JSX.Element => {
  return (
    <DemoSection>
      <h2>Built-in features</h2>

      <Cards>
        <Card>
          <CardBody>
            <CardTitle><h3>Hosting on Vercel vendor</h3></CardTitle>
            <CardSubtitle>&ldquo;Deploy your app online in a breeze&rdquo;</CardSubtitle>
            <CardText tag={'div'}>
              <div className={'buttons'}>
                <ExternalLink href={'https://vercel.com/docs'}>
                  <Btn mode={'primary-outline'}>Learn more about the Vercel cloud platform</Btn>
                </ExternalLink>
                <ExternalLink href={'https://unlyed.github.io/next-right-now/guides/online-deployment/'}>
                  <Btn mode={'primary-outline'}>Learn how to configure and use Vercel</Btn>
                </ExternalLink>
                <I18nLink href={'/demo/built-in-features/hosting'}>
                  <Btn mode={'primary-variant'}>Learn why we chose Vercel</Btn>
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
                <ExternalLink href={'https://unlyed.github.io/next-right-now/concepts/env-and-stages'}>
                  <Btn mode={'primary-outline'}>Learn more about the "env and stages" concept</Btn>
                </ExternalLink>
                <ExternalLink href={'https://vercel.com/docs/cli?#commands/secrets'}>
                  <Btn mode={'primary-outline'}>Learn how to configure Vercel secrets, using the CLI</Btn>
                </ExternalLink>
                <I18nLink href={'/demo/built-in-features/stages-and-secrets'}>
                  <Btn mode={'primary-variant'}>Learn more about their usage and differences</Btn>
                </I18nLink>
              </div>
            </CardText>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle><h3>Storybook</h3></CardTitle>
            <CardSubtitle>&ldquo;Build your own Design System&rdquo;</CardSubtitle>
            <CardText tag={'div'}>
              <div className={'buttons'}>
                <ExternalLink href={'https://unlyed.github.io/next-right-now/guides/storybook'}>
                  <Btn mode={'primary-outline'}>Learn more about Storybook</Btn>
                </ExternalLink>
                <ExternalLink href={'https://nrn-v2-mst-aptd-gcms-lcz-sty-storybook.vercel.app/'}>
                  <Btn mode={'primary-variant'}>See the Storybook for this preset</Btn>
                </ExternalLink>
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
                  <Btn mode={'primary-outline'}>Learn more about the "tenancy" concept and what&nbsp;MST means</Btn>
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
                  <Btn mode={'primary-outline'}>Learn more about the "CI/CD" concept</Btn>
                </ExternalLink>
                <ExternalLink href={'https://unlyed.github.io/next-right-now/guides/ci-cd/setup-github-actions.html'}>
                  <Btn mode={'primary-outline'}>Learn how to setup CI/CD</Btn>
                </ExternalLink>
                <I18nLink href={'/demo/built-in-features/manual-deployments'}>
                  <Btn mode={'primary-variant'}>See how to bypass automated CI/CD and deploy manually</Btn>
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
                  <Btn mode={'primary-outline'}>Learn more about the "i18n" concept</Btn>
                </ExternalLink>
                <ExternalLink href={'https://unlyed.github.io/next-right-now/guides/i18n/use-locize.html'}>
                  <Btn mode={'primary-outline'}>Learn how to use the "Locize" vendor</Btn>
                </ExternalLink>
                <I18nLink href={'/demo/built-in-features/static-i18n'}>
                  <Btn mode={'primary-variant'}>See usage examples</Btn>
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
                  <Btn mode={'primary-outline'}>Learn more about the "Monitoring" concept</Btn>
                </ExternalLink>
                <ExternalLink href={'https://unlyed.github.io/next-right-now/guides/monitoring/use-sentry.html'}>
                  <Btn mode={'primary-outline'}>Learn how to use the "Sentry" vendor</Btn>
                </ExternalLink>
                <I18nLink href={'/demo/built-in-features/monitoring'}>
                  <Btn mode={'primary-variant'}>See usage examples</Btn>
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
                  <Btn mode={'primary-outline'}>Learn how to use the "Emotion" library</Btn>
                </ExternalLink>
                <I18nLink href={'/demo/built-in-features/css-in-js'}>
                  <Btn mode={'primary-variant'}>See usage examples</Btn>
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
                  <Btn mode={'primary-outline'}>Learn more about the "Cookie consent" library</Btn>
                </ExternalLink>
                <I18nLink href={'/demo/built-in-features/cookies-consent'}>
                  <Btn mode={'primary-variant'}>Learn more about user consent and its impact on analytics</Btn>
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
                  <Btn mode={'primary-outline'}>Learn more about the "Analytics" concept</Btn>
                </ExternalLink>
                <ExternalLink href={'https://unlyed.github.io/next-right-now/guides/analytics/use-amplitude.html'}>
                  <Btn mode={'primary-outline'}>Learn how to use the "Amplitude" vendor</Btn>
                </ExternalLink>
                <I18nLink href={'/demo/built-in-features/analytics'}>
                  <Btn mode={'primary-variant'}>See usage examples</Btn>
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
                  <Btn mode={'primary-outline'}>Learn more about the "Testing" concept</Btn>
                </ExternalLink>
                <ExternalLink href={'https://unlyed.github.io/next-right-now/guides/testing/use-cypress.html'}>
                  <Btn mode={'primary-outline'}>Learn how to use the "Cypress" library (E2E)</Btn>
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
                  <Btn mode={'primary-outline'}>See all available FA icons</Btn>
                </ExternalLink>
                <I18nLink href={'/demo/built-in-features/icons'}>
                  <Btn mode={'primary-variant'}>See usage examples</Btn>
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
                  <Btn mode={'primary-outline'}>See all available animations</Btn>
                </ExternalLink>
                <I18nLink href={'/demo/built-in-features/animations'}>
                  <Btn mode={'primary-variant'}>See usage examples</Btn>
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
                  <Btn mode={'primary-outline'}>See all available Reactstrap components</Btn>
                </ExternalLink>
                <I18nLink href={'/demo/built-in-features/ui-components'}>
                  <Btn mode={'primary-variant'}>See components examples</Btn>
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
                  <Btn mode={'primary-outline'}>Learn more about "GitHub pages"</Btn>
                </ExternalLink>
                <ExternalLink href={'https://pmarsceill.github.io/just-the-docs/'}>
                  <Btn mode={'primary-outline'}>Learn more about "just-the-docs" built-in template</Btn>
                </ExternalLink>
                <I18nLink href={'/demo/built-in-features/docs-site'}>
                  <Btn mode={'primary-variant'}>Learn how to use it</Btn>
                </I18nLink>
              </div>
            </CardText>
          </CardBody>
        </Card>
      </Cards>
    </DemoSection>
  );
};

export default BuiltInFeaturesSection;
