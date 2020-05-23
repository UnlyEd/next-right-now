/** @jsx jsx */
import { jsx } from '@emotion/core';
import map from 'lodash.map';
import { NextRouter, useRouter } from 'next/router';
import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { SidebarLink } from '../../types/SidebarLink';
import I18nLink from '../i18n/I18nLink';
import { SidebarProps } from '../pageLayouts/DefaultLayout';
import SidebarFooter from './SidebarFooter';

type Props = SidebarProps;

export const BUILT_IN_UTILITIES_SIDEBAR_LINKS: SidebarLink[] = [
  {
    href: '/examples/built-in-utilities/i18nLink-component',
    label: 'I18nLink component',
  },
  {
    href: '/examples/built-in-utilities/hooks',
    label: 'Hooks',
  },
  {
    href: '/examples/built-in-utilities/hocs',
    label: 'HOCs',
  },
  {
    href: '/examples/built-in-utilities/api',
    label: 'API',
  },
  {
    href: '/examples/built-in-utilities/errors-handling',
    label: 'Errors handling',
  },
  {
    href: '/examples/built-in-utilities/bundle-analysis',
    label: 'Bundle analysis',
  },
  {
    href: '/examples/built-in-utilities/svg-to-react',
    label: 'SVG to React',
  },
  {
    href: '/examples/built-in-utilities/security-audit',
    label: 'Security audit',
  },
];

/**
 * Sidebar meant to be used on all pages related to the "Built-in utilities" section
 *
 * Display all BUILT_IN_FEATURES_SIDEBAR_LINKS towards pages related to this section
 *
 * @param props
 */
const BuiltInUtilitiesSidebar: React.FunctionComponent<Props> = (props): JSX.Element => {
  const { className } = props;
  const router: NextRouter = useRouter();

  return (
    <div
      className={className}
    >
      <h2>Built-in features</h2>

      <Nav
        vertical
      >
        {
          map(BUILT_IN_UTILITIES_SIDEBAR_LINKS, (link: SidebarLink) => {
            const { label, href } = link;

            return (
              <NavItem key={href}>
                <I18nLink href={href} wrapChildrenAsLink={false}>
                  <NavLink active={router.pathname.replace('/[locale]', '') === href}>
                    {label}
                  </NavLink>
                </I18nLink>
              </NavItem>
            );
          })
        }
      </Nav>

      <hr />

      <SidebarFooter />
    </div>
  );
};

export default BuiltInUtilitiesSidebar;
