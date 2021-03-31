import CircleBtn from '@/common/components/dataDisplay/CircleBtn';
import { GetFCProps } from '@/modules/core/ts/types/GetFCProps';
import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React from 'react';
import withPropMock from '../../shared/hocs/withPropMock';

type Props = GetFCProps<typeof CircleBtn>;

type PropsWithChildrenMock = Props & {
  text?: string;
};

export default {
  title: 'Next Right Now/Data display/CircleBtn',
  component: CircleBtn,
  argTypes: withPropMock({}),
} as Meta;

const Template: Story<PropsWithChildrenMock> = (props) => {
  const { text } = props;

  return (
    // @ts-ignore
    <CircleBtn
      {...props}
      // eslint-disable-next-line no-console
      onClick={(): void => console.info('Click')}
    >
      {text || 'Default text'}
    </CircleBtn>
  );
};

export const DynamicExample: Story<PropsWithChildrenMock> = Template.bind({});
DynamicExample.args = {
  text: '42',
};
