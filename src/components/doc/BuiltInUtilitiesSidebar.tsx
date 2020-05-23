/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { Nav, NavItem } from 'reactstrap';
import I18nLink from '../i18n/I18nLink';
import { SidebarProps } from '../pageLayouts/DefaultLayout';
import SidebarFooter from './SidebarFooter';

type Props = SidebarProps;

/**
 * Sidebar meant to be used on all pages related to the "Built-in utilities" section
 *
 * Display all links towards pages related to this section
 *
 * @param props
 */
const BuiltInUtilitiesSidebar: React.FunctionComponent<Props> = (props): JSX.Element => {
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
          <I18nLink href={'/examples/built-in-utilities/i18nLink-component'}><code>I18nLink</code> component</I18nLink>
        </NavItem>
        <NavItem>
          <I18nLink href={'/examples/built-in-utilities/hooks'}>Hooks</I18nLink>
        </NavItem>
        <NavItem>
          <I18nLink href={'/examples/built-in-utilities/hocs'}>HOCs</I18nLink>
        </NavItem>
        <NavItem>
          <I18nLink href={'/examples/built-in-utilities/api'}>API</I18nLink>
        </NavItem>
        <NavItem>
          <I18nLink href={'/examples/built-in-utilities/errors-handling'}>Errors handling</I18nLink>
        </NavItem>
        <NavItem>
          <I18nLink href={'/examples/built-in-utilities/analyse-bundle'}>Bundle analysis</I18nLink>
        </NavItem>
        <NavItem>
          <I18nLink href={'/examples/built-in-utilities/svg-to-react'}>SVG to React</I18nLink>
        </NavItem>
        <NavItem>
          <I18nLink href={'/examples/built-in-utilities/security-audit'}>Security audit</I18nLink>
        </NavItem>
        <NavItem>
          <I18nLink href={'/examples/built-in-utilities/packages-upgrade'}>Packages upgrade</I18nLink>
        </NavItem>
      </Nav>

      <hr />

      <SidebarFooter />
    </div>
  );
};

export default BuiltInUtilitiesSidebar;
