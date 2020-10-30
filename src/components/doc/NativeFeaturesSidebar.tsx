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

export const NATIVE_FEATURES_SIDEBAR_LINKS: SidebarLink[] = [
  {
    href: '/examples/native-features/example-with-ssr',
    label: 'SSR (getServerSideProps)',
  },
  {
    href: '/examples/native-features/example-with-ssg',
    label: 'SSG',
  },
  {
    href: '/examples/native-features/example-with-ssg-and-fallback/[albumId]',
    label: 'SSG using fallback',
    params: {
      albumId: 1,
    },
  },
  {
    href: '/examples/native-features/example-with-ssg-and-revalidate',
    label: 'SSG using revalidate',
  },
  {
    href: '/examples/native-features/example-optional-catch-all-routes',
    label: 'Catch-all routes',
  },
];

/**
 * Sidebar meant to be used on all pages related to the "Native features" section
 *
 * Display all NATIVE_FEATURES_SIDEBAR_LINKS towards pages related to this section
 *
 * @param props
 */
const NativeFeaturesSidebar: React.FunctionComponent<Props> = (props): JSX.Element => {
  const { className } = props;
  const router: NextRouter = useRouter();

  return (
    <div
      className={className}
    >
      <h2>Native features</h2>

      <Nav
        vertical
      >
        {
          map(NATIVE_FEATURES_SIDEBAR_LINKS, (link: SidebarLink) => {
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
        nextSectionHref={'/examples/built-in-features/hosting'}
      />
    </div>
  );
};

export default NativeFeaturesSidebar;
