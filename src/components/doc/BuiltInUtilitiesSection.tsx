import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
} from 'reactstrap';

import I18nLink from '../i18n/I18nLink';
import Btn from '../utils/Btn';
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
                <I18nLink href={'/examples/built-in-utilities/i18nLink-component'}>
                  <Btn mode={'primary-outline'}>See usage examples</Btn>
                </I18nLink>
              </div>
            </CardText>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle><h3>Hooks</h3></CardTitle>
            <CardSubtitle>&ldquo;Helpful hooks&rdquo;</CardSubtitle>
            <CardText tag={'div'}>
              <div className={'buttons'}>
                <I18nLink href={'/examples/built-in-utilities/hooks'}>
                  <Btn mode={'primary-outline'}>See usage examples</Btn>
                </I18nLink>
              </div>
            </CardText>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle><h3>HOCs</h3></CardTitle>
            <CardSubtitle>&ldquo;Helpful high order components&rdquo;</CardSubtitle>
            <CardText tag={'div'}>
              <div className={'buttons'}>
                <I18nLink href={'/examples/built-in-utilities/hocs'}>
                  <Btn mode={'primary-outline'}>See usage examples</Btn>
                </I18nLink>
              </div>
            </CardText>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle><h3>API</h3></CardTitle>
            <CardSubtitle>&ldquo;API endpoints&rdquo;</CardSubtitle>
            <CardText tag={'div'}>
              <div className={'buttons'}>
                <I18nLink href={'/examples/built-in-utilities/api'}>
                  <Btn mode={'primary-outline'}>See usage examples</Btn>
                </I18nLink>
              </div>
            </CardText>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle><h3>Errors handling</h3></CardTitle>
            <CardSubtitle>&ldquo;Properly handling errors, to provide good UX and system observability&rdquo;</CardSubtitle>
            <CardText tag={'div'}>
              <div className={'buttons'}>
                <I18nLink href={'/examples/built-in-utilities/errors-handling'}>
                  <Btn mode={'primary-outline'}>See how errors are handled</Btn>
                </I18nLink>
              </div>
            </CardText>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle><h3>Bundle analysis</h3></CardTitle>
            <CardSubtitle>&ldquo;Know how big your bundle is&rdquo;</CardSubtitle>
            <CardText tag={'div'}>
              <div className={'buttons'}>
                <I18nLink href={'/examples/built-in-utilities/bundle-analysis'}>
                  <Btn mode={'primary-outline'}>See usage examples</Btn>
                </I18nLink>
              </div>
            </CardText>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle><h3>SVG to React</h3></CardTitle>
            <CardSubtitle>&ldquo;Convert your SVGs to React components using SVGR&rdquo;</CardSubtitle>
            <CardText tag={'div'}>
              <div className={'buttons'}>
                <I18nLink href={'/examples/built-in-utilities/svg-to-react'}>
                  <Btn mode={'primary-outline'}>See usage examples</Btn>
                </I18nLink>
              </div>
            </CardText>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle><h3>Security audit</h3></CardTitle>
            <CardSubtitle>&ldquo;Run packages security audit using yarn&rdquo;</CardSubtitle>
            <CardText tag={'div'}>
              <div className={'buttons'}>
                <I18nLink href={'/examples/built-in-utilities/security-audit'}>
                  <Btn mode={'primary-outline'}>See usage examples</Btn>
                </I18nLink>
              </div>
            </CardText>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle><h3>Packages upgrade</h3></CardTitle>
            <CardSubtitle>&ldquo;Visually upgrade your packages, with confidence&rdquo;</CardSubtitle>
            <CardText tag={'div'}>
              <div className={'buttons'}>
                <I18nLink href={'/examples/built-in-utilities/packages-upgrade'}>
                  <Btn mode={'primary-outline'}>See usage examples</Btn>
                </I18nLink>
              </div>
            </CardText>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle><h3>Tracking useless re-renders</h3></CardTitle>
            <CardSubtitle>&ldquo;Visualise useless re-renders that slow down your app&rdquo;</CardSubtitle>
            <CardText tag={'div'}>
              <div className={'buttons'}>
                <ExternalLink href={'https://medium.com/hootsuite-engineering/react-re-render-optimization-7d369e0bf701'}>
                  <Btn mode={'primary-outline'}>Learn how to use the React Profiler</Btn>
                </ExternalLink>
                <I18nLink href={'/examples/built-in-utilities/tracking-useless-re-renders'}>
                  <Btn mode={'primary-outline'}>See usage examples</Btn>
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
