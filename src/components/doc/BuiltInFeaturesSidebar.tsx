/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import { Nav, NavItem } from 'reactstrap';
import I18nLink from '../i18n/I18nLink';

type Props = {}

/**
 *
 *
 * @param props
 */
const BuiltInFeaturesSidebar: React.FunctionComponent<Props> = (props): JSX.Element => {
  return (
    <>
      <h2>Built-in features</h2>

      <Nav
        vertical
        css={css`
        float: left;
      `}
      >
        <NavItem>
          <I18nLink href={'/examples/static-i18n'}>Static i18n</I18nLink>
        </NavItem>
        <NavItem>
          <I18nLink href={'/examples/monitoring'}>Monitoring</I18nLink>
        </NavItem>
        <NavItem>
          <I18nLink href={'/examples/graphql'}>GraphQL</I18nLink>
        </NavItem>
        <NavItem>
          <I18nLink href={'/examples/css-in-js'}>CSS-in-JS</I18nLink>
        </NavItem>
        <NavItem>
          <I18nLink href={'/examples/analytics'}>Analytics</I18nLink>
        </NavItem>
        <NavItem>
          <I18nLink href={'/examples/icons'}>Icons</I18nLink>
        </NavItem>
        <NavItem>
          <I18nLink href={'/examples/animations'}>CSS Animations</I18nLink>
        </NavItem>
        <NavItem>
          <I18nLink href={'/examples/ui-components'}>UI components library</I18nLink>
        </NavItem>
      </Nav>
    </>
  );
};

export default BuiltInFeaturesSidebar;
