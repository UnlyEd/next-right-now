/** @jsx jsx */
import { jsx } from '@emotion/core';
import * as Sentry from '@sentry/node';
import { createLogger } from '@unly/utils-simple-logger';
import deepmerge from 'deepmerge';
import map from 'lodash.map';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { NextRouter, useRouter } from 'next/router';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React, { useState } from 'react';
import DefaultLayout from '../../../../../components/pageLayouts/DefaultLayout';
import withApollo from '../../../../../hocs/withApollo';
import { StaticParams } from '../../../../../types/nextjs/StaticParams';
import { StaticPath } from '../../../../../types/nextjs/StaticPath';
import { StaticPathsOutput } from '../../../../../types/nextjs/StaticPathsOutput';
import { StaticPropsInput } from '../../../../../types/nextjs/StaticPropsInput';
import { StaticPropsOutput } from '../../../../../types/nextjs/StaticPropsOutput';
import { OnlyBrowserPageProps } from '../../../../../types/pageProps/OnlyBrowserPageProps';
import { SSGPageProps } from '../../../../../types/pageProps/SSGPageProps';
import { getCommonStaticPaths, getCommonStaticProps } from '../../../../../utils/nextjs/SSG';
import { Alert } from 'reactstrap';

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
  console.log('getStaticProps.props', props);
  const { params: { albumId } } = props;
  const album = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error); // eslint-disable-line no-console
      Sentry.captureException(error);
    });

  return deepmerge(commonStaticProps, {
    props: {
      album,
      albumId,
    },
  });
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

  console.log('commonStaticPaths', commonStaticPaths)

  return {
    ...commonStaticPaths,
    fallback: true,
  };
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
  album: any;
} & SSGPageProps<Partial<OnlyBrowserPageProps>>;

const ExampleWithSSGAndFallbackAlbumPage: NextPage<Props> = (props): JSX.Element => {
  const { albumId, album } = props;
  const router: NextRouter = useRouter();
  const [hasUsedFallbackRendering] = useState<boolean>(router.isFallback);

  console.debug('ExampleWithSSGAndFallbackAlbumPage.props', props);
  console.debug('router.isFallback', router.isFallback);

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

        <h1>Album N°{albumId || 'Unknown'}</h1>
        <div>
          Title: {album?.title || 'Unknown'}<br />
          User Id: {album?.userId || 'Unknown'}<br />
        </div>
      </div>

    </DefaultLayout>
  );
};

export default withApollo()(ExampleWithSSGAndFallbackAlbumPage);
