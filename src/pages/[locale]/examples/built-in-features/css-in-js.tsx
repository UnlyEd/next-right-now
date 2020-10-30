import { createLogger } from '@unly/utils-simple-logger';
import {
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';
import { Alert } from 'reactstrap';

import BuiltInFeaturesSidebar from '../../../../components/doc/BuiltInFeaturesSidebar';
import DocPage from '../../../../components/doc/DocPage';
import DefaultLayout from '../../../../components/pageLayouts/DefaultLayout';
import Code from '../../../../components/utils/Code';
import ExternalLink from '../../../../components/utils/ExternalLink';
import { CommonServerSideParams } from '../../../../types/nextjs/CommonServerSideParams';
import { OnlyBrowserPageProps } from '../../../../types/pageProps/OnlyBrowserPageProps';
import { SSGPageProps } from '../../../../types/pageProps/SSGPageProps';
import {
  getExamplesCommonStaticPaths,
  getExamplesCommonStaticProps,
} from '../../../../utils/nextjs/SSG';

const fileLabel = 'pages/[locale]/examples/built-in-features/css-in-js';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  label: fileLabel,
});

/**
 * Only executed on the server side at build time
 * Necessary when a page has dynamic routes and uses "getStaticProps"
 */
export const getStaticPaths: GetStaticPaths<CommonServerSideParams> = getExamplesCommonStaticPaths;

/**
 * Only executed on the server side at build time.
 *
 * @return Props (as "SSGPageProps") that will be passed to the Page component, as props
 *
 * @see https://github.com/vercel/next.js/discussions/10949#discussioncomment-6884
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 */
export const getStaticProps: GetStaticProps<SSGPageProps, CommonServerSideParams> = getExamplesCommonStaticProps;

/**
 * SSG pages are first rendered by the server (during static bundling)
 * Then, they're rendered by the client, and gain additional props (defined in OnlyBrowserPageProps)
 * Because this last case is the most common (server bundle only happens during development stage), we consider it a default
 * To represent this behaviour, we use the native Partial TS keyword to make all OnlyBrowserPageProps optional
 *
 * Beware props in OnlyBrowserPageProps are not available on the server
 */
type Props = {} & SSGPageProps<Partial<OnlyBrowserPageProps>>;

const ExampleCssInJsPage: NextPage<Props> = (props): JSX.Element => {
  return (
    <DefaultLayout
      {...props}
      pageName={'css-in-js'}
      headProps={{
        title: 'CSS-in-JS examples - Next Right Now',
      }}
      Sidebar={BuiltInFeaturesSidebar}
    >
      <DocPage>
        <h1 className={'pcolor'}>CSS-in-JS examples, using Emotion library</h1>

        <Alert color={'info'}>
          A lot of research has been done to select the most robust css-in-js library, and we eventually chose
          <ExternalLink href={'https://emotion.sh/docs/introduction'} suffix={null}>Emotion</ExternalLink>.<br />
          After more than a year working with it at a production-grade level, we haven't noticed any drawbacks.
          <br />
          Emotion allows to use both the <code>styled component</code> and JSX-like ways of writing your CSS styles, as showcased below.<br />
        </Alert>

        <Alert color={'warning'}>
          Our personal preference is to use JSX-like way of writing styles, instead of the Styled Components approach.<br />
          We want to make it clear that such choice is personal, and we have selected on purpose Emotion, because it allows both.<br />
          In our opinion, the JSX way is better for iterating quickly when you don't know exactly the shape of your components.<br />
          The choice is yours, do as you like!
        </Alert>

        <p>
          The below example uses the JSX way, with CSS written directly in the element.
        </p>

        <Code
          text={`
            import { css } from '@emotion/core';

            <div
              css={css\`
                # Those rules apply to the top-level element (the "div")
                justify-content: center;
                text-align: center;
                margin-left: auto;
                margin-right: auto;

                # Those rules apply to children elements using the "child-class" css class
                .child-class {
                  margin: auto;
                  width: 50%;

                  @media screen and (min-width: 576px) {
                    margin: 50px
                  }
                }
              \`}
            >
              Top-level content

              <p className={'child-class'}>Child content</p>
            </div>
            `}
        />

        <hr />

        <p>
          The below example uses the Styled Component way, with CSS written in a dedicated React Component.
        </p>

        <Code
          text={`
            import styled from '@emotion/styled';

            const StyledImage = styled.img\`
              width: 50px;
              height: 100px;

              @media screen and (min-width: 576px) {
                height: 50px
              }
            \`;

            const Image = (props): JSX.Element => {
              const { onClick } = props;
              return (
                <StyledImage onClick={onClick}
              );
          `}
        />

      </DocPage>
    </DefaultLayout>
  );
};

export default (ExampleCssInJsPage);
