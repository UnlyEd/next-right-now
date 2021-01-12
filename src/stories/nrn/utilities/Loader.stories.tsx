import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React from 'react';
import Loader, { Props } from '../../../components/animations/Loader';

export default {
  title: 'Utilities/Loader',
  component: Loader,
  argTypes: {},
} as Meta;

export const Loading: Story<Props> = () => <Loader />;
