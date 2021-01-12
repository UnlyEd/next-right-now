import { Meta } from '@storybook/react/types-6-0';
import React from 'react';
import I18nBtnChangeLocale, { Props } from '../../../components/i18n/I18nBtnChangeLocale';

export default {
  title: 'Utilities/I18nBtnChangeLocale',
  component: I18nBtnChangeLocale,
  argTypes: {},
} as Meta;

export const DefaultExample: React.VFC<Props> = () => {
  return (
    <I18nBtnChangeLocale
      id={'default-example'}
    />
  );
};
