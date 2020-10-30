import { css } from '@emotion/core';
import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
}

/**
 * Section of documentation, meant to be used within a page to visually separate documentation sections
 *
 * @param props
 */
const DocSection: React.FunctionComponent<Props> = (props): JSX.Element => {
  const { children } = props;

  return (
    <div
      css={css`
        margin-top: 50px;
      `}
    >
      {children}
    </div>
  );
};

export default DocSection;
