import {
  object,
  text,
  withKnobs,
} from '@storybook/addon-knobs';
import { Meta } from '@storybook/react/types-6-0';
import React from 'react';
import I18nLink, { Props } from '../../../components/i18n/I18nLink';
import styles from './I18nLink.module.css';

export default {
  title: 'Utilities/I18nLink',
  component: I18nLink,
  argTypes: {},
  decorators: [
    withKnobs,
  ],
} as Meta;

export const DynamicLink: React.VFC<Props> = () => {
  return (
    <I18nLink
      href={text('Url', '/some/nested/page')}
      locale={text('Locale', 'en')}
      className={text('Class name', 'my-class')}
      // Bug query overrides params
      params={object('Params', {
        id: 5,
      })}
      query={object('Query', {
        userId: 1,
      })}
    >
      Link
    </I18nLink>
  );
};

export const LinkWithCSSModule: React.VFC<Props> = () => {
  return (
    <I18nLink
      href={`/`}
      className={styles.red}
    >
      Homepage (red)
    </I18nLink>
  );
};

export const LinkWithoutWrapper: React.VFC<Props> = () => {
  return (
    <I18nLink
      href={`/`}
      wrapChildrenAsLink={false}
    >
      <a>Homepage</a>
    </I18nLink>
  );
};
