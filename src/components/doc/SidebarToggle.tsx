import { css } from '@emotion/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

type Props = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (boolean) => void;
}

/**
 * Sidebar toggle "button"
 *
 * Toggles between open/close states
 *
 * @param props
 */
const SidebarToggle: React.FunctionComponent<Props> = (props): JSX.Element => {
  const {
    isSidebarOpen,
    setIsSidebarOpen,
  } = props;

  return (
    <div
      role={'button'}
      tabIndex={0}
      onClick={(): void => setIsSidebarOpen(!isSidebarOpen)}
      onKeyPress={(): void => setIsSidebarOpen(!isSidebarOpen)}
      css={css`
        .close-sidebar {
          position: absolute;
          padding: 10px;
          right: 10px;
          top: 10px;
        }

        .open-sidebar {
          padding: 10px;
          background-color: white;
        }
      `}
    >
      {
        isSidebarOpen ? (
          <div className={'close-sidebar'}>
            <FontAwesomeIcon icon={['far', 'times-circle']} />
          </div>
        ) : (
          <div className={'open-sidebar'}>
            <FontAwesomeIcon icon={['fas', 'arrow-circle-right']} />
          </div>
        )
      }
    </div>
  );
};

export default SidebarToggle;
