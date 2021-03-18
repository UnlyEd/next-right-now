import BaseFooter from '@/layouts/core/components/Footer';
import { GetFCProps } from '@/modules/core/ts/types/GetFCProps';
import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React from 'react';

type Props = GetFCProps<typeof BaseFooter>;

export default {
  title: 'Next Right Now/Layout/Footer',
  component: BaseFooter,
  argTypes: {},
} as Meta;

export const DefaultExample: Story<Props> = () => {
  return (
    <BaseFooter />
  );
};
