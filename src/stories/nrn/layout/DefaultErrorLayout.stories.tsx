import DefaultErrorLayout from '@/modules/core/errorHandling/DefaultErrorLayout';
import { GetFCProps } from '@/modules/core/ts/types/GetFCProps';
import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React from 'react';

type Props = GetFCProps<typeof DefaultErrorLayout>;

export default {
  title: 'Next Right Now/Layout/DefaultErrorLayout',
  component: DefaultErrorLayout,
  argTypes: {},
} as Meta;

export const ErrorInDefaultLayout: Story<Props> = () => {
  return (
    <DefaultErrorLayout
      error={new Error('Error example for Storybook')}
    />
  );
};

export const ErrorInDefaultLayoutWithContext: Story<Props> = () => {
  return (
    <DefaultErrorLayout
      error={new Error('Error example for Storybook')}
      context={{
        varA: 'A',
        some: {
          nested: {
            var: 'B',
          },
        },
      }}
    />
  );
};
