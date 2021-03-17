import SimpleTooltip from '@/common/components/dataDisplay/SimpleTooltip';
import { GetFCProps } from '@/modules/core/ts/types/GetFCProps';
import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React from 'react';
import withPropMock from '../../shared/hocs/withPropMock';

type Props = GetFCProps<typeof SimpleTooltip>;

type PropsWithChildrenMock = Props & {
  text?: string;
  tooltipText?: string;
};

export default {
  title: 'Next Right Now/Overlay/SimpleTooltip',
  component: SimpleTooltip,
  argTypes: withPropMock({}),
} as Meta;

const Template: Story<PropsWithChildrenMock> = (props) => {
  const {
    text,
    tooltipText,
    ...rest
  } = props;

  return (
    <SimpleTooltip
      text={tooltipText}
      {...rest}
    >
      <span>{text || 'Default text'}</span>
    </SimpleTooltip>
  );
};

export const DynamicExample: Story<PropsWithChildrenMock> = Template.bind({});
DynamicExample.args = {
  text: 'Hello',
  tooltipText: 'Hello',
  trigger: ['hover', 'click', 'focus'],
  placement: 'top',
};
