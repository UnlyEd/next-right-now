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
                <ExternalLink href={'https://nextjs.org/blog/next-9-4'} suffix={null}>v9.4 came out</ExternalLink>.
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
                <Button color={'primary'} size={'lg'}>Example with getServerSideProps</Button>
              </p>
            </CardText>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle><h3>SSG</h3></CardTitle>
            <CardSubtitle>&ldquo;Static Site Generation&rdquo; / &ldquo;Server-Side Generated&rdquo;</CardSubtitle>
            <CardText>
              <Alert color={'info'}>
                x
              </Alert>

            </CardText>
          </CardBody>
        </Card>
      </CardDeck>
    </>
  );
};

export default NativeFeaturesSection;
