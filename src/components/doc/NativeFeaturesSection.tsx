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

              <div className={'buttons'}>
                <ExternalLink href={'https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering'}>
                  <Button color={'link'}>Learn more about <code>getServerSideProps</code></Button>
                </ExternalLink>
                <I18nLink href={'/examples/native-features/example-with-ssr'}>
                  <Button color={'link'}>Example with <code>getServerSideProps</code></Button>
                </I18nLink>
              </div>

              <Alert color={'warning'}>
                We have decided not to use <code>getInitialProps</code>, because even though it is not officially deprecated, {' '}
                <b>it is preferred</b> to use <code>getServerSideProps</code> whenever possible. <br />
                <br />
                <b>From experience</b>, it is harder to use <code>getInitialProps</code> because you have to make your code universal, {' '}
                because it will be executed from the server (SSR) and the browser (CSR), and it usually leads to increased complexity and tougher bugs.
              </Alert>
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

              <div className={'buttons'}>
                <ExternalLink href={'https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation'}>
                  <Button color={'link'}>Learn more about <code>getStaticProps</code></Button>
                </ExternalLink>
                <I18nLink href={'/examples/native-features/example-with-ssg'}>
                  <Button color={'link'}>Example with <code>getStaticProps</code></Button>
                </I18nLink>
              </div>

              <Alert color={'warning'}>
                SSG can be used with different options, which are described below,{' '}
                and provide much greater flexibility and business possibilities compared to the basic example above.
              </Alert>
            </CardText>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle><h3>SSG, using <code>fallback</code> option</h3></CardTitle>
            <CardSubtitle>&ldquo;Pre-build only a subset of your pages, then build static pages on-demand&rdquo;</CardSubtitle>
            <CardText tag={'div'}>
              <Alert color={'info'}>
                Next.js supports SSG with <code>fallback</code> since <ExternalLink href={'https://nextjs.org/blog/next-9-3'} suffix={null}>v9.3</ExternalLink>.<br />
              </Alert>

              <p>
                You should use it if you only want/can pre-generate only part of your static pages at build time, and then build static pages on-demand upon request.<br />
                It's very interesting if you've got a ton of pages and want faster builds. This way, you can pre-build only the most used pages of your app, and build other pages on-demand if they ever get requested.<br />
              </p>

              <div className={'buttons'}>
                <ExternalLink href={'https://nextjs.org/docs/basic-features/data-fetching#the-fallback-key-required'}>
                  <Button color={'link'}>Learn more about <code>getStaticProps</code> with <code>fallback</code> option</Button>
                </ExternalLink>
                <I18nLink
                  href={'/examples/native-features/example-with-ssg-and-fallback/[albumId]'}
                  params={{
                    albumId: 1,
                  }}
                >
                  <Button color={'link'}>Example with <code>getStaticProps</code> and <code>fallback</code></Button>
                </I18nLink>
              </div>
            </CardText>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle><h3>SSG, using <code>revalidate</code> option (BETA)</h3></CardTitle>
            <CardSubtitle>&ldquo;Automatically rebuild your pages when they get too old, to serve fresh content statically&rdquo;</CardSubtitle>
            <CardText tag={'div'}>
              <Alert color={'info'}>
                Next.js supports SSG with <code>revalidate</code> since
                <ExternalLink href={'https://nextjs.org/blog/next-9-4'} suffix={null}>v9.4</ExternalLink>.<br />
              </Alert>

              <p>
                The <code>revalidate</code> option is strongly related to the <b>Incremental Static Regeneration</b> concept.<br />
                Basically, it's the ability to regenerate parts of your apps based on your own business rules.<br />
                Currently, it only supports a time-based regeneration (similar to TTL), thus when your page is too old, it gets regenerated.<br />
              </p>

              <div className={'buttons'}>
                <ExternalLink href={'https://nextjs.org/blog/next-9-4#incremental-static-regeneration-beta'}>
                  <Button color={'link'}>Learn more about <code>getStaticProps</code> with <code>revalidate</code> option</Button>
                </ExternalLink>
                <I18nLink href={'/examples/native-features/example-with-ssg-and-revalidate'}>
                  <Button color={'link'}>Example with <code>getStaticProps</code> and <code>revalidate</code></Button>
                </I18nLink>
              </div>

              <Alert color={'warning'}>
                The <ExternalLink href={'https://github.com/vercel/next.js/discussions/11552'}>RFC</ExternalLink> is still being discussed, don't hesitate to participate!<br />
                API-based regeneration (e.g: regenerate pages based on a CMS update) is still being discussed in the RFC.
              </Alert>
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
                <ExternalLink
                  href={'https://react-typescript-cheatsheet.netlify.app/docs/basic/setup'}
                  suffix={null}
                >React TypeScript Cheatsheets</ExternalLink>
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
                Quickly learn the basic concepts of a Next.js app, such as navigation, the different rendering modes, routing, API routes and deploying to Vercel.<br />
              </Alert>

              <Alert color={'success'}>
                We strongly recommend doing this tutorial if you're not familiar with Next.js, it'll help you get an overview of what the framework can help you achieve.<br />
              </Alert>

              <p>
                NRN is meant to help you, but basic Next.js knowledge will be necessary as we don't focus on the basics here but mostly on the difficult/advanced stuff.
              </p>

              <p>
                <ExternalLink href={'https://nextjs.org/learn/basics/create-nextjs-app'} suffix={null}>Go to the tutorial</ExternalLink>.
              </p>
            </CardText>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <CardTitle><h3>Catch-all routes</h3></CardTitle>
            <CardSubtitle>&ldquo;Optional catch-all dynamic routes for advanced scenarios&rdquo;</CardSubtitle>
            <CardText tag={'div'}>
              <div className={'buttons'}>
                <ExternalLink href={'https://nextjs.org/docs/routing/dynamic-routes#optional-catch-all-routes'}>
                  <Button color={'link'}>Learn more about "optional catch-all routes" native feature</Button>
                </ExternalLink>
                <I18nLink href={'/examples/native-features/example-optional-catch-all-routes'}>
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

export default NativeFeaturesSection;
