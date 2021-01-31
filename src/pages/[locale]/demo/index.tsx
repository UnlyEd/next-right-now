import { CommonServerSideParams } from '@/app/types/CommonServerSideParams';
import { OnlyBrowserPageProps } from '@/layouts/core/types/OnlyBrowserPageProps';
import { SSGPageProps } from '@/layouts/core/types/SSGPageProps';
import BuiltInFeaturesSection from '@/layouts/demo/components/BuiltInFeaturesSection';
import BuiltInUtilitiesSection from '@/layouts/demo/components/BuiltInUtilitiesSection';
import DemoLayout from '@/layouts/demo/components/DemoLayout';
import ExternalFeaturesSection from '@/layouts/demo/components/ExternalFeaturesSection';
import IntroductionSection from '@/layouts/demo/components/IntroductionSection';
import NativeFeaturesSection from '@/layouts/demo/components/NativeFeaturesSection';
import {
  getDemoStaticPaths,
  getDemoStaticProps,
} from '@/layouts/demo/demoSSG';
import { AMPLITUDE_PAGES } from '@/modules/core/amplitude/amplitude';
import { LogEvent } from '@/modules/core/amplitude/types/Amplitude';
import { Amplitude } from '@amplitude/react-amplitude';
import { createLogger } from '@unly/utils-simple-logger';
import {
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';

const fileLabel = 'pages/[locale]/demo/index';
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

const ExampleHomePage: NextPage<Props> = (props): JSX.Element => {
  return (
    <DemoLayout
      {...props}
      pageName={AMPLITUDE_PAGES.DEMO_HOME_PAGE}
      headProps={{
        seoTitle: 'Homepage - Next Right Now',
      }}
    >
      <Amplitude>
        {
          ({ logEvent }: { logEvent: LogEvent }): JSX.Element => {
            return (
              <>
                <IntroductionSection
                  logEvent={logEvent}
                />

                <NativeFeaturesSection />
                <BuiltInFeaturesSection />
                <BuiltInUtilitiesSection />
                <ExternalFeaturesSection />
              </>
            );
          }
        }
      </Amplitude>

    </DemoLayout>
  );
};

export default (ExampleHomePage);
