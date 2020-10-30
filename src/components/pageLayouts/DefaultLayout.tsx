import {
  Amplitude,
  LogOnMount,
} from '@amplitude/react-amplitude';
import { createLogger } from '@unly/utils-simple-logger';
import classnames from 'classnames';
import {
  NextRouter,
  useRouter,
} from 'next/router';
import React, { useState } from 'react';

import ErrorPage from '../../pages/_error';
import { GenericObject } from '../../types/GenericObject';
import { SoftPageProps } from '../../types/pageProps/SoftPageProps';
import Sentry from '../../utils/monitoring/sentry';
import DefaultErrorLayout from '../errors/DefaultErrorLayout';
import DefaultPageContainer from './DefaultPageContainer';
import Footer from './Footer';
import Head, { HeadProps } from './Head';
import Nav from './Nav';
import PreviewModeBanner from './PreviewModeBanner';

const fileLabel = 'components/pageLayouts/DefaultLayout';
const logger = createLogger({
  label: fileLabel,
});

export type SidebarProps = {
  className: string;
}

type Props = {
  children: React.ReactNode;
  headProps: HeadProps;
  pageName: string;
  Sidebar?: React.FunctionComponent<SidebarProps>;
} & SoftPageProps;

/**
 * Handles the positioning of top-level elements within the page
 *
 * It does the following:
 *  - Adds a Nav/Footer component, and the dynamic Next.js "Page" component in between
 *  - Optionally, it can also display a left sidebar (i.e: used within examples sections)
 *  - Automatically track page views (Amplitude)
 *  - Handles errors by displaying the Error page, with the ability to contact technical support (which will send a Sentry User Feedback)
 *
 * @param props
 */
const DefaultLayout: React.FunctionComponent<Props> = (props): JSX.Element => {
  const {
    children,
    error,
    isInIframe = false, // Won't be defined server-side
    headProps = {},
    pageName,
    Sidebar,
  } = props;
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true); // Todo make default value depend on viewport size
  const router: NextRouter = useRouter();
  const isIframeWithFullPagePreview = router?.query?.fullPagePreview === '1';

  Sentry.addBreadcrumb({ // See https://docs.sentry.io/enriching-error-data/breadcrumbs
    category: fileLabel,
    message: `Rendering ${fileLabel} for page ${pageName}`,
    level: Sentry.Severity.Debug,
  });

  return (
    <Amplitude
      eventProperties={(inheritedProps): GenericObject => ({
        ...inheritedProps,
        page: {
          ...inheritedProps.page,
          name: pageName,
        },
      })}
    >
      <Head {...headProps} />
      <LogOnMount eventType="page-displayed" />

      {/* Loaded from components/Head - See https://github.com/mikemaccana/outdated-browser-rework */}
      {/*<div*/}
      {/*  id="outdated"*/}
      {/*  style={{ display: 'none' }}*/}
      {/*></div>*/}

      {
        // XXX You may want to enable preview mode during non-production stages only
        // process.env.NEXT_PUBLIC_APP_STAGE !== 'production' && (
        <PreviewModeBanner />
        // )
      }

      {
        (!isInIframe || isIframeWithFullPagePreview) && (
          <Nav />
        )
      }

      <div
        className={classnames('page-wrapper', isInIframe ? 'is-in-iframe' : 'not-in-iframe')}
      >
        {
          // If an error happened, we display it instead of displaying the page
          // We display a custom error instead of the native Next.js error by providing children (removing children will display the native Next.js error)
          error ? (
            <ErrorPage
              statusCode={500}
              isReadyToRender={true}
              err={error}
            >
              <DefaultErrorLayout
                error={error}
              />
            </ErrorPage>
          ) : (
            <DefaultPageContainer
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
              Sidebar={Sidebar}
            >
              {children}
            </DefaultPageContainer>
          )
        }
      </div>

      {
        (!isInIframe || isIframeWithFullPagePreview) && (
          <Footer />
        )
      }
    </Amplitude>
  );
};

export default DefaultLayout;
