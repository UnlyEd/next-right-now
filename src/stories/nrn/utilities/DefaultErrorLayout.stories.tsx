import { Meta } from '@storybook/react/types-6-0';
import React from 'react';
import DefaultErrorLayout, { Props } from '../../../components/errors/DefaultErrorLayout';

export default {
  title: 'Utilities/DefaultErrorLayout',
  component: DefaultErrorLayout,
  argTypes: {},
} as Meta;

export const ErrorInDefaultLayout: React.VFC<Props> = () => {
  return (
    <DefaultErrorLayout
      error={new Error('Error example for Storybook')}
    />
  );
};

export const ErrorInDefaultLayoutWithContext: React.VFC<Props> = () => {
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
