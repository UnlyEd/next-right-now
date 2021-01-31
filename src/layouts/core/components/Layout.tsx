import { SoftPageProps } from '@/layouts/core/types/SoftPageProps';
import { GenericObject } from '@/modules/core/data/types/GenericObject';
import DefaultErrorLayout from '@/modules/core/errorHandling/DefaultErrorLayout';
import PreviewModeBanner from '@/modules/core/previewMode/components/PreviewModeBanner';
import Sentry from '@/modules/core/sentry/sentry';
import ErrorPage from '@/pages/_error';
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
import React from 'react';
import BaseFooter from './Footer';
import Head, { HeadProps } from './Head';
import Nav from './Nav';
import DefaultPageContainer from './PageContainer';

const fileLabel = 'layouts/core/components/Layout';
const logger = createLogger({
  label: fileLabel,
});

type Props = {
  /**
   * Content to display within the layout.
   *
   * Essentially, the page's content.
   */
  children: React.ReactNode;

  /**
   * Props forwarded to the Head component.
   *
   * Essentially, SEO metadata, etc.
   * Will use sane defaults if not specified.
   */
  headProps?: HeadProps;

  /**
   * Internal name of the page.
   *
   * Used by Amplitude, for analytics.
   * All events happening on the page will be linked to that page name.
   */
  pageName: string;

  /**
   * Wrapper container for the page.
   *
   * By default, uses DefaultPageContainer component.
   */
  PageContainer?: React.FunctionComponent;
} & SoftPageProps;

/**
 * Handles the positioning of top-level elements within the page.
 *
 * It does the following:
 *  - Adds a Nav/Footer component, and the dynamic Next.js "Page" component in between.
 *  - Automatically track page views (Amplitude).
 *  - Handles errors by displaying the Error page, with the ability to contact technical support (which will send a Sentry User Feedback).
 *
 * XXX Core component, meant to be used by other layouts, shouldn't be used by other components directly.
 */
const Layout: React.FunctionComponent<Props> = (props): JSX.Element => {
  const {
    children,
    error,
    isInIframe = false, // Won't be defined server-side
    headProps = {},
    pageName,
    PageContainer = DefaultPageContainer,
  } = props;
  const router: NextRouter = useRouter();
  const isIframeWithFullPagePreview = router?.query?.fullPagePreview === '1';

  Sentry.addBreadcrumb({ // See https://docs.sentry.io/enriching-error-data/breadcrumbs
    category: fileLabel,
    message: `Rendering ${fileLabel} for page ${pageName}`,
    level: Sentry.Severity.Debug,
  });

  Sentry.configureScope((scope): void => {
    scope.setTag('fileLabel', fileLabel);
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
        process.env.NEXT_PUBLIC_APP_STAGE !== 'production' && (
          <PreviewModeBanner />
        )
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
            <PageContainer>
              {children}
            </PageContainer>
          )
        }
      </div>

      {
        (!isInIframe || isIframeWithFullPagePreview) && (
          <BaseFooter />
        )
      }
    </Amplitude>
  );
};

export default Layout;
