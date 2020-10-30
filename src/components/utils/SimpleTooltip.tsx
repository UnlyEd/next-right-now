import React from 'react';
import Tooltip from './Tooltip';

type Props = {
  children: React.ReactElement;
  placement?: string;
  text: string;
}

/**
 * Tooltip with simplified props meant to be used from Markdown
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
