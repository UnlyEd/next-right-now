import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React from 'react';
import ExternalLink from '@/common/components/dataDisplay/ExternalLink';
import LinkButton, { Props } from '@/common/components/dataDisplay/LinkButton';
import withPropMock from '../../shared/hocs/withPropMock';

type PropsWithChildrenMock = Props & {
  text?: string;
  useLink?: boolean;
};

export default {
  title: 'Next Right Now/Data display/LinkButton',
  component: LinkButton,
  subcomponents: { ExternalLink },
  argTypes: withPropMock({}),
} as Meta;

const Template: Story<PropsWithChildrenMock> = (props) => {
  const {
    text,
    useLink,
  } = props;

  if (useLink) {
    return (
      <ExternalLink href={'/'}>
        <LinkButton
          {...props}
        >
          {text || 'Default text'}
        </LinkButton>
      </ExternalLink>
    );
  }

  return (
    <LinkButton
      {...props}
    >
      {text || 'Default text'}
    </LinkButton>
  );
};

export const DynamicExample: Story<PropsWithChildrenMock> = Template.bind({});
DynamicExample.args = {
  text: `Do nothing`,
};

export const DynamicExampleWithLink: Story<PropsWithChildrenMock> = Template.bind({});
DynamicExampleWithLink.args = {
  text: 'Open external link',
  useLink: true,
};
