/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { Alert, Card, CardBody, CardDeck, CardSubtitle, CardText, CardTitle, Button } from 'reactstrap';

import ExternalLink from '../utils/ExternalLink';

type Props = {}

/**
 * Documentation section that highlight native Next.js features
 *
 * @param props
 */
const NativeFeaturesSection: React.FunctionComponent<Props> = (props): JSX.Element => {
  return (
    <>
      <h2>Next.js native features</h2>

      <CardDeck
        css={css`
          .card {
            .card-subtitle {
              font-style: italic;
              text-transform: uppercase;
            }

            .card-text{
              margin-top: 10px;
            }
          }
        `}
      >
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

              <p>
                <Button color={'primary'} block>Example with getServerSideProps</Button>
              </p>
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

              <p>
                There are currently 3 different usage options for SSG:

                <ul
                  css={css`
                    text-align: left;
                  `}
                >
                  <li>
                    <ExternalLink href={'https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation'}>Static app</ExternalLink> (without any option)
                  </li>
                  <li>
                    <ExternalLink href={'https://nextjs.org/docs/basic-features/data-fetching#the-fallback-key-required'}>Using fallback</ExternalLink> (on-the-fly static builds)
                  </li>
                  <li>
                    <ExternalLink href={'https://nextjs.org/blog/next-9-4#incremental-static-regeneration-beta'}>Using revalidate</ExternalLink> (incremental static regeneration)
                  </li>
                </ul>
              </p>

              <p>
                <Button color={'primary'} block>Simple example</Button>
                <Button color={'primary'} block>Example with fallback</Button>
                <Button color={'primary'} block>Example with revalidate</Button>
              </p>
            </CardText>
          </CardBody>
        </Card>
      </CardDeck>
    </>
  );
};

export default NativeFeaturesSection;
