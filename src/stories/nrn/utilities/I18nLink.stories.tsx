import { Meta } from '@storybook/react/types-6-0';
import React from 'react';
import I18nLink, { Props } from '../../../components/i18n/I18nLink';
import styles from './I18nLink.module.css';

export default {
  title: 'Utilities/I18nLink',
  component: I18nLink,
  argTypes: {},
} as Meta;

export const SimpleLink: React.VFC<Props> = () => {
  return (
    <I18nLink
      href={`/`}
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

export const LinkWithClass: React.VFC<Props> = () => {
  return (
    <I18nLink
      href={`/`}
      className="customClassName"
    >
      Homepage
    </I18nLink>
  );
};

export const LinkWithCustomLocale: React.VFC<Props> = () => {
  return (
    <I18nLink
      href={`/`}
      locale="fr-FR"
    >
      Homepage (fr-FR)
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

export const LinkWithDynamicParams: React.VFC<Props> = () => {
  return (
    <I18nLink
      href={'/products/[id]'}
      params={{
        id: 5,
      }}
    >
      <a>Go to product 5</a>
    </I18nLink>
  );
};

export const LinkWithDynamicParamsAndQuery: React.VFC<Props> = () => {
  return (
    <I18nLink
      href={'/products/[id]'}
      params={{
        id: 5,
      }}
      query={{
        userId: 1,
      }}
    >
      <a>Go to product 5 with userId 1</a>
    </I18nLink>
  );
};
