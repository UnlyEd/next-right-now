import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React from 'react';
import ExternalLink, { Props } from '@/common/components/dataDisplay/ExternalLink';
import withPropMock from '../../shared/hocs/withPropMock';

type PropsWithChildrenMock = Props & {
  text?: string;
};

export default {
  title: 'Next Right Now/Data display/ExternalLink',
  component: ExternalLink,
  argTypes: withPropMock({}),
} as Meta;

const Template: Story<PropsWithChildrenMock> = (props) => {
  const { text } = props;

  return (
    // @ts-ignore
    <ExternalLink
      {...props}
      onClick={(): void => console.info('Click')}
    >
      {text || 'Default text'}
    </ExternalLink>
  );
};

export const DynamicExample: Story<PropsWithChildrenMock> = Template.bind({});
DynamicExample.args = {
  text: 'Open (another tab)',
  href: '/',
  nofollow: true,
  noopener: true,
  noreferrer: false,
  prefix: ' ',
  suffix: ' ',
};
