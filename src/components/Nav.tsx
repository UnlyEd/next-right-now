/** @jsx jsx */
import { Amplitude } from '@amplitude/react-amplitude';
import { css, jsx } from '@emotion/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Sentry from '@sentry/node';
import { isBrowser } from '@unly/utils';
import classnames from 'classnames';
import Link from 'next/link';
import { NextRouter } from 'next/router';
import React from 'react';
import { withTranslation } from 'react-i18next';
import { Col, Nav as NavStrap, Navbar, NavItem, NavLink, Row } from 'reactstrap';
import { compose } from 'recompose';

import { Customer } from '../types/data/Customer';
import { Theme } from '../types/data/Theme';
import { getValue } from '../utils/record';
import GraphCMSAsset from './GraphCMSAsset';

const fileLabel = 'components/Nav';

const isActive = (router, path): boolean => {
  const currentPaths = router.pathname.split('/');

  return currentPaths[currentPaths.length - 1] === path;
};

const Nav: React.FunctionComponent<Props> = (props: Props) => {
  const {
    customer, theme, router, t,
  } = props;

  Sentry.addBreadcrumb({ // See https://docs.sentry.io/enriching-error-data/breadcrumbs
    category: fileLabel,
    message: `Rendering top nav bar (${isBrowser() ? 'browser' : 'server'})`,
    level: Sentry.Severity.Debug,
  });

  // Resolve service logo
  const serviceLogo = customer?.theme?.logo;

  return (
    <Amplitude
      eventProperties={(inheritedProps): object => ({
        ...inheritedProps,
        page: {
          ...inheritedProps.page,
          name: 'index',
        },
      })}
    >
      {({ logEvent }): JSX.Element => (
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
                color: ${getValue(theme, 'primaryColor')} !important;
              }
            }
          `}
        >
          <div className={'brand-logo'}>
            <Link
              // The Link will only take effect if there is a <a> child
              href={'/'}
            >
              <GraphCMSAsset
                id={'nav-logo-brand'}
                asset={serviceLogo}
                linkOverride={{ id: 'nav-open-app-link', url: '/', target: null }} // Force link to redirect to home
                transformationsOverride={{
                  width: 75,
                  height: 100,
                }}
              />
            </Link>
          </div>

          <NavStrap navbar>
            <NavItem>
              <Link
                href={`/index`}
                as={'/'}
                passHref={true}
              >
                <NavLink
                  id={'nav-link-home'}
                  active={isActive(router, '') || isActive(router, 'index')}
                >
                  <FontAwesomeIcon icon={['fas', 'home']} />
                  {t('nav.indexPage.link', 'Accueil')}
                </NavLink>
              </Link>
            </NavItem>

            <NavItem>
              <Link
                href={`/examples`}
                passHref={true}
              >
                <NavLink
                  id={'nav-link-examples'}
                  active={isActive(router, 'examples')}
                >
                  <FontAwesomeIcon icon={['fas', 'book-reader']} />
                  {t('nav.examplesPage.link', 'Exemples')}
                </NavLink>
              </Link>
            </NavItem>

            <NavItem>
              <a
                href={`https://unlyed.github.io/next-right-now/`}
                target={'_blank'}
                rel={'noopener'}
                onClick={() => {
                  logEvent('open-github-doc');
                }}
              >
                <Col className={'navItemsMenu'}>
                  <Row className={'justify-content-center'}>
                    <NavLink
                      id={'nav-link-github-doc'}
                    >
                      <FontAwesomeIcon icon={['fas', 'book']} />
                      {t('nav.githubDocPage.link', 'Documentation')}
                    </NavLink>
                  </Row>
                </Col>
              </a>
            </NavItem>

            <NavItem>
              <a
                href={`https://github.com/UnlyEd/next-right-now/tree/${process.env.NRN_PRESET}`}
                target={'_blank'}
                rel={'noopener'}
                onClick={() => {
                  logEvent('open-github');
                }}
                title={'Github branch preset'}
              >
                <Col className={'navItemsMenu'}>
                  <Row className={'justify-content-center'}>
                    <NavLink
                      id={'nav-link-github'}
                    >
                      <FontAwesomeIcon icon={['fab', 'github']} />
                      {t('nav.githubPage.link', 'Github branch')}
                    </NavLink>
                  </Row>
                </Col>
              </a>
            </NavItem>

            <NavItem>
              <a
                href={`https://nrn-admin.now.sh`}
                target={'_blank'}
                rel={'noopener'}
                onClick={() => {
                  logEvent('open-admin-site');
                }}
                title={'Edit dynamic content using GraphCMS and react-admin!'}
              >
                <Col className={'navItemsMenu'}>
                  <Row className={'justify-content-center'}>
                    <NavLink
                      id={'nav-link-admin-site'}
                    >
                      <FontAwesomeIcon icon={['fas', 'user-cog']} />
                      {t('nav.adminSite.link', 'Admin site')}
                    </NavLink>
                  </Row>
                </Col>
              </a>
            </NavItem>
          </NavStrap>
        </Navbar>
      )}
    </Amplitude>
  );
};

type Props = {
  customer: Customer;
  theme: Theme;
  t: Function;
  router: NextRouter;
}

export default compose(
  withTranslation(['common']),
)(Nav);
