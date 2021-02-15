import { CommonServerSideParams } from '@/app/types/CommonServerSideParams';
import { StaticPath } from '@/app/types/StaticPath';
import { StaticPathsOutput } from '@/app/types/StaticPathsOutput';
import { StaticPropsInput } from '@/app/types/StaticPropsInput';
import Btn from '@/common/components/dataDisplay/Btn';
import ExternalLink from '@/common/components/dataDisplay/ExternalLink';
import waitFor from '@/common/utils/waitFor';
import { OnlyBrowserPageProps } from '@/layouts/core/types/OnlyBrowserPageProps';
import { SSGPageProps } from '@/layouts/core/types/SSGPageProps';
import DemoLayout from '@/layouts/demo/components/DemoLayout';
import NativeFeaturesSidebar from '@/layouts/demo/components/NativeFeaturesSidebar';
import {
  getDemoStaticPaths,
  getDemoStaticProps,
} from '@/layouts/demo/demoSSG';
import I18nLink from '@/modules/core/i18n/components/I18nLink';
import { getRandomInt } from '@/modules/core/js/random';
import songs from '@/modules/core/testing/mocks/songs';
import { css } from '@emotion/react';
import { createLogger } from '@unly/utils-simple-logger';
import deepmerge from 'deepmerge';
import map from 'lodash.map';
import {
  GetStaticPaths,
  GetStaticPathsContext,
  GetStaticProps,
  GetStaticPropsResult,
  NextPage,
} from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';
import { Alert } from 'reactstrap';

const fileLabel = 'pages/[locale]/demo/native-features/example-with-ssg-and-fallback/[albumId]';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  label: fileLabel,
});

type PageAdditionalServerSideParams = {
  albumId: string;
}

/**
 * Only executed on the server side at build time.
 * Necessary when a page has dynamic routes and uses "getStaticProps".
 */
export const getStaticPaths: GetStaticPaths<CommonServerSideParams> = async (context: GetStaticPathsContext): Promise<StaticPathsOutput<PageAdditionalServerSideParams>> => {
  const commonStaticPaths: StaticPathsOutput<PageAdditionalServerSideParams> = await getDemoStaticPaths(context) as StaticPathsOutput<PageAdditionalServerSideParams>;
  const { paths } = commonStaticPaths;
  const albumIdsToPreBuild = ['1', '2']; // Only '/album-1-with-ssg-and-fallback' and '/album-2-with-ssg-and-fallback' are generated at build time, other will be generated on-demand
  const preBuiltPaths: StaticPathsOutput<PageAdditionalServerSideParams> = {
    paths: [],
    fallback: true
  };

  // Generate pre-built paths based on the ids to pre-build
  map(albumIdsToPreBuild, (albumId: string): void => {
    map(paths, (path: StaticPath<PageAdditionalServerSideParams>) => {
      preBuiltPaths.paths.push({
        params: {
          ...path.params,
          albumId: albumId
        }
      });
    });
  });

  return preBuiltPaths;
};

/**
 * Only executed on the server side at build time.
 *
 * @return Props (as "SSGPageProps") that will be passed to the Page component, as props.
 *
 * @see https://github.com/vercel/next.js/discussions/10949#discussioncomment-6884
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 */
export const getStaticProps: GetStaticProps<SSGPageProps, CommonServerSideParams> = async (props: StaticPropsInput<PageAdditionalServerSideParams>): Promise<GetStaticPropsResult<SSGPageProps>> => {
  const commonStaticProps: GetStaticPropsResult<SSGPageProps> = await getDemoStaticProps(props);
  const { params: { albumId } } = props;

  // Simulate API call by awaiting
  const awaitForMs = getRandomInt(1000, 4000);
  await waitFor(awaitForMs);

  let songId = parseInt(albumId, 10);

  if (songId > songs.length - 1) { // Handle overflow
    songId = 0;
  } else if (songId < 0) {
    songId = 0;
  }

  // Simulates an API response
  const album: Album = {
    id: songId,
    title: songs[songId],
    awaitedForMs: awaitForMs,
  };

  if ('props' in commonStaticProps) {
    return deepmerge(commonStaticProps, {
      props: {
        album,
        albumId,
      },
    });
  } else {
    return commonStaticProps;
  }
};

type Album = {
  id: number;
  title: string;
  awaitedForMs: number;
};

