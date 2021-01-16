import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React from 'react';
import SpoilerButton, { Props } from '../../../components/utils/SpoilerButton';
import withChildrenMock from '../../shared/hocs/withChildrenMock';

export default {
  title: 'Next Right Now/Form/SpoilerButton',
  component: SpoilerButton,
  argTypes: {},
} as Meta;

const Template: Story<Props> = (props) => {
  return (
    <SpoilerButton
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
