import { Amplitude } from '@amplitude/react-amplitude';
import { css } from '@emotion/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import { useTheme } from 'emotion-theming';
import kebabCase from 'lodash.kebabcase';
import map from 'lodash.map';
import {
  NextRouter,
  useRouter,
} from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav as NavStrap,
  Navbar,
  NavItem,
  NavLink,
  Row,
  UncontrolledDropdown,
} from 'reactstrap';
import useI18n, { I18n } from '../../hooks/useI18n';
import customerContext, { CustomerContext } from '../../stores/customerContext';
import { LogEvent } from '../../types/Amplitude';
import { Asset } from '../../types/data/Asset';
import { CustomerTheme } from '../../types/data/CustomerTheme';
import { SidebarLink } from '../../types/SidebarLink';
import {
  isActive,
  resolveI18nHomePage,
} from '../../utils/app/router';
import GraphCMSAsset from '../assets/GraphCMSAsset';
import { BUILT_IN_FEATURES_SIDEBAR_LINKS } from '../doc/BuiltInFeaturesSidebar';
import { BUILT_IN_UTILITIES_SIDEBAR_LINKS } from '../doc/BuiltInUtilitiesSidebar';
import { NATIVE_FEATURES_SIDEBAR_LINKS } from '../doc/NativeFeaturesSidebar';
import I18nLink from '../i18n/I18nLink';
import Tooltip from '../utils/Tooltip';

type Props = {};

