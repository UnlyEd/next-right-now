import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React from 'react';
import DocumentButton, { Props } from '@/common/components/dataDisplay/DocumentButton';
import withPropMock from '../../shared/hocs/withPropMock';

type PropsWithChildrenMock = Props & {
  text?: string;
};

export default {
  title: 'Next Right Now/Data display/DocumentButton',
  component: DocumentButton,
  argTypes: withPropMock({}),
} as Meta;

const Template: Story<PropsWithChildrenMock> = (props) => {
  const { text } = props;

  return (
    // @ts-ignore
    <DocumentButton
      {...props}
    >
      {text || 'Default text'}
    </DocumentButton>
  );
};

export const DynamicExample: Story<PropsWithChildrenMock> = Template.bind({});
DynamicExample.args = {
  text: 'My awesome PDF file',
};
