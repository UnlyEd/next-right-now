/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { Nav, NavItem } from 'reactstrap';
import I18nLink from '../i18n/I18nLink';
import { SidebarProps } from '../pageLayouts/DefaultLayout';
import SidebarFooter from './SidebarFooter';

type Props = SidebarProps;

/**
 * Sidebar meant to be used on all pages related to the "Built-in features" section
 *
 * Display all links towards pages related to this section
 *
 * @param props
 */
const BuiltInFeaturesSidebar: React.FunctionComponent<Props> = (props): JSX.Element => {
  const { className } = props;

  return (
    <div
      className={className}
    >
      <h2>Built-in features</h2>

      <Nav
        vertical
      >
        <NavItem>
          <I18nLink href={'/examples/built-in-features/static-i18n'}>Static i18n</I18nLink>
        </NavItem>
        <NavItem>
          <I18nLink href={'/examples/built-in-features/monitoring'}>Monitoring</I18nLink>
        </NavItem>
        <NavItem>
          <I18nLink href={'/examples/built-in-features/graphql'}>GraphQL</I18nLink>
        </NavItem>
        <NavItem>
          <I18nLink href={'/examples/built-in-features/css-in-js'}>CSS-in-JS</I18nLink>
        </NavItem>
        <NavItem>
          <I18nLink href={'/examples/built-in-features/analytics'}>Analytics</I18nLink>
        </NavItem>
        <NavItem>
          <I18nLink href={'/examples/built-in-features/icons'}>Icons</I18nLink>
        </NavItem>
        <NavItem>
          <I18nLink href={'/examples/built-in-features/animations'}>CSS Animations</I18nLink>
        </NavItem>
        <NavItem>
          <I18nLink href={'/examples/built-in-features/ui-components'}>UI components library</I18nLink>
        </NavItem>
      </Nav>

      <hr />

      <SidebarFooter
        nextSectionHref={'/examples/built-in-utilities/i18nLink-component'}
      />
    </div>
  );
};

export default BuiltInFeaturesSidebar;
