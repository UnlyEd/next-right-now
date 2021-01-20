import { CommonServerSideParams } from '@/app/types/CommonServerSideParams';
import EnglishHybridFlag from '@/common/components/countryFlags/EnglishHybridFlag';
import EnglishUkFlag from '@/common/components/countryFlags/EnglishUkFlag';
import FrenchFlag from '@/common/components/countryFlags/FrenchFlag';
import Code from '@/common/components/dataDisplay/Code';
import ExternalLink from '@/common/components/dataDisplay/ExternalLink';
import { OnlyBrowserPageProps } from '@/layouts/core/types/OnlyBrowserPageProps';
import { SSGPageProps } from '@/layouts/core/types/SSGPageProps';
import BuiltInUtilitiesSidebar from '@/layouts/demo/components/BuiltInUtilitiesSidebar';
import DemoLayout from '@/layouts/demo/components/DemoLayout';
import DemoPage from '@/layouts/demo/components/DemoPage';
import {
  getDemoStaticPaths,
  getDemoStaticProps,
} from '@/layouts/demo/demoSSG';
import { css } from '@emotion/react';
import { createLogger } from '@unly/utils-simple-logger';
import {
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';
import { Alert } from 'reactstrap';

const fileLabel = 'pages/[locale]/demo/built-in-utilities/svg-to-react';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  label: fileLabel,
});

/**
 * Only executed on the server side at build time
 * Necessary when a page has dynamic routes and uses "getStaticProps"
 */
export const getStaticPaths: GetStaticPaths<CommonServerSideParams> = getDemoStaticPaths;

/**
 * Only executed on the server side at build time.
 *
 * @return Props (as "SSGPageProps") that will be passed to the Page component, as props
 *
 * @see https://github.com/vercel/next.js/discussions/10949#discussioncomment-6884
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 */
export const getStaticProps: GetStaticProps<SSGPageProps, CommonServerSideParams> = getDemoStaticProps;

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
    <DemoLayout
      {...props}
      pageName={'svg-to-react'}
      headProps={{
        seoTitle: 'SVG to React examples - Next Right Now',
      }}
      Sidebar={BuiltInUtilitiesSidebar}
    >
      <DemoPage>
        <h1 className={'pcolor'}>SVG to react component examples</h1>
        <p
          css={css`
            .flags {
              margin: 10px 20px 10px 0;
            }
          `}
        >
          If you use SVGs, you may want to easily convert those as React components so that they're easier to work with (custom props, dynamic colors/size, etc.).<br />
          That's what we did with the country flags:<br />
          <FrenchFlag className={'flags'} />
          <EnglishHybridFlag className={'flags'} />
          <EnglishUkFlag className={'flags'} />
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

      </DemoPage>
    </DemoLayout>
  );
};

export default (SvgToReactPage);
