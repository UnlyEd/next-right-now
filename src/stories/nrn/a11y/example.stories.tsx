import { Meta } from '@storybook/react/types-6-0';
import React from 'react';

export default {
  title: 'Next Right Now/A11y/Button (default example)',
  parameters: {
    controls: {
      hideNoControlsWarning: true,
    },
  },
} as Meta;

export const accessible = () => <button>Accessible button</button>;

export const inaccessible = () => (
  <button
    style={{
      backgroundColor: 'red',
      color: 'darkRed',
    }}
  >Inaccessible button</button>
);
