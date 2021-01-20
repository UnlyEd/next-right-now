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
import { SidebarLink } from '@/modules/core/data/types/SidebarLink';
import I18nLink from '@/modules/core/i18n/components/I18nLink';
import { SidebarProps } from './DemoLayout';
import SidebarFooter from './SidebarFooter';

type Props = SidebarProps;

export const BUILT_IN_FEATURES_SIDEBAR_LINKS: SidebarLink[] = [
  {
    href: '/demo/built-in-features/hosting',
    label: 'Hosting',
  },
  {
    href: '/demo/built-in-features/stages-and-secrets',
    label: 'Stages & secrets',
  },
  {
    href: '/demo/built-in-features/manual-deployments',
    label: 'CI/CD',
  },
  {
    href: '/demo/built-in-features/static-i18n',
    label: 'Static i18n',
  },
  {
    href: '/demo/built-in-features/monitoring',
    label: 'Monitoring',
  },
  {
    href: '/demo/built-in-features/api',
    label: 'API (Airtable)',
  },
  {
    href: '/demo/built-in-features/css-in-js',
    label: 'CSS-in-JS',
  },
  {
    href: '/demo/built-in-features/cookies-consent',
    label: 'Cookies consent',
  },
  {
    href: '/demo/built-in-features/analytics',
    label: 'Analytics',
  },
  {
    href: '/demo/built-in-features/icons',
    label: 'Icons',
  },
  {
    href: '/demo/built-in-features/animations',
    label: 'CSS Animations',
  },
  {
    href: '/demo/built-in-features/ui-components',
    label: 'UI components library',
  },
  {
    href: '/demo/built-in-features/docs-site',
    label: 'Docs site',
  },
  {
    href: '/demo/built-in-features/md-as-jsx',
    label: 'Markdown as JSX',
  },
];

/**
 * Sidebar meant to be used on all pages related to the "Built-in features" section
 *
 * Display all BUILT_IN_FEATURES_SIDEBAR_LINKS towards pages related to this section
 *
 * XXX Demo component, not meant to be modified. It's a copy of the core implementation, so the demo keeps working even the core implementation changes.
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
        previousSectionHref={'/demo/native-features/example-with-ssr'}
        nextSectionHref={'/demo/built-in-utilities/i18nLink-component'}
      />
    </div>
  );
};

export default BuiltInFeaturesSidebar;
