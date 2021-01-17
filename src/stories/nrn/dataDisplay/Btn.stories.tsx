import { css } from '@emotion/react';
import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React from 'react';
import Btn, { Props } from '@/common/components/dataDisplay/Btn';
import withPropMock from '../../shared/hocs/withPropMock';

type PropsWithChildrenMock = Props & {
  text?: string;
};

export default {
  title: 'Next Right Now/Data display/Btn',
  component: Btn,
  argTypes: withPropMock({}),
} as Meta;

const Template: Story<PropsWithChildrenMock> = (props) => {
  const { text } = props;

  return (
    // @ts-ignore
    <Btn
      {...props}
      onClick={(): void => console.info('Click')}
    >
      {text || 'Default text'}
    </Btn>
  );
};

export const DynamicExample: Story<PropsWithChildrenMock> = Template.bind({});
DynamicExample.args = {
  text: 'Hello',
};

export const Buttons: Story = () => {
  return (
    <div>
      <div
        css={css`
          padding: 20px;
        `}
      >
        &nbsp;&nbsp;&nbsp;
        <Btn>
          Default
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn isTransparent={true}>
          Default isTransparent
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'primary-reverse'}>
          Reverse
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'primary-reverse'} isTransparent={true}>
          Reverse isTransparent
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'primary-outline'}>
          Outline
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'primary-outline'} isTransparent={true}>
          Outline isTransparent
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'primary-variant'}>
          Variant
        </Btn>
      </div>

      <div
        css={css`
          padding: 20px;
        `}
      >
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'secondary'}>
          Secondary
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'secondary'} isTransparent={true}>
          Secondary isTransparent
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'secondary-reverse'}>
          Secondary Reverse
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'secondary-reverse'} isTransparent={true}>
          Secondary Reverse isTransparent
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'secondary-outline'}>
          Secondary Outline
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'secondary-outline'} isTransparent={true}>
          Secondary Outline isTransparent
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'secondary-variant'}>
          Secondary Variant
        </Btn>
      </div>

      <br />
      <br />
      <br />

      <div
        css={css`
          background-color: blue;
          padding: 20px;
        `}
      >
        &nbsp;&nbsp;&nbsp;
        <Btn>
          Default
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn isTransparent={true}>
          Default isTransparent
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'primary-reverse'}>
          Reverse
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'primary-reverse'} isTransparent={true}>
          Reverse isTransparent
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'primary-outline'}>
          Outline
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'primary-outline'} isTransparent={true}>
          Outline isTransparent
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'primary-variant'}>
          Variant
        </Btn>
      </div>

      <div
        css={css`
          background-color: blue;
          padding: 20px;
        `}
      >
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'secondary'}>
          Secondary
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'secondary'} isTransparent={true}>
          Secondary isTransparent
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'secondary-reverse'}>
          Secondary Reverse
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'secondary-reverse'} isTransparent={true}>
          Secondary Reverse isTransparent
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'secondary-outline'}>
          Secondary Outline
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'secondary-outline'} isTransparent={true}>
          Secondary Outline isTransparent
        </Btn>
        &nbsp;&nbsp;&nbsp;
        <Btn mode={'secondary-variant'}>
          Secondary Variant
        </Btn>
      </div>
    </div>
  );
};
Buttons.parameters = {
  controls: {
    hideNoControlsWarning: true,
  },
};
