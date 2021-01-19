import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React from 'react';
import I18nLink, { Props } from '@/modules/core/i18n/components/I18nLink';
import withPropMock from '../../shared/hocs/withPropMock';
import styles from './I18nLink.module.css';

type PropsWithChildrenMock = {
  text?: string;
} & Props;

// @ts-ignore
export default {
  title: 'Next Right Now/I18n/I18nLink',
  component: I18nLink,
  argTypes: withPropMock({
    wrapChildrenAsLink: {
      control: {
        disable: true, // Disable field because it crashes the UI when being used (expected behavior but bad UX)
      },
    },
  }),
} as Meta;

export const DynamicLink: Story<PropsWithChildrenMock> = (props) => {
  const {
    text,
    ...rest
  } = props;

  return (
    <I18nLink
      {...rest}
    >
      {text || 'Default text'}
    </I18nLink>
  );
};
DynamicLink.args = {
  text: 'Link',
  href: '/some/nested/page/[id]',
  locale: 'en',
  className: 'my-class',
  params: {
    id: 5,
  },
  query: {
    userId: 1,
  },
};

export const LinkWithCSSModule: Story<Props> = () => {
  return (
    <I18nLink
      href={`/`}
      className={styles.red}
    >
      Homepage (red)
    </I18nLink>
  );
};

export const LinkWithoutWrapper: Story<Props> = () => {
  return (
    <I18nLink
      href={`/`}
      wrapChildrenAsLink={false}
    >
      <a>Homepage</a>
    </I18nLink>
  );
};
