import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React from 'react';
import Tooltip, { Props } from '@/common/components/dataDisplay/Tooltip';
import withPropMock from '../../shared/hocs/withPropMock';

type PropsWithChildrenMock = Props & {
  text?: string;
  tooltipText?: string;
};

export default {
  title: 'Next Right Now/Overlay/Tooltip',
  component: Tooltip,
  argTypes: withPropMock(withPropMock({}, {
    propName: 'overlay',
    propMockName: 'tooltipText',
  })),
} as Meta;

const Template: Story<PropsWithChildrenMock> = (props) => {
  const {
    text,
    tooltipText,
    ...rest
  } = props;

  return (
    <Tooltip
      overlay={(
        <span>{tooltipText}</span>
      )}
      {...rest}
    >
      <span>{text || 'Default text'}</span>
    </Tooltip>
  );
};

export const DynamicExample: Story<PropsWithChildrenMock> = Template.bind({});
DynamicExample.args = {
  text: 'Hello',
  tooltipText: 'Hello',
  trigger: ['hover', 'click', 'focus'],
  placement: 'top',
};
