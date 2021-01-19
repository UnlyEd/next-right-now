import { css } from '@emotion/react';
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
 * XXX Demo component, not meant to be modified. It's a copy of the core implementation, so the demo keeps working even the core implementation changes.
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
