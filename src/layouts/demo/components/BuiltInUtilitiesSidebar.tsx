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

export const BUILT_IN_UTILITIES_SIDEBAR_LINKS: SidebarLink[] = [
  {
    href: '/demo/built-in-utilities/i18nLink-component',
    label: 'I18nLink component',
  },
  {
    href: '/demo/built-in-utilities/airtableAsset-component',
    label: 'AirtableAsset component',
  },
  {
    href: '/demo/built-in-utilities/hooks',
    label: 'Hooks',
  },
  {
    href: '/demo/built-in-utilities/hocs',
    label: 'HOCs',
  },
  {
    href: '/demo/built-in-utilities/api',
    label: 'API',
  },
  {
    href: '/demo/built-in-utilities/errors-handling',
    label: 'Errors handling',
  },
  {
    href: '/demo/built-in-utilities/bundle-analysis',
    label: 'Bundle analysis',
  },
  {
    href: '/demo/built-in-utilities/svg-to-react',
    label: 'SVG to React',
  },
  {
    href: '/demo/built-in-utilities/security-audit',
    label: 'Security audit',
  },
  {
    href: '/demo/built-in-utilities/tracking-useless-re-renders',
    label: 'Tracking useless re-renders',
  },
];

/**
 * Sidebar meant to be used on all pages related to the "Built-in utilities" section
 *
 * Display all BUILT_IN_FEATURES_SIDEBAR_LINKS towards pages related to this section
 *
 * XXX Demo component, not meant to be modified. It's a copy of the core implementation, so the demo keeps working even the core implementation changes.
 */
const BuiltInUtilitiesSidebar: React.FunctionComponent<Props> = (props): JSX.Element => {
  const { className } = props;
  const router: NextRouter = useRouter();

  return (
    <div
      className={className}
    >
      <h2>Built-in utilities</h2>

      <Nav
        vertical
      >
        {
          map(BUILT_IN_UTILITIES_SIDEBAR_LINKS, (link: SidebarLink) => {
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
        previousSectionHref={'/demo/built-in-features'}
      />
    </div>
  );
};

export default BuiltInUtilitiesSidebar;
