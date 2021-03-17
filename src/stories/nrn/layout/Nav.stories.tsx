import Nav from '@/layouts/core/components/Nav';
import { GetFCProps } from '@/modules/core/ts/types/GetFCProps';
import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React from 'react';

type Props = GetFCProps<typeof Nav>;

export default {
  title: 'Next Right Now/Layout/Nav',
  component: Nav,
  argTypes: {},
} as Meta;

export const DefaultExample: Story<Props> = () => {
  return (
    <Nav />
  );
};
