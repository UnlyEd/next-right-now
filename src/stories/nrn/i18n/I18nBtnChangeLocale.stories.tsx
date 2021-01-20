import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React from 'react';
import I18nBtnChangeLocale, { Props } from '@/modules/core/i18n/components/I18nBtnChangeLocale';

export default {
  title: 'Next Right Now/I18n/I18nBtnChangeLocale',
  component: I18nBtnChangeLocale,
  argTypes: {},
} as Meta;

const Template: Story<Props> = (props) => {
  return (
    <I18nBtnChangeLocale
      {...props}
    />
  );
};

export const DynamicExample: Story<Props> = Template.bind({});
DynamicExample.args = {
  id: 'default-example',
};
