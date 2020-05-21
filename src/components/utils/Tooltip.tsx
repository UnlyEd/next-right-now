/** @jsx jsx */
import { jsx } from '@emotion/core';
import RCTooltip from 'rc-tooltip';
import React from 'react';

type Props = {
  children: React.ReactElement;
  overlay: React.ReactElement;
  trigger?: Array<string>;
  placement?: string;
  visible?: boolean;
};

/**
 * Tooltip with sane defaults that improve usability and accessibility.
 *
 * Uses React Component Tooltip (https://github.com/react-component/tooltip)
 * XXX Feel free to add more API options, I've only added what seemed necessary but they support plenty more!
 *
 * @param {Props} props
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
      // @ts-ignore
      trigger={trigger} // XXX TS type mismatch between their official API and TS type, providing an array works just fine
      overlay={overlay}
      placement={placement}
      {...rest}
    >
      {children}
    </RCTooltip>
  );
};

export default Tooltip;
