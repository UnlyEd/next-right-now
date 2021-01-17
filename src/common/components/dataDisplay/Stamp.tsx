import {
  css,
  useTheme,
} from '@emotion/react';
import React, { ReactNode } from 'react';

export type Props = {
  /**
   * React children, usually text.
   */
  children: ReactNode;
}

/**
 * Displays a stamp, which is similar to a tag, an etiquette.
 *
 * @param props
 */
export const Stamp: React.FunctionComponent<Props> = (props): JSX.Element => {
  const {
    children,
    ...rest
  } = props;
  const {
    secondaryColorVariant1,
    secondaryColor,
  } = useTheme();

  return (
    <div
      className={'stamp'}
      css={css`
        margin-bottom: 5px;
        cursor: help;

        .stamp-box {
          position: relative;
          display: inline-flex;
          flex-direction: row;
          align-items: center;
          justify-content: right;
          margin: 0 5px 0 10px;
          height: 40px;
          border-radius: 0 5px 5px 0;
          padding: 0 15px 0 15px;
          background: ${secondaryColorVariant1};
          color: ${secondaryColor};
          line-height: 23px;

          &:after {
            position: absolute;
            right: 0;
            margin: 5px 7px;
            font-weight: bold;
            font-size: 19px;
          }

          &:before {
            position: absolute;
            content: "\\25CF";
            color: white;
            font-size: 14px;
            line-height: 3px;
            text-indent: 13px;
            left: -15px;
            width: 15px;
            height: 0px;
            border-right: 14px solid ${secondaryColorVariant1};
            border-top: 20px solid transparent;
            border-bottom: 20px solid transparent;
          }
        }

        .stamp-text {
          margin-top: 4px;
          display: contents;
        }
      `}
      {...rest}
    >
      <div className={'stamp-box'}>
        <span className={'stamp-text'}>
          {children}
        </span>
      </div>
    </div>
  );
};

export default Stamp;
