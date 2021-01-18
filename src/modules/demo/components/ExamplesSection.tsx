import { css } from '@emotion/react';
import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
}

/**
 * Section of documentation, meant to be used within a page to visually separate documentation sections
 *
 * @param props
 */
const ExamplesSection: React.FunctionComponent<Props> = (props): JSX.Element => {
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

export default ExamplesSection;
