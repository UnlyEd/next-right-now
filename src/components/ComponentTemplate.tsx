import { css } from '@emotion/react';
import React from 'react';

type Props = {}

/**
 * This component is a template meant to be duplicated to quickly get started with new React components.
 */
const ComponentTemplate: React.FunctionComponent<Props> = (props): JSX.Element => {
  return (
    <div
      css={css`
        margin: 30px;
      `}
    >
      This component is a template meant to be duplicated to quickly get started with new React components.<br />
      <br />
      Feel free to adapt it at your convenience
    </div>
  );
};

export default ComponentTemplate;
