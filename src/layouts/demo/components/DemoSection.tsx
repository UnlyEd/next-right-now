import { css } from '@emotion/react';
import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
}

/**
 * Section of documentation, meant to be used within a page to visually separate documentation sections
 *
 * XXX Demo component, not meant to be modified. It's a copy of the core implementation, so the demo keeps working even the core implementation changes.
 */
const DemoSection: React.FunctionComponent<Props> = (props): JSX.Element => {
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

export default DemoSection;
