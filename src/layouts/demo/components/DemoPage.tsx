import { css } from '@emotion/react';
import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
}

/**
 * Documentation page
 *
 * Basically wraps the children in a white container
 *
 * XXX Demo component, not meant to be modified. It's a copy of the core implementation, so the demo keeps working even the core implementation changes.
 */
const DemoPage: React.FunctionComponent<Props> = (props): JSX.Element => {
  const { children } = props;

  return (
    <div
      css={css`
        background-color: white;
        border-radius: 5px;
        margin: 50px;
        padding: 50px;

        @media (max-width: 991.98px) {
          margin-left: 0;
          margin-right: 0;
          padding-left: 20px;
          padding-right: 20px;
        }
      `}
    >
      {children}
    </div>
  );
};

export default DemoPage;
