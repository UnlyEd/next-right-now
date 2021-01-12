import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React from 'react';
import I18nLink, { Props } from '../../../components/i18n/I18nLink';
import styles from './I18nLink.module.css';

export default {
  title: 'Next Right Now/I18n/I18nLink',
  component: I18nLink,
  argTypes: {
    wrapChildrenAsLink: {
      table: {
        disable: true, // Disable field because it crashes the UI when being used (expected behavior but bad UX)
      },
    },
  },
} as Meta;

export const DynamicLink: Story<Props & { text?: string }> = (props) => {
  const {
    text,
    ...rest
  } = props;

  return (
    <I18nLink
      {...rest}
    >
      {text}
    </I18nLink>
  );
};
DynamicLink.args = {
  text: 'Link',
  href: '/some/nested/page',
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
