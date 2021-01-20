import { css } from '@emotion/react';
import React, { ReactNode } from 'react';

export type Props = {
  /**
   * React children, usually text.
   */
  children: ReactNode;

  /**
   * Text to display as HTML title attribute.
   */
  title?: string;

  // XXX Implementation idea: Allow to configure the title to display as tooltip instead of HTML title (prettier)
  // titleAsTooltip?: boolean;

  /**
   * Width on large devices.
   *
   * @default 140px
   */
  widthLarge?: string;

  /**
   * Width on medium devices.
   *
   * @default 140px
   */
  widthMedium?: string;

  /**
   * Width on small devices.
   *
   * @default 140px
   */
  widthSmall?: string;

  /**
   * Option to force children (expect text) in a single line.
   *
   * <span className="tip">Deprecated</span> Not properly implemented. Unstable.
   *
   * @deprecated
   */
  forceSingleLine?: boolean;
}

/**
 * Ellipsis component meant to display text as an ellipsis ("...") when the text is too long.
 *
 * Helps avoiding long text taking too much space and basically crop it instead.
 * Forces text to display in a single line by default.
 *
 * @param props
 */
const EllipsisText: React.FunctionComponent<Props> = (props): JSX.Element => {
  const {
    widthLarge = '140px',
    widthMedium = '140px',
    widthSmall = '140px',
    forceSingleLine = true,
    title,
    children,
  } = props;

  const dynamicProps = {};

  return (
    <div
      title={title}
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
