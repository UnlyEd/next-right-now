/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import Text from '../utils/Text';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (boolean) => void;
}

/**
 * This component is a template meant to be duplicated to quickly get started with new React components.
 *
 * @param props
 */
const SidebarToggle: React.FunctionComponent<Props> = (props): JSX.Element => {
  const {
    isSidebarOpen,
    setIsSidebarOpen
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
