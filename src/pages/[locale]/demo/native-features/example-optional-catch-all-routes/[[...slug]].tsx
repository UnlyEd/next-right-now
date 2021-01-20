import { CommonServerSideParams } from '@/app/types/CommonServerSideParams';
import { StaticPath } from '@/app/types/StaticPath';
import { StaticPathsOutput } from '@/app/types/StaticPathsOutput';
import { OnlyBrowserPageProps } from '@/layouts/core/types/OnlyBrowserPageProps';
import { SSGPageProps } from '@/layouts/core/types/SSGPageProps';
import DemoLayout from '@/layouts/demo/components/DemoLayout';
import DemoPage from '@/layouts/demo/components/DemoPage';
import NativeFeaturesSidebar from '@/layouts/demo/components/NativeFeaturesSidebar';
import { getDemoStaticProps } from '@/layouts/demo/demoSSG';
import I18nLink from '@/modules/core/i18n/components/I18nLink';
import { supportedLocales } from '@/modules/core/i18n/i18nConfig';
import { I18nLocale } from '@/modules/core/i18n/types/I18nLocale';
import { createLogger } from '@unly/utils-simple-logger';
import map from 'lodash.map';
import {
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from 'next';
import { useRouter } from 'next/router';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';
import { Alert } from 'reactstrap';

const fileLabel = 'pages/[locale]/demo/native-features/example-optional-catch-all-routes/[[...slug]]';
const logger = createLogger({ // eslint-disable-line no-unused-vars,@typescript-eslint/no-unused-vars
  label: fileLabel,
});

type PageAdditionalServerSideParams = {
  slug: string[];
}

/**
 * Only executed on the server side at build time
 * Necessary when a page has dynamic routes and uses "getStaticProps"
 */
export const getStaticPaths: GetStaticPaths<CommonServerSideParams> = async (): Promise<StaticPathsOutput<PageAdditionalServerSideParams>> => {
  const paths: StaticPath<PageAdditionalServerSideParams>[] = map(supportedLocales, (supportedLocale: I18nLocale): StaticPath<PageAdditionalServerSideParams> => {
    return {
      params: {
        locale: supportedLocale.name,
        slug: [],
      },
    };
  });

  return {
    fallback: true, // XXX Must enable fallback mode when using catch-all route otherwise it'll return a 404 - See https://github.com/vercel/next.js/discussions/16907
    paths,
  };
};

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

const ExampleWithCatchAllRoutesPage: NextPage<Props> = (props): JSX.Element => {
  const { query } = useRouter();
  const { slug } = query;

  return (
    <DemoLayout
      {...props}
      pageName={'examples'}
      headProps={{
        seoTitle: `Catch-all dynamic routes examples - Next Right Now`,
      }}
      Sidebar={NativeFeaturesSidebar}
    >
      <DemoPage>
        <h1 className={'pcolor'}>Catch-all dynamic routes examples</h1>

        <Alert color={'info'}>
          You can change the url yourself to about anything you want, with multiple nested levels.<br />
          The page will be <b>dynamically generated as static page</b> <i>(fallback: true)</i> and served as a static page from now on.
        </Alert>

        <b>URL <code>slug</code> parameters:</b> <code>{(slug as string[])?.join('/')}</code><br />
        <I18nLink href={'/demo/native-features/example-optional-catch-all-routes/you/can/go/to/any/depth/you/want'}>Go to some nested path</I18nLink>

        <hr />

        <Alert color={'info'}>
          This feature allows you to use a dynamic page (catch-all) that will build subpages dynamically based on the parameters you provide.<br />
          It's extremely powerful and can be used to dynamically generate product pages, for instance.<br />
          You can also combine it with the <code>revalidate</code> option so that your page gets refreshed based on your revalidation strategy, to keep the content up-to-date, for instance.
        </Alert>

        <Alert color={'warning'}>
          Make sure you use <code>fallback: true</code>
          <b>when using SSG</b>, otherwise it'll generate a 404 page, and won't be able to dynamically generate the page.<br />
        </Alert>
      </DemoPage>
    </DemoLayout>
  );
};

export default (ExampleWithCatchAllRoutesPage);
