import { createLogger } from '@unly/utils-simple-logger';
import {
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';
import { Alert } from 'reactstrap';

import BuiltInUtilitiesSidebar from '../../../../components/doc/BuiltInUtilitiesSidebar';
import DocPage from '../../../../components/doc/DocPage';
import DefaultLayout from '../../../../components/pageLayouts/DefaultLayout';
import EnglishFlag from '../../../../components/svg/EnglishFlag';
import FrenchFlag from '../../../../components/svg/FrenchFlag';
import Code from '../../../../components/utils/Code';
import ExternalLink from '../../../../components/utils/ExternalLink';
import { CommonServerSideParams } from '../../../../types/nextjs/CommonServerSideParams';
import { OnlyBrowserPageProps } from '../../../../types/pageProps/OnlyBrowserPageProps';
import { SSGPageProps } from '../../../../types/pageProps/SSGPageProps';
import {
  getExamplesCommonStaticPaths,
  getExamplesCommonStaticProps,
} from '../../../../utils/nextjs/SSG';

const fileLabel = 'pages/[locale]/examples/built-in-utilities/svg-to-react';
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

const SvgToReactPage: NextPage<Props> = (props): JSX.Element => {
  return (
    <DefaultLayout
      {...props}
      pageName={'svg-to-react'}
      headProps={{
        title: 'SVG to React examples - Next Right Now',
      }}
      Sidebar={BuiltInUtilitiesSidebar}
    >
      <DocPage>
        <h1 className={'pcolor'}>SVG to react component examples</h1>

        <p>
          If you use SVGs, you may want to easily convert those as React components so that they're easier to work with (custom props, dynamic colors/size, etc.).<br />
          That's what we did with the country flags:<br />
          <FrenchFlag />
          <EnglishFlag />
          <br />
          It'd be very easy to update those components to add some additional capabilities, such as resizing them through props, because they're React components.
        </p>

        <p>
          Usually, our designer make SVGs on their own, and then they send them to us developers, and we have to integrate them within our app.<br />
          That can be tricky and a tiresome process. We use the awesome
          <ExternalLink href={'https://github.com/gregberge/svgr'}>SVGR</ExternalLink> library, which basically converts our SVG into React components.
        </p>

        <Code
          text={`yarn svg`}
        />
        <br />

        <Alert color={'info'}>
          Running this script will convert all <code>.svg</code> files in the <code>src/svg</code> folder.<br />
          Only SVGs are git tracked within this folder, because the generated React components are supposed to be temporary there.<br />
          They're meant to be copied/moved into the <code>src/components</code> folder once they'eve been generated, and to be used/customised from there.<br />
          <br />
          Personally, we like to move them to <code>src/components/svg</code>, but feel free to do as you like.
        </Alert>

      </DocPage>
    </DefaultLayout>
  );
};

export default (SvgToReactPage);
