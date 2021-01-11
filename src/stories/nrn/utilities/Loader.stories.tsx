// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta } from '@storybook/react/types-6-0';
import React from 'react';

import Loader, { Props } from '../../../components/animations/Loader';

export default {
  title: 'Utilities/Loader',
  component: Loader,
  argTypes: {},
} as Meta;

export const Loading: React.VFC<Props> = () => <Loader />;
