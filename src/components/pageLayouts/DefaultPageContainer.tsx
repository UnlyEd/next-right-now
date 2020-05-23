/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import classnames from 'classnames';
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
