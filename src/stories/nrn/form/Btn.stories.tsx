import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React from 'react';
import Btn, { Props } from '../../../components/utils/Btn';

export default {
  title: 'Next Right Now/Form/Btn',
  component: Btn,
} as Meta;

export const BtnDynamicExample: Story<Props & { text?: string }> = (props) => {
  const { text = 'Default text' } = props;

  return (
    // @ts-ignore
    <Btn
      {...props}
      onClick={(): void => console.info('Click')}
    >
      {text}
    </Btn>
  );
};
