import { CommonServerSideParams } from '@/app/types/CommonServerSideParams';
import Code from '@/common/components/dataDisplay/Code';
import { OnlyBrowserPageProps } from '@/layouts/core/types/OnlyBrowserPageProps';
import { SSGPageProps } from '@/layouts/core/types/SSGPageProps';
import BuiltInUtilitiesSidebar from '@/layouts/demo/components/BuiltInUtilitiesSidebar';
import DemoLayout from '@/layouts/demo/components/DemoLayout';
import DemoPage from '@/layouts/demo/components/DemoPage';
import {
  getDemoStaticPaths,
  getDemoStaticProps,
} from '@/layouts/demo/demoSSG';
import I18nLink from '@/modules/core/i18n/components/I18nLink';
import { createLogger } from '@unly/utils-simple-logger';
import {
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';
import { Alert } from 'reactstrap';

const fileLabel = 'pages/[locale]/demo/built-in-utilities/i18nLink-component';
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

const ExampleI18nLinkComponentPage: NextPage<Props> = (props): JSX.Element => {
  return (
    <DemoLayout
      {...props}
      pageName={'i18nLink-component'}
      headProps={{
        seoTitle: 'I18nLink component examples - Next Right Now',
      }}
      Sidebar={BuiltInUtilitiesSidebar}
    >
      <DemoPage>
        <h1 className={'pcolor'}>I18nLink component examples</h1>

        <Alert color={'info'}>
          <code>{`<I18nLink />`}</code> component is based on Next.js native <code>{`<Link />`}</code> component.<br />
          It's an utility that automatically handles localisation and acts as a wrapper for <code>{`<Link />`}</code>. <br />
          If you'd use the <code>{`<Link />`}</code> component, you'd have to provide which locale is the current locale, and build the link accordingly.<br />
          That's basically what <code>{`<I18nLink />`}</code> does.
        </Alert>

        <p>
          <I18nLink href={'/demo/built-in-utilities/i18nLink-component'}>
            This is a link going to the same page (keeps the current locale)
          </I18nLink><br />
          <I18nLink href={'/demo/built-in-utilities/i18nLink-component'} locale={'fr-FR'}>
            This is a link going to the same page (forces to switch to <code>fr-FR</code> locale)
          </I18nLink><br />
          <I18nLink href={'/demo/built-in-utilities/i18nLink-component'} locale={'en-US'}>
            This is a link going to the same page (forces to switch to <code>en-US</code> locale)
          </I18nLink><br />
        </p>

        <Code
          text={`
            <I18nLink href={'/demo/built-in-utilities/i18nLink-component'}>
              This is a link going to the same page (keeps the current locale)
            </I18nLink>
            <I18nLink href={'/demo/built-in-utilities/i18nLink-component'} locale={'fr-FR'}>
              This is a link going to the same page (forces to switch to <code>fr-FR</code> locale)
            </I18nLink>
            <I18nLink href={'/demo/built-in-utilities/i18nLink-component'} locale={'en-US'}>
              This is a link going to the same page (forces to switch to <code>en-US</code> locale)
            </I18nLink>
          `}
        />

      </DemoPage>
    </DemoLayout>
  );
};

export default (ExampleI18nLinkComponentPage);
