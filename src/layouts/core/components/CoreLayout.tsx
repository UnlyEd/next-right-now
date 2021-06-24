import { SoftPageProps } from '@/layouts/core/types/SoftPageProps';
import { GenericObject } from '@/modules/core/data/types/GenericObject';
import DefaultErrorLayout from '@/modules/core/errorHandling/DefaultErrorLayout';
import { createLogger } from '@/modules/core/logging/logger';
import PreviewModeBanner from '@/modules/core/previewMode/components/PreviewModeBanner';
import ErrorPage from '@/pages/_error';
import {
  Amplitude,
  LogOnMount,
} from '@amplitude/react-amplitude';
import {
  css,
  SerializedStyles,
} from '@emotion/react';
import * as Sentry from '@sentry/node';
import classnames from 'classnames';
import {
  NextRouter,
  useRouter,
} from 'next/router';
import React from 'react';
import CoreHead, { HeadProps } from './CoreHead';
import CorePageContainer from './CorePageContainer';

const fileLabel = 'layouts/core/components/CoreLayout';
const logger = createLogger({
  fileLabel,
});

export type Props = {
  /**
   * Content to display within the layout.
   *
   * Essentially, the page's content.
   */
  children: React.ReactNode;

  /**
   * Name of the layout.
   *
   * Will be used as CSS class for the main wrapper element.
   */
  layoutName: 'public-layout' | 'demo-layout';

  /**
   * CSS applied to the main wrapper element.
   *
   * @example layoutBaseCSS={css`
   *   margin: 20px;
   * `}
   */
  layoutBaseCSS?: SerializedStyles;

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
   * By default, uses CorePageContainer component.
   */
  PageContainer?: React.FunctionComponent;

  /**
   * Force hiding the nav.
   */
  hideNav?: boolean;

  /**
   * Force hiding the footer.
   */
  hideFooter?: boolean;

  /**
   * Force hiding the preview banner.
   */
  hidePreviewBanner?: boolean;

  /**
   * Component to use as Head.
   *
   * @default BaseHead
   */
  Head?: React.FunctionComponent<HeadProps>;

  /**
   * Component to use as Footer.
   *
   * @default BaseFooter
   */
  Footer?: React.FunctionComponent;

  /**
   * Component to use as Nav.
   *
   * @default BaseNav
   */
  Nav?: React.FunctionComponent;
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
const CoreLayout: React.FunctionComponent<Props> = (props): JSX.Element => {
  const {
    children,
    error,
    isInIframe = false, // Won't be defined server-side
    layoutName,
    layoutBaseCSS,
    headProps = {},
    pageName,
    PageContainer = CorePageContainer,
    hideNav,
    hideFooter = true,
    hidePreviewBanner = true,
    Head = CoreHead,
    Footer = null,
    Nav = null,
  } = props;
  const router: NextRouter = useRouter();
  const isIframeWithFullPagePreview = router?.query?.fullPagePreview === '1';
  const isPreviewModeBannerDisplayed = !hidePreviewBanner && process.env.NEXT_PUBLIC_APP_STAGE !== 'production';
  const isNavDisplayed = !hideNav && (!isInIframe || isIframeWithFullPagePreview) && Nav;
  const isFooterDisplayed = !hideFooter && (!isInIframe || isIframeWithFullPagePreview) && Footer;

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
      <main
        role={'main'}
        className={layoutName}
        css={css`
          ${layoutBaseCSS || ''}
        `}
      >
        <Head {...headProps} />
        <LogOnMount eventType="page-displayed" />

        {/* Loaded from components/Head - See https://github.com/mikemaccana/outdated-browser-rework */}
        {/*<div*/}
        {/*  id="outdated"*/}
        {/*  style={{ display: 'none' }}*/}
        {/*></div>*/}

        {
          isPreviewModeBannerDisplayed && (
            <PreviewModeBanner />
          )
        }

        {
          (isNavDisplayed) && (
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
          (isFooterDisplayed) && (
            <Footer />
          )
        }
      </main>
    </Amplitude>
  );
};

export default CoreLayout;
