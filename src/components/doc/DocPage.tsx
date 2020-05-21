/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
}

/**
 * Documentation page
 *
 * Basically wraps the children in a white container
 *
 * @param props
 */
const DocPage: React.FunctionComponent<Props> = (props): JSX.Element => {
  const { children } = props;

  return (
    <div
      css={css`
        background-color: white;
        border-radius: 5px;
        margin: 50px;
        padding: 50px;
      `}
    >
      {children}
    </div>
  );
};

export default DocPage;
