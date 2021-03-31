import ToggleLanguagesButton from '@/modules/core/i18n/components/ToggleLanguagesButton';
import { GetFCProps } from '@/modules/core/ts/types/GetFCProps';
import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React, { useState } from 'react';

type Props = GetFCProps<typeof ToggleLanguagesButton>;

export default {
  title: 'Next Right Now/Data display/ToggleLanguagesButton',
  component: ToggleLanguagesButton,
  argTypes: {},
} as Meta;

const Template: Story<Props> = (props) => {
  const [
    isChecked,
    setIsChecked,
  ] = useState<boolean>(false);
  // eslint-disable-next-line no-console
  console.log('isChecked', isChecked);

  return (
    // @ts-ignore
    <ToggleLanguagesButton
      isChecked
      onClick={(): void => setIsChecked(!isChecked)}
      {...props}
    />
  );
};

export const DynamicExample: Story<Props> = Template.bind({});
DynamicExample.args = {
  id: 'toggle-languages-button',
};
