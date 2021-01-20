import {
  css,
  useTheme,
} from '@emotion/react';
import classnames from 'classnames';
import React from 'react';
import { Container } from 'reactstrap';
import { SidebarProps } from './DemoLayout';
import SidebarToggle from './SidebarToggle';

type Props = {
  children: React.ReactNode;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (boolean) => void;
  Sidebar: React.FunctionComponent<SidebarProps>;
}

/**
 * Page wrapper handling the display of the Next.js Page component (as "children").
 *
 * XXX Demo component, not meant to be modified. It's a copy of the core implementation, so the demo keeps working even the core implementation changes.
 */
const DemoPageContainer: React.FunctionComponent<Props> = (props): JSX.Element => {
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

export default DemoPageContainer;
