import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React from 'react';
import SpoilerLink, { Props } from '../../../components/utils/SpoilerLink';

export default {
  title: 'Next Right Now/Form/SpoilerLink',
  component: SpoilerLink,
  argTypes: {},
} as Meta;

const Template: Story<Props> = (props) => {
  return (
    <SpoilerLink
      {...props}
    />
  );
};

export const DynamicExample: Story<Props> = Template.bind({});
DynamicExample.args = {
  previewElement: (
    <span>Spoil me!</span>
  ),
  spoilerElement: (
    <span>Arya Stark's phone number is 000000000</span>
  ),
  className: '',
  href: 'tel:000000000',
};
