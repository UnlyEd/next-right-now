import ToggleButton from '@/common/components/dataDisplay/ToggleButton';
import { GetFCProps } from '@/modules/core/ts/types/GetFCProps';
import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React, { useState } from 'react';

type Props = GetFCProps<typeof ToggleButton>;

export default {
  title: 'Next Right Now/Data display/ToggleButton',
  component: ToggleButton,
  argTypes: {},
} as Meta;

const Template: Story<Props> = (props) => {
  const {
    contentOn,
    contentOff,
  } = props;
  const [
    isChecked,
    setIsChecked,
  ] = useState<boolean>(false);
  // eslint-disable-next-line no-console
  console.log('isChecked', isChecked);

  return (
    // @ts-ignore
    <ToggleButton
      contentOn={contentOn || 'On'}
      contentOff={contentOff || 'Off'}
      isChecked
      onClick={(): void => setIsChecked(!isChecked)}
      {...props}
    />
  );
};

export const FlatExample: Story<Props> = Template.bind({});
FlatExample.args = {
  id: 'FlatExample',
  mode: 'flat',
};

export const FlipExample: Story<Props> = Template.bind({});
FlipExample.args = {
  id: 'FlipExample',
  mode: 'flip',
  flipModeOptions: {
    useBackgroundColor: true,
  },
};

export const IosExample: Story<Props> = Template.bind({});
IosExample.args = {
  id: 'IosExample',
  mode: 'ios',
};

export const LightExample: Story<Props> = Template.bind({});
LightExample.args = {
  id: 'LightExample',
  mode: 'light',
};

export const SkewedExample: Story<Props> = Template.bind({});
SkewedExample.args = {
  id: 'SkewedExample',
  mode: 'skewed',
};
