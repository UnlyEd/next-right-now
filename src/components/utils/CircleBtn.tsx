import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import React from 'react';
import { CustomerTheme } from '../../types/data/CustomerTheme';
import { ReactDivProps } from '../../types/react/ReactDivProps';
import {
  ComponentThemeMode,
  resolveThemedComponentColors,
  ThemedComponentProps,
} from '../../utils/theming/themedComponentColors';

type Props = {
  children: React.ReactNode;
  margin?: string;
} & ReactDivProps & ThemedComponentProps;

/**
 * Displays a 1-3 characters, or an icon, within a perfect circle.
 *
 * Themed component.
 *
 * Used by:
 *  - Contact slider button
 *  - Report button
 *  - Size/number of label
 */
const CircleBtn: React.FunctionComponent<Props> = (props): JSX.Element => {
  const {
    children,
    margin = '0',
    mode = 'primary-reverse' as ComponentThemeMode,
    transparent,
    ...rest
  } = props;
  const customerTheme = useTheme<CustomerTheme>();
  const {
    color,
    backgroundColor,
    borderColor,
  } = resolveThemedComponentColors(customerTheme, mode, transparent);

  return (
    <div
      css={css`
        width: 100%;
        min-width: 10px;
        max-width: 35px;
        padding: 5px 0 6px 5px;
        margin-left: ${margin};
        margin-right: ${margin};
        cursor: ${props?.onClick ? 'pointer' : 'inherit'}; // Displays cursor pointer only when the element is clickable

        &:after {
          content: "";
          display: block;
          width: 100%;
          height: 0;
          padding-bottom: 100%;
          background: ${backgroundColor};
          border: 1px solid ${borderColor};
          border-radius: 50%;
        }

        &:hover {
          // Animate only when the element is clickable
          transform: ${props?.onClick ? 'scale(1.1)' : 'inherit'};
          transition: ${props?.onClick ? 'transform 0.6s ease-in-out' : 'inherit'};
        }

        svg {
          margin: 0 !important;
          width: 1em !important;
        }

        .circle-container {
          float: left;
          width: 100%;
          padding-top: 50%;
          line-height: 1.2em;
          margin-top: -0.5em;
          text-align: center;
          color: ${color};
        }

        // Necessary empty block to avoid text on the left of the CircleBtn to be hidden overflow
        .space-container {
          position: relative;
          width: 30px; // XXX Related to the width of the root component, must be higher than "max-width - min-width"
        }
    `}
      {...rest}
    >
      <div className={'space-container'} />
      <span className={'circle-container'}>
        {children}
      </span>
    </div>
  );
};

export default CircleBtn;
