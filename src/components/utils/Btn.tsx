import { css } from '@emotion/core';
import classnames from 'classnames';
import { useTheme } from 'emotion-theming';
import React, { ReactNode } from 'react';
import { CustomerTheme } from '../../types/data/CustomerTheme';
import { ReactButtonProps } from '../../types/react/ReactButtonProps';
import {
  ComponentThemeMode,
  resolveThemedComponentColors,
  ThemedComponentProps,
} from '../../utils/theming/themedComponentColors';

type Props = {
  children: ReactNode;
  className?: string;
} & ReactButtonProps & ThemedComponentProps;

/**
 * "Call to Action" button.
 *
 * Button meant to highlight a potential user interaction.
 * Themed component.
 *
 * Used for:
 *  - Navigate to another page
 *  - Validate an action
 *
 * @param props
 */
const Btn: React.FunctionComponent<Props> = (props): JSX.Element => {
  const {
    children,
    className,
    mode = 'primary' as ComponentThemeMode,
    transparent,
    ...rest
  } = props;
  const customerTheme = useTheme<CustomerTheme>();
  const {
    color,
    backgroundColor,
    borderColor,
    hoverColor,
    hoverBackgroundColor,
    hoverBorderColor,
    hoverBoxShadowColor,
  } = resolveThemedComponentColors(customerTheme, mode, transparent);

  return (
    <button
      {...rest}
      className={classnames('btn', className)}
      css={css`
        color: ${color};
        background-color: ${backgroundColor};
        border: 1px solid ${borderColor};
        border-radius: 30px;
        padding: 12px 18px 8px 18px;
        margin: 5px 10px 5px 0px;
        font-size: 15px;
        font-style: normal;
        cursor: pointer;
        transition: box-shadow 0.5s ease-in-out;
        display: inline-flex;

        &:hover {
          color: ${hoverColor};
          background-color: ${hoverBackgroundColor};
          border-color: ${hoverBorderColor};
          box-shadow: 4px 7px 30px -12px ${hoverBoxShadowColor};
          transition: box-shadow 0.5s ease-in-out;
        }

        &:disabled {
          cursor: not-allowed;
          opacity: 0.4;
        }
      `}
    >
      {children}
    </button>
  );
};

export default Btn;