const Nav: React.FunctionComponent<Props> = () => {
  const { t } = useTranslation();
  const router: NextRouter = useRouter();
  const theme = useTheme<CustomerTheme>();
  const { locale }: I18n = useI18n();
  const { primaryColor, logo } = theme;

  return (
    <Amplitude>
      {({ logEvent }: { logEvent: LogEvent }): JSX.Element => (
        <Navbar
          id={'nav'}
          color="#F5F5F5"
          light
          css={css`
            background-color: #F5F5F5;
            align-items: center;

            @media (min-width: 992px) {
              margin-left: 80px;
              margin-right: 80px;
            }

            @media (max-width: 991.98px) {
              margin-left: 10px;
              margin-right: 10px;

              li {
                margin: 10px !important;
              }
            }

            @media (max-width: 350px) {
              padding: 0 !important;
            }

            .brand-logo {
              min-width: 175px;
            }

            .navItemsMenu {
              padding:0 10px;

              @media (max-width: 991.98px) {
                a {
                  font-size: 12px;
                  color: rgba(0,0,0,0.30) !important;
                }
              }
            }

            .navbar-nav {
              flex-direction: row;

              li {
                margin: 10px 20px;
                text-align: center;
                justify-content: center;

                a {
                  cursor: pointer;
                  color: #000 !important;
                }
              }
            }

            .nav-link {
              &.active {
                font-weight: bold;
                color: ${primaryColor} !important;
              }
            }

            .dropdown {
              padding-top: 8px;
              padding-bottom: 8px;
              cursor: pointer;

              .dropdown-toggle {
                &.active {
                  color: ${primaryColor};
                }
              }

              .dropdown-menu {
                z-index: 10000;
              }

              .dropdown-item {
                max-height: 30px;
                padding-top: 0;

                .nav-link {
                  padding: 4px;
                }
              }
            }

            .dropdown-header,
            .dropdown-divider {
              cursor: initial;
            }
          `}
        >
          <div className={'brand-logo'}>
            <GraphCMSAsset
              id={'nav-logo-brand'}
              asset={logo as unknown as Asset}
              linkOverride={{ id: 'nav-open-app-link', url: resolveI18nHomePage(locale)?.i18nHref || '/', target: null }} // Force link to redirect to home
              transformationsOverride={{
                height: 100,
              }}
            />
          </div>

          <NavStrap navbar>
            <NavItem>
              <I18nLink
                href={`/`}
                wrapChildrenAsLink={false}
              >
                <NavLink
                  id={'nav-link-home'}
                  active={isActive(router, '')}
                >
                  <FontAwesomeIcon icon={['fas', 'home']} />
                  {t('nav.indexPage.link', 'Accueil')}
                </NavLink>
              </I18nLink>
            </NavItem>

            <NavItem>
              <Tooltip
                overlay={<span>
                  Check out our examples! <br />
                  They explain Next.js native features, alongside NRN built-in features/utilities.
                </span>}
              >
                <UncontrolledDropdown>
                  <DropdownToggle id={'nav-link-examples'} tag={'span'} className={classnames({ active: isActive(router, 'examples') })} caret>
                    <FontAwesomeIcon icon={['fas', 'book-reader']} />
                    {t('nav.examplesPage.link', 'Exemples')}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>Native features</DropdownItem>
                    {
                      map(NATIVE_FEATURES_SIDEBAR_LINKS, (link: SidebarLink) => {
                        const { label, href, params = null } = link;
                        return (
                          <DropdownItem tag={'span'} key={href}>
                            <I18nLink href={href} params={params} wrapChildrenAsLink={false}>
                              <NavLink id={`nav-link-examples-${kebabCase(label)}`} active={router.pathname.replace('/[locale]', '') === href}>
                                {label}
                              </NavLink>
                            </I18nLink>
                          </DropdownItem>
                        );
                      })
                    }
                    <DropdownItem divider />

                    <DropdownItem header>Built-in features</DropdownItem>
                    {
                      map(BUILT_IN_FEATURES_SIDEBAR_LINKS, (link: SidebarLink) => {
                        const { label, href, params = null } = link;
                        return (
                          <DropdownItem tag={'span'} key={href}>
                            <I18nLink href={href} params={params} wrapChildrenAsLink={false}>
                              <NavLink id={`nav-link-examples-${kebabCase(label)}`} active={router.pathname.replace('/[locale]', '') === href}>
                                {label}
                              </NavLink>
                            </I18nLink>
                          </DropdownItem>
                        );
                      })
                    }
                    <DropdownItem divider />

                    <DropdownItem header>Built-in utilities</DropdownItem>
                    {
                      map(BUILT_IN_UTILITIES_SIDEBAR_LINKS, (link: SidebarLink) => {
                        const { label, href, params = null } = link;
                        return (
                          <DropdownItem tag={'span'} key={href}>
                            <I18nLink href={href} params={params} wrapChildrenAsLink={false}>
                              <NavLink id={`nav-link-examples-${kebabCase(label)}`} active={router.pathname.replace('/[locale]', '') === href}>
                                {label}
                              </NavLink>
                            </I18nLink>
                          </DropdownItem>
                        );
                      })
                    }
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Tooltip>
            </NavItem>

            <NavItem>
              <Col className={'navItemsMenu'}>
                <Row className={'justify-content-center'}>
                  <Tooltip
                    overlay={<span>
                      Visit our general NRN documentation site, built with the Github Pages and Jekyll!<br />
                      This docs website explains the NRN concepts, how to get started and much more!
                    </span>}
                  >
                    <NavLink
                      id={'nav-link-github-doc'}
                      href={`https://unlyed.github.io/next-right-now/`}
                      target={'_blank'}
                      rel={'noopener'}
                      onClick={(): void => {
                        logEvent('open-github-doc');
                      }}
                    >
                      <FontAwesomeIcon icon={['fas', 'book']} />
                      {t('nav.githubDocPage.link', 'Documentation')}
                    </NavLink>
                  </Tooltip>
                </Row>
              </Col>
            </NavItem>

            <NavItem>
              <Col className={'navItemsMenu'}>
                <Row className={'justify-content-center'}>
                  <Tooltip
                    overlay={<span>Visit our Github branch for the current preset and navigate through the source code!</span>}
                  >
                    <NavLink
                      id={'nav-link-github'}
                      href={`https://github.com/UnlyEd/next-right-now/tree/${process.env.NEXT_PUBLIC_NRN_PRESET}`}
                      target={'_blank'}
                      rel={'noopener'}
                      onClick={(): void => {
                        logEvent('open-github');
                      }}
                      title={''}
                    >
                      <FontAwesomeIcon icon={['fab', 'github']} />
                      {t('nav.githubPage.link', 'Github branch')}
                    </NavLink>
                  </Tooltip>
                </Row>
              </Col>
            </NavItem>

            <NavItem>
              <Col className={'navItemsMenu'}>
                <Row className={'justify-content-center'}>
                  <Tooltip
                    overlay={<span>
                      Edit this demo using GraphCMS!<br />
                      <br />
                      <b>Email</b>: <code style={{ fontSize: 18 }}>unly-nrn+contributor@unly.org</code><br />
                      <b>Password</b>: <code style={{ fontSize: 18 }}>bbU#Ec2m6FpqU7&</code><br />
                      <br />
                      You can edit anything and play with the various rendering modes (SSG, SSR, etc.), the GraphCMS API is configured to use <code>DRAFT</code> content in priority.<br />
                      This mean that your changes on any published content will be reflected (because changing a published content creates a draft, and that draft is being used).<br />
                      This has been done on purpose, to allow visitors to manipulate the content of the demo and see their changes being reflected immediately.<br />
                      <b>N.B: Please do not change the <code>customer.ref</code> values, as it would break the associated demo, if the <code>ref</code> doesn't match.</b><br />
                    </span>}
                  >
                    <NavLink
                      id={'nav-link-admin-site'}
                      href={`https://app.graphcms.com/b767f8ab435746e2909249461e2f1eb7/master`}
                      target={'_blank'}
                      rel={'noopener'}
                      onClick={(): void => {
                        logEvent('open-admin-site');
                      }}
                    >
                      <FontAwesomeIcon icon={['fas', 'user-cog']} />
                      {t('nav.adminSite.link', 'Go to CMS')}
                    </NavLink>
                  </Tooltip>
                </Row>
              </Col>
            </NavItem>
          </NavStrap>
        </Navbar>
      )}
    </Amplitude>
  );
};

export default Nav;
