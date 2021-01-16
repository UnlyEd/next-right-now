import RCTooltip from 'rc-tooltip';
import { TooltipProps } from 'rc-tooltip/lib/Tooltip';
import { ActionType } from 'rc-trigger/lib/interface';
import React from 'react';

export type Props = {
  /**
   * React children, usually text.
   */
  children: React.ReactElement;

  /**
   * Text that will be displayed as the tooltip.
   *
   * Usually, something like `<span>Tooltip content</span>`
   */
  overlay: (() => React.ReactNode) | React.ReactNode;

  /**
   * Triggers defining when the tooltip displays.
   *
   * @default ['hover', 'click', 'focus']
   */
  trigger?: ActionType | ActionType[];

  /**
   * Tooltip's placement.
   *
   * @default top
   */
  placement?: string;
} & TooltipProps;

/**
 * Tooltip override, improving developer experience and end-user accessibility by default.
 *
 * Uses [React Component Tooltip](https://github.com/react-component/tooltip)
 *
 * > Only the most useful properties are being described, [more are available](https://github.com/react-component/tooltip#api).
 */
const Tooltip: React.FunctionComponent<Props> = (props): JSX.Element => {
  const {
    children,
    overlay,
    trigger = ['hover', 'click', 'focus'],
    placement = 'top',
    ...rest
  } = props;

  return (
    <RCTooltip
      trigger={trigger}
      overlay={overlay}
      placement={placement}
      {...rest}
    >
      {children}
    </RCTooltip>
  );
};

export default Tooltip;
