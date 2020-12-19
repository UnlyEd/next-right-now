import { css } from '@emotion/core';
import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  widthLarge?: string;
  widthMedium?: string;
  widthSmall?: string;
  forceSingleLine?: boolean; // XXX Not handled yet, see below TODO
}

/**
 * Ellipsis component meant to display text as an ellipsis ("...") when the text is too long.
 *
 * Helps avoiding long text taking too much space and basically crop it instead.
 * Forces text to display in a single line by default.
 *
 * TODO Case when forceSingleLine: false isn't handled yet (Léo)
 *
 * @param props
 */
const EllipsisText: React.FunctionComponent<Props> = (props): JSX.Element => {
  const {
    widthLarge = '140px',
    widthMedium = '140px',
    widthSmall = '140px',
    forceSingleLine = true,
    children
  } = props;

  return (
    <div
      css={css`
        max-width: ${widthLarge};
        white-space: ${forceSingleLine ? 'nowrap' : 'normal'};
        overflow: hidden;
        text-overflow: ellipsis;

        @media (max-width: 991.98px) {
          max-width: ${widthMedium};
        }

        @media (max-width: 480px) {
          max-width: ${widthSmall};
        }
      `}
    >
      {children}
    </div>
  );
};

export default EllipsisText;
