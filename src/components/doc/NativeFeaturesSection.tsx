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

      <Cards maxCards={2}>
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

        <Card>
          <CardBody>
            <CardTitle><h3>TS</h3></CardTitle>
            <CardSubtitle>&ldquo;TypeScript support and helpful tips&rdquo;</CardSubtitle>
            <CardText tag={'div'}>
              <Alert color={'info'}>
                Next.js supports TS natively out of the box.<br />
                But, there are special considerations to support TS for testing, code linting, etc.
              </Alert>

              <p>
                TS is treated as first-class citizen, we do our best to make the TS experience as smooth and simple as possible.<br />
                We use TS a lot, and type everything. You could say NRN comes with an advanced TS usage.<br />
                This can be overwhelming for TS beginners, even though you shouldn't have anything to configure by yourself, you'll still need to understand the concepts and be aware of the features we use.
              </p>

              <p>
                We strongly recommend you to take a look at the
                <ExternalLink href={'https://react-typescript-cheatsheet.netlify.app/docs/basic/setup'} suffix={null}>React TypeScript Cheatsheets</ExternalLink>
                , which is amazing for both beginners and experienced TS users.<br />
              </p>
            </CardText>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle><h3>New to Next.js?</h3></CardTitle>
            <CardSubtitle>&ldquo;Step-by-step tutorial for beginners&rdquo;</CardSubtitle>
            <CardText tag={'div'}>
              <Alert color={'info'}>
                Quickly learn how the basic concepts of a Next.js app, such as navigation, the different rendering modes, routing, API routes and deploying to Vercel.<br />
              </Alert>

              <p>
                We strongly recommend doing this tutorial if you're not familiar with Next.js, it'll help you get an overview of what the framework can help you achieve.<br />
                NRN is meant to help you develop faster, but basic Next.js knowledge will be necessary.
              </p>

              <p>
                <ExternalLink href={'https://nextjs.org/learn/basics/create-nextjs-app'} suffix={null}>Go to the tutorial</ExternalLink>.
              </p>
            </CardText>
          </CardBody>
        </Card>
      </Cards>
    </DocSection>
  );
};

export default NativeFeaturesSection;
