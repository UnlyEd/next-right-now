import { TooltipProps } from 'rc-tooltip/lib/Tooltip';
import React from 'react';
import Tooltip, { TooltipPlacement } from './Tooltip';

export type Props = {
  /**
   * React children, usually text.
   */
  children: React.ReactElement;

  /**
   * Tooltip's placement.
   *
   * @default top
   */
  placement?: TooltipPlacement;

  /**
   * Tooltip's text.
   *
   * Displayed as an overlay within a `<div>` element.
   */
  text: string;
} & Partial<TooltipProps>;

/**
 * Tooltip with simplified props meant to be used from Markdown.
 *
 * @example <Tooltip text="Help text">Click me</Tooltip>
 */
const SimpleTooltip: React.FunctionComponent<Props> = (props): JSX.Element => {
  const {
    children,
    placement = 'top',
    text,
    ...rest
  } = props;

  return (
    <Tooltip
      overlay={<div>{text}</div>}
      placement={placement}
      {...rest}
    >
      <span>{children}</span>
    </Tooltip>
  );
};

export default SimpleTooltip;
