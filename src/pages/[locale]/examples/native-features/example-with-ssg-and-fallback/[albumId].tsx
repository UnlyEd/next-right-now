/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { createLogger } from '@unly/utils-simple-logger';
import deepmerge from 'deepmerge';
import map from 'lodash.map';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { NextRouter, useRouter } from 'next/router';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React, { useState } from 'react';
import { Alert, Button } from 'reactstrap';
import I18nLink from '../../../../../components/i18n/I18nLink';
import DefaultLayout from '../../../../../components/pageLayouts/DefaultLayout';
import withApollo from '../../../../../hocs/withApollo';
import useI18n from '../../../../../hooks/useI18n';
import { StaticParams } from '../../../../../types/nextjs/StaticParams';
import { StaticPath } from '../../../../../types/nextjs/StaticPath';
import { StaticPathsOutput } from '../../../../../types/nextjs/StaticPathsOutput';
import { StaticPropsInput } from '../../../../../types/nextjs/StaticPropsInput';
import { StaticPropsOutput } from '../../../../../types/nextjs/StaticPropsOutput';
import { OnlyBrowserPageProps } from '../../../../../types/pageProps/OnlyBrowserPageProps';
import { SSGPageProps } from '../../../../../types/pageProps/SSGPageProps';
import { getRandomInt } from '../../../../../utils/math/random';
import { getCommonStaticPaths, getCommonStaticProps } from '../../../../../utils/nextjs/SSG';
import waitFor from '../../../../../utils/timers/waitFor';

const fileLabel = 'pages/[locale]/examples/native-features/example-with-ssg-and-fallback/[albumId]';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  label: fileLabel,
});

/**
 * Only executed on the server side at build time.
 *
 * @return Props (as "SSGPageProps") that will be passed to the Page component, as props
 *
 * @see https://github.com/zeit/next.js/discussions/10949#discussioncomment-6884
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 */
export const getStaticProps: GetStaticProps<SSGPageProps, StaticParams> = async (props: StaticPropsInput): Promise<StaticPropsOutput> => {
  const commonStaticProps: StaticPropsOutput = await getCommonStaticProps(props);
  const { params: { albumId } } = props;

  // Simulate API call by awaiting
  const awaitForMs = getRandomInt(500, 4000);
  await waitFor(awaitForMs);

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const songs = require('../../../../../mocks/songs').default;
  let songId = parseInt(albumId);

  if (songId > songs.length - 1) { // Handle overflow
    songId = 0;
  }

  // Simulates an API response
  const album: Album = {
    id: songId,
    title: songs[songId],
    awaitedForMs: awaitForMs,
  };

  const staticProps: StaticPropsOutput = deepmerge(commonStaticProps, {
    props: {
      album,
      albumId,
    },
  });

  return staticProps;
};

/**
 * Only executed on the server side at build time
 * Necessary when a page has dynamic routes and uses "getStaticProps"
 */
export const getStaticPaths: GetStaticPaths<StaticParams> = async (): Promise<StaticPathsOutput> => {
  const commonStaticPaths: StaticPathsOutput = await getCommonStaticPaths();
  const { paths } = commonStaticPaths;
  const albumIdsToPreBuild = ['1']; // Only '/album-1-with-ssg-and-fallback' is generated at build time, other will be generated on-demand

  map(albumIdsToPreBuild, (albumId: string): void => {
    map(paths, (path: StaticPath) => {
      path.params.albumId = albumId;
    });
  });

  const staticPaths: StaticPathsOutput = {
    ...commonStaticPaths,
    fallback: true,
  };

  return staticPaths;
};

type Album = {
  id: number;
  title: string;
  awaitedForMs: number;
};

/**
 * SSG pages are first rendered by the server (during static bundling)
 * Then, they're rendered by the client, and gain additional props (defined in OnlyBrowserPageProps)
 * Because this last case is the most common (server bundle only happens during development stage), we consider it a default
 * To represent this behaviour, we use the native Partial TS keyword to make all OnlyBrowserPageProps optional
 *
 * Beware props in OnlyBrowserPageProps are not available on the server
 */
type Props = {
  albumId: string;
  album: Album;
} & SSGPageProps<Partial<OnlyBrowserPageProps>>;

const ExampleWithSSGAndFallbackAlbumPage: NextPage<Props> = (props): JSX.Element => {
  const { albumId, album } = props;
  const router: NextRouter = useRouter();
  const { locale } = useI18n();
  const [hasUsedFallbackRendering] = useState<boolean>(router.isFallback);
  const { id, title, awaitedForMs } = album;

  return (
    <DefaultLayout
      {...props}
      pageName={'example-with-ssg-and-fallback/[albumId]'}
      headProps={{
        title: `Album N°${albumId} (SSG, ${hasUsedFallbackRendering ? 'using fallback' : 'not using fallback'}) - Next Right Now`,
      }}
    >
      <div>
        <Alert color={'info'} tag={'div'}>
          {
            hasUsedFallbackRendering ? (
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
          <I18nLink
            href={'/examples/native-features/example-with-ssg-and-fallback/[albumId]'}
            as={`/${locale}/examples/native-features/example-with-ssg-and-fallback/${id - 1}`}
          >
            <Button color={'link'}>Go to previous album</Button>
          </I18nLink>

          <I18nLink
            href={'/examples/native-features/example-with-ssg-and-fallback/[albumId]'}
            as={`/${locale}/examples/native-features/example-with-ssg-and-fallback/${id + 1}`}
          >
            <Button color={'link'}>Go to next album</Button>
          </I18nLink>
        </div>

        <div>
          <br />
          <i>The request was slowed by <b>{awaitedForMs}ms</b> before being sent to the browser, to simulate a real API call.</i>
        </div>

        <br />
        <br />

        <Alert color={'warning'}>
          In development mode, it is not possible to simulate <code>fallback</code> mode properly.<br />
          Each page refresh will completely refresh the page, any previous build will be ignored.
        </Alert>
      </div>

    </DefaultLayout>
  );
};

export default withApollo()(ExampleWithSSGAndFallbackAlbumPage);
