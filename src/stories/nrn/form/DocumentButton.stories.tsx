import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React from 'react';
import DocumentButton, { Props } from '../../../components/utils/DocumentButton';
import withChildrenMock from '../../shared/hocs/withChildrenMock';

type PropsWithChildrenMock = Props & {
  text?: string;
};

export default {
  title: 'Next Right Now/Form/DocumentButton',
  component: DocumentButton,
  argTypes: withChildrenMock({}),
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
  text: 'PDF file',
};
