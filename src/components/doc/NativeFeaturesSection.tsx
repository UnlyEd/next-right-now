/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { Alert, Button, Card, CardBody, CardSubtitle, CardText, CardTitle } from 'reactstrap';
import Cards from '../utils/Cards';
import ExternalLink from '../utils/ExternalLink';
import DocSection from './DocSection';

type Props = {}

/**
 * Documentation section that showcases native Next.js features
 *
 * @param props
 */
const NativeFeaturesSection: React.FunctionComponent<Props> = (props): JSX.Element => {
  return (
    <DocSection>
      <h2>Next.js native features</h2>

      <Alert color={'info'}>
        Only a small subset of Next.js features (rendering modes, mostly) is covered here.<br />
        Make sure to check <ExternalLink href={'https://nextjs.org/docs/getting-started'}>the official documentation</ExternalLink> to learn more about it (routing, etc.)
      </Alert>

      <Cards>
        <Card>
          <CardBody>
            <CardTitle><h3>SSR</h3></CardTitle>
            <CardSubtitle>&ldquo;Server Side Rendering&rdquo;</CardSubtitle>
            <CardText tag={'div'}>
              <Alert color={'info'}>
                Next.js has always supported SSR, and it was the main way to render pages until
                <ExternalLink href={'https://nextjs.org/blog/next-9-3'} suffix={null}>v9.3 came out</ExternalLink>.
              </Alert>

              <p>
                SSR can be used either through
                <ExternalLink href={'https://nextjs.org/docs/api-reference/data-fetching/getInitialProps'}>
                  <code>getInitialProps</code>
                </ExternalLink>
                or
                <ExternalLink href={'https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering'} suffix={null}>
                  <code>getServerSideProps</code>
                </ExternalLink>.
              </p>

              <p>
                We have decided not to use <code>getInitialProps</code>, because even though it is not officially deprecated, {' '}
                <b>it is preferred</b> to use <code>getServerSideProps</code> whenever possible.
              </p>

              <p>
                <b>From experience</b>, it is harder to use <code>getInitialProps</code> because you have to make your code universal, {' '}
                because it will be executed from the server (SSR) and the browser (CSR), and it usually leads to increased complexity and tougher bugs.
              </p>

              <div className={'buttons'}>
                <Button color={'link'}>Example with getServerSideProps</Button>
              </div>
            </CardText>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle><h3>SSG</h3></CardTitle>
            <CardSubtitle>&ldquo;Static Site Generation&rdquo; / &ldquo;Server-Side Generated&rdquo;</CardSubtitle>
            <CardText tag={'div'}>
              <Alert color={'info'}>
                Next.js supports SSG since <ExternalLink href={'https://nextjs.org/blog/next-9-3'} suffix={null}>v9.3</ExternalLink>.<br />
                This is the <b>officially recommended</b> way to build apps since then.
              </Alert>

              <p>
                We also strongly recommend using SSG, whenever possible.<br />
                SSG can only be used using <code>getStaticProps</code>, NRN provides a <code>getCommonStaticProps</code> helper
                to configure common stuff between all SSG-based pages and reduce code duplication.
              </p>

              <div>
                There are currently 3 different usage options for SSG:

                <ul
                  css={css`
                    text-align: left;
                  `}
                >
                  <li>
                    <ExternalLink href={'https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation'}>Static app</ExternalLink> (without any option)
                    {' - '}<Button color={'link'}>See example</Button>
                  </li>
                  <li>
                    <ExternalLink href={'https://nextjs.org/docs/basic-features/data-fetching#the-fallback-key-required'}>Using fallback</ExternalLink> (on-the-fly static builds)
                    {' - '}<Button color={'link'}>See example</Button>
                  </li>
                  <li>
                    <ExternalLink href={'https://nextjs.org/blog/next-9-4#incremental-static-regeneration-beta'}>Using revalidate</ExternalLink> (incremental static regeneration)
                    {' - '}<Button color={'link'}>See example</Button>
                  </li>
                </ul>
              </div>
            </CardText>
          </CardBody>
        </Card>
      </Cards>
    </DocSection>
  );
};

export default NativeFeaturesSection;