/**
 * SSG pages are first rendered by the server (during static bundling).
 * Then, they're rendered by the client, and gain additional props (defined in OnlyBrowserPageProps).
 * Because this last case is the most common (server bundle only happens during development stage), we consider it a default.
 * To represent this behaviour, we use the native Partial TS keyword to make all OnlyBrowserPageProps optional.
 *
 * Beware props in OnlyBrowserPageProps are not available on the server.
 */
type Props = {
  albumId: string;
  album: Album;
} & SSGPageProps<Partial<OnlyBrowserPageProps>>;

const ExampleWithSSGAndFallbackAlbumPage: NextPage<Props> = (props): JSX.Element => {
  const {
    albumId,
    album,
    isSSGFallbackInitialBuild,
  } = props;
  const {
    id,
    title,
    awaitedForMs,
  } = album;

  return (
    <DemoLayout
      {...props}
      pageName={'example-with-ssg-and-fallback/[albumId]'}
      headProps={{
        seoTitle: `Album N°${albumId} (SSG, ${isSSGFallbackInitialBuild ? 'using fallback' : 'not using fallback'}) - Next Right Now`,
      }}
      Sidebar={NativeFeaturesSidebar}
    >
      <h1>Example, using SSG with fallback option</h1>

      <div>
        <Alert color={'info'} tag={'div'}>
          This page will always be rendered statically, but the static bundle may be built either when deploying the website (AKA "pre-built"), or on-demand.<br />
          <br />
          This example has been made such as the main page (at /1) is pre-built, while all other pages are built on-demand, dynamically.<br />
          Once the static page has been generated, it'll use the static version for all upcoming requests. Only the first user suffers from the waiting due to the build.<br />
          When the page hasn't been rendered before (no static build available), then we display the <code>Loader</code> component so that the user can see something is happening instead of a white page.<br />
          <br />

          {
            isSSGFallbackInitialBuild ? (
              <p>
                This page <b>has</b> used fallback rendering (it <b>hadn't</b> been generated previously).
              </p>
            ) : (
              <p>
                This page <b>has not</b> used fallback rendering (it <b>had</b> been generated previously).
              </p>
            )
          }
        </Alert>

        <Alert color={'warning'}>
          If you use the below "previous"/"next" button, it'll make you believe pages were pre-rendered, but it's not true.<br />
          Next is so smart that it optimize this kind of stuff, using the <code>next/link</code> (or <code>I18nLink</code>) component preload pages and build them before you click on them.<br />
          If you want to check for sure if a page has been pre-rendered, you better use the "next +2" link, which uses a <code>a</code> which doesn't have such optimizations.
        </Alert>

        <div
          css={css`
            background-color: white;
            border-radius: 5px;
            padding: 30px;
            text-align: center;
          `}
        >
          <h1>Album N°{albumId}</h1>
          <div>
            Title: {title}<br />
          </div>

          <div
            css={css`
              display: flex;
              justify-content: center;
            `}
          >
            {
              id > 0 && (
                <I18nLink
                  href={'/demo/native-features/example-with-ssg-and-fallback/[albumId]'}
                  params={{
                    albumId: id - 1,
                  }}
                >
                  <Btn mode={'primary-outline'}>Go to previous album</Btn>
                </I18nLink>
              )
            }
            <Btn
              mode={'primary-outline'}
              css={css`
                border-width: 0;
              `}
            >
              {' | '}
            </Btn>
            <I18nLink
              href={'/demo/native-features/example-with-ssg-and-fallback/[albumId]'}
              params={{
                albumId: id + 1,
              }}
            >
              <Btn mode={'primary-outline'}>Go to next album</Btn>
            </I18nLink>

          </div>

          <ExternalLink href={`/demo/native-features/example-with-ssg-and-fallback/${id + 2}`}>
            <Btn mode={'primary-outline'}>Go to next+2 album (opens new tab)</Btn>
          </ExternalLink>

          <div>
            <br />
            <i>The request was slowed by <b>{awaitedForMs}ms</b> before being sent to the browser, to simulate a real API call.</i>
          </div>
        </div>

        <br />
        <br />

        <Alert color={'success'}>
          In order to simplify things, NRN sets the <code>isSSGFallbackInitialBuild</code> variable, available in all pages as props.
        </Alert>

        <Alert color={'warning'}>
          In development mode, it is not possible to simulate <code>fallback</code> mode properly.<br />
          Each page refresh will completely refresh the page, any previous build will be ignored, and all page refresh will have <code>isSSGFallbackInitialBuild: true</code>.
        </Alert>
      </div>

    </DemoLayout>
  );
};

export default (ExampleWithSSGAndFallbackAlbumPage);
