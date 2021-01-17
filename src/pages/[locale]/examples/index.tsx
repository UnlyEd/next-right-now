import { Amplitude } from '@amplitude/react-amplitude';
import { createLogger } from '@unly/utils-simple-logger';
import {
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from 'next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
import React from 'react';

import BuiltInFeaturesSection from '@/common/components/nrnDoc/BuiltInFeaturesSection';
import BuiltInUtilitiesSection from '@/common/components/nrnDoc/BuiltInUtilitiesSection';
import ExternalFeaturesSection from '@/common/components/nrnDoc/ExternalFeaturesSection';
import IntroductionSection from '@/common/components/nrnDoc/IntroductionSection';
import NativeFeaturesSection from '@/common/components/nrnDoc/NativeFeaturesSection';
import { LogEvent } from '@/modules/amplitude/types/Amplitude';
import { CommonServerSideParams } from '@/modules/bootstrapping/types/CommonServerSideParams';
import { OnlyBrowserPageProps } from '@/modules/app/types/OnlyBrowserPageProps';
import { SSGPageProps } from '@/modules/app/types/SSGPageProps';
import { getExamplesCommonStaticPaths, getExamplesCommonStaticProps } from '@/modules/app/SSG';
import DefaultLayout from '@/common/components/layouts/DefaultLayout';

const fileLabel = 'pages/[locale]/examples/index';
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

const ExampleHomePage: NextPage<Props> = (props): JSX.Element => {
  return (
    <DefaultLayout
      {...props}
      pageName={'index'}
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

    </DefaultLayout>
  );
};

export default (ExampleHomePage);
