import map from 'lodash.map';
import {
  NextRouter,
  useRouter,
} from 'next/router';
import React from 'react';
import {
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import { SidebarLink } from '../../types/SidebarLink';
import I18nLink from '../i18n/I18nLink';
import { SidebarProps } from '../pageLayouts/DefaultLayout';
import SidebarFooter from './SidebarFooter';

type Props = SidebarProps;

export const BUILT_IN_FEATURES_SIDEBAR_LINKS: SidebarLink[] = [
  {
    href: '/examples/built-in-features/hosting',
    label: 'Hosting',
  },
  {
    href: '/examples/built-in-features/stages-and-secrets',
    label: 'Stages & secrets',
  },
  {
    href: '/examples/built-in-features/manual-deployments',
    label: 'CI/CD',
  },
  {
    href: '/examples/built-in-features/static-i18n',
    label: 'Static i18n',
  },
  {
    href: '/examples/built-in-features/monitoring',
    label: 'Monitoring',
  },
  {
    href: '/examples/built-in-features/api',
    label: 'API (Airtable)',
  },
  {
    href: '/examples/built-in-features/css-in-js',
    label: 'CSS-in-JS',
  },
  {
    href: '/examples/built-in-features/cookies-consent',
    label: 'Cookies consent',
  },
  {
    href: '/examples/built-in-features/analytics',
    label: 'Analytics',
  },
  {
    href: '/examples/built-in-features/icons',
    label: 'Icons',
  },
  {
    href: '/examples/built-in-features/animations',
    label: 'CSS Animations',
  },
  {
    href: '/examples/built-in-features/ui-components',
    label: 'UI components library',
  },
  {
    href: '/examples/built-in-features/docs-site',
    label: 'Docs site',
  },
  {
    href: '/examples/built-in-features/md-as-jsx',
    label: 'Markdown as JSX',
  },
];

/**
 * Sidebar meant to be used on all pages related to the "Built-in features" section
 *
 * Display all BUILT_IN_FEATURES_SIDEBAR_LINKS towards pages related to this section
 *
 * @param props
 */
const BuiltInFeaturesSidebar: React.FunctionComponent<Props> = (props): JSX.Element => {
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
          map(BUILT_IN_FEATURES_SIDEBAR_LINKS, (link: SidebarLink) => {
            const { label, href, params = null } = link;

            return (
              <NavItem key={href}>
                <I18nLink href={href} params={params} wrapChildrenAsLink={false}>
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

      <SidebarFooter
        previousSectionHref={'/examples/native-features/example-with-ssr'}
        nextSectionHref={'/examples/built-in-utilities/i18nLink-component'}
      />
    </div>
  );
};

export default BuiltInFeaturesSidebar;
