import {
  Meta,
  Story,
} from '@storybook/react/types-6-0';
import React from 'react';
import I18nLink, { Props } from '../../../components/i18n/I18nLink';
import styles from './I18nLink.module.css';

type PropsWithChildrenMock = {
  _sbChildrenMock?: string;
} & Props;

export default {
  title: 'Next Right Now/I18n/I18nLink',
  component: I18nLink,
  argTypes: {
    children: {
      table: {
        disable: false,
      },
    },
    _sbChildrenMock: {
      description: `Children mock.<br /><br /><i>This property doesn't really exist in the component.<br />It is made available to help manipulate the <code>children</code> from Storybook</i>.<br /><br />You must use <code>children</code> instead during actual code implementation.`,
    },
    wrapChildrenAsLink: {
      control: {
        disable: true, // Disable field because it crashes the UI when being used (expected behavior but bad UX)
      },
    },
  },
} as Meta;

export const DynamicLink: Story<PropsWithChildrenMock> = (props) => {
  const {
    _sbChildrenMock,
    ...rest
  } = props;

  return (
    <I18nLink
      {...rest}
    >
      {_sbChildrenMock || 'Default text'}
    </I18nLink>
  );
};
DynamicLink.args = {
  _sbChildrenMock: 'Link',
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
