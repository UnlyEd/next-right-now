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

      <hr />

      <SidebarFooter
        nextSectionHref={'/examples/i18nLink-component'}
      />
    </div>
  );
};

export default BuiltInFeaturesSidebar;
