import EllipsisText from '@/common/components/dataDisplay/EllipsisText';
import Stamp from '@/common/components/dataDisplay/Stamp';
import { GetFCProps } from '@/modules/core/ts/types/GetFCProps';
import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React from 'react';
import withPropMock from '../../shared/hocs/withPropMock';

type Props = GetFCProps<typeof Stamp>;

type PropsWithChildrenMock = Props & {
  text?: string | React.ReactElement;
};

export default {
  title: 'Next Right Now/Data display/Stamp',
  component: Stamp,
  argTypes: withPropMock({}),
} as Meta;

const Template: Story<PropsWithChildrenMock> = (props) => {
  const {
    text,
    children,
  } = props;

  return (
    <Stamp
      {...props}
    >
      {children || text || 'Default text'}
    </Stamp>
  );
};

export const DynamicExample: Story<PropsWithChildrenMock> = Template.bind({});
DynamicExample.args = {
  text: 'Hello',
};

export const DynamicExampleWithEllipsis: Story<PropsWithChildrenMock> = Template.bind({});
DynamicExampleWithEllipsis.args = {
  children: (
    <EllipsisText>Some very long text, too long to display entirely</EllipsisText>
  ),
};
