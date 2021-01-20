import { ReactButtonProps } from '@/modules/core/react/types/ReactButtonProps';
import {
  ComponentThemeMode,
  resolveThemedComponentColors,
  ThemedComponentProps,
} from '@/modules/core/theming/themedComponentColors';
import {
  css,
  useTheme,
} from '@emotion/react';
import classnames from 'classnames';
import React, { ReactNode } from 'react';

export type Props = {
  /**
   * What's being displayed within the button.
   */
  children: ReactNode;

  /**
   * Always adds the "btn" class, more CSS classes can be added.
   */
  className?: string;
} & ReactButtonProps & ThemedComponentProps;

/**
 * Flexible HTML `button` component that can take many shapes and be used with various colors and background colors.
 *
 * Implements `ThemedComponentColors`.
 */
const Btn: React.FunctionComponent<Props> = (props): JSX.Element => {
  const {
    children,
    className,
    mode = 'primary' as ComponentThemeMode,
    isTransparent,
    ...rest
  } = props;
  const customerTheme = useTheme();
  const {
    color,
    backgroundColor,
    borderColor,
    hoverColor,
    hoverBackgroundColor,
    hoverBorderColor,
    hoverBoxShadowColor,
  } = resolveThemedComponentColors(customerTheme, mode, isTransparent);

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
