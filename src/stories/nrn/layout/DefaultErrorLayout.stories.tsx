import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React from 'react';
import DefaultErrorLayout, { Props } from '@/modules/core/errorHandling/DefaultErrorLayout';

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
