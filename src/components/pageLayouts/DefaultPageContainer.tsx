import { css } from '@emotion/core';
import classnames from 'classnames';
import { useTheme } from 'emotion-theming';
import React from 'react';
import { Container } from 'reactstrap';

import SidebarToggle from '../doc/SidebarToggle';
import { SidebarProps } from './DefaultLayout';

type Props = {
  children: React.ReactNode;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (boolean) => void;
  Sidebar: React.FunctionComponent<SidebarProps>;
}

/**
 * Handles the display of the Next.js Page component (as "children")
 *
 * It does the following:
 *  - Handles display of the optional Sidebar component
 *  - Handles visibility of the side bar based on its state (open/close)
 *  - handles top-level layout transformation related to the sidebar visibility
 *
 * @param props
 */
const DefaultPageContainer: React.FunctionComponent<Props> = (props): JSX.Element => {
  const {
    children,
    isSidebarOpen,
    setIsSidebarOpen,
    Sidebar,
  } = props;
  const { primaryColor } = useTheme();

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

          // Display sidebar below page content on mobile
          @media (max-width: 991.98px) {
            display: flex;
            flex-direction: column-reverse;
          }

          &.sidebar-is-open {
            > .sidebar-container {
              position: fixed; // Sidebar follows scroll
              z-index: 1;
              overflow: auto;
              width: ${sidebarWidth}px;
              padding-top: ${headingTopOffset}px;
              padding-bottom: 20px;
              padding-left: ${spacingAroundContainers}px;
              padding-right: ${spacingAroundContainers}px;
              background-color: white;
              border-radius: 5px;

              // Display sidebar below page content on mobile
              @media (max-width: 991.98px) {
                position: relative;
                width: 100vw;
              }

              .nav-item {
                height: 25px;

                &:hover {
                  opacity: 0.5;
                }
              }
            }

            > .content-container {
              width: calc(100vw - ${spacingAroundContainers}px * 2 - ${sidebarWidth}px);
              margin-left: calc(${spacingAroundContainers}px + ${sidebarWidth}px);
              margin-right: ${spacingAroundContainers}px;

              // Display sidebar below page content on mobile
              @media (max-width: 991.98px) {
                position: relative;
                width: 100vw;
                margin-left: 0; // Reset offset
              }
            }
          }

          &.sidebar-is-close {
            > .sidebar-container {
              position: fixed; // Sidebar follows scroll
              z-index: 1;
            }
          }

          .sidebar {
            .nav-link {
              color: black !important;

              &.active {
                color: ${primaryColor} !important;
              }
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
                <Sidebar className={'sidebar'} />
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

export default DefaultPageContainer;
