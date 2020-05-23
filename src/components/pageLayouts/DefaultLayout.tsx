/** @jsx jsx */
import { Amplitude, LogOnMount } from '@amplitude/react-amplitude';
import { css, jsx } from '@emotion/core';
import { createLogger } from '@unly/utils-simple-logger';
import classnames from 'classnames';
import React, { useState } from 'react';
import { Container } from 'reactstrap';
import ErrorPage from '../../pages/_error';
import { SoftPageProps } from '../../types/pageProps/SoftPageProps';
import Sentry from '../../utils/monitoring/sentry';
import DefaultErrorLayout from '../errors/DefaultErrorLayout';
import Footer from './Footer';
import Head, { HeadProps } from './Head';
import Nav from './Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SidebarToggle from './SidebarToggle';

const fileLabel = 'components/pageLayouts/DefaultLayout';
const logger = createLogger({
  label: fileLabel,
});

type Props = {
  headProps: HeadProps;
  pageName: string;
  Sidebar?: React.FunctionComponent;
} & SoftPageProps;

/**
 * The layout handle the positioning of elements within the page
 *
 * This Layout component adds a Nav/Footer component, and the Page component in between
 * Also, it automatically track page views (Amplitude)
 *
 * It also handle errors by displaying the Error page, with the ability to contact technical support (which will send a Sentry User Feedback)
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

  Sentry.addBreadcrumb({ // See https://docs.sentry.io/enriching-error-data/breadcrumbs
    category: fileLabel,
    message: `Rendering ${fileLabel} for page ${pageName}`,
    level: Sentry.Severity.Debug,
  });

  const PageContainer: React.FunctionComponent = (): JSX.Element => {
    const sidebarWidth = 300;
    const headingTopOffset = 50;
    const spacingAroundContainers = 20;
    const containerCss = css`
      margin-top: ${headingTopOffset}px;
      margin-bottom: ${headingTopOffset}px;
    `;

    if (typeof Sidebar === 'undefined') {
      return (
        <Container
          className={'page-container'}
          css={containerCss}
        >
          {children}
        </Container>
      );

    } else {
      return (
        <div
          className={classnames('page-container', isSidebarOpen ? 'sidebar-is-open' : 'sidebar-is-close')}
          css={css`
            ${containerCss};
            position: relative;

            &.sidebar-is-open {
              > .sidebar-container {
                position: fixed; // Sidebar follows scroll
                z-index: 1;
                width: ${sidebarWidth}px;
                padding-top: ${headingTopOffset}px;
                padding-bottom: calc(${headingTopOffset}px + 20px);
                padding-left: ${spacingAroundContainers}px;
                padding-right: ${spacingAroundContainers}px;
                background-color: white;
                border-radius: 5px;
              }

              > .content-container {
                width: calc(100vw - ${spacingAroundContainers}px * 2 - ${sidebarWidth}px);
                margin-left: calc(${spacingAroundContainers}px + ${sidebarWidth}px);
                margin-right: ${spacingAroundContainers}px;
              }
            }

            &.sidebar-is-close {
              > .sidebar-container {
                position: fixed; // Sidebar follows scroll
                z-index: 1;
              }
            }
          `}
        >
          <div className={classnames('sidebar-container')}>
            {
              isSidebarOpen ? (
                <>
                  <SidebarToggle
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                  />
                  <Sidebar />
                </>
              ) : (
                <SidebarToggle
                  isSidebarOpen={isSidebarOpen}
                  setIsSidebarOpen={setIsSidebarOpen}
                />
              )
            }
          </div>

          <div className={classnames('content-container')}>
            {children}
          </div>
        </div>
      );
    }
  };

  return (
    <Amplitude
      eventProperties={(inheritedProps): object => ({
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
      <div
        id="outdated"
        style={{ display: 'none' }}
      ></div>

      {
        !isInIframe && (
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
            <PageContainer />
          )
        }
      </div>

      {
        !isInIframe && (
          <Footer />
        )
      }
    </Amplitude>
  );
};

export default DefaultLayout;
