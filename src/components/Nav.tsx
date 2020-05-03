/** @jsx jsx */
import { Amplitude } from '@amplitude/react-amplitude';
import { css, jsx } from '@emotion/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Sentry from '@sentry/node';
import { isBrowser } from '@unly/utils';
import { NextRouter } from 'next/router';
import React from 'react';
import { withTranslation } from 'react-i18next';
import { Col, Nav as NavStrap, Navbar, NavItem, NavLink, Row } from 'reactstrap';
import { compose } from 'recompose';
import { LayoutPropsSSG } from '../types/LayoutProps';
import { getValue } from '../utils/record';
import { isActive, resolveI18nHomePage } from '../utils/router';
import GraphCMSAsset from './GraphCMSAsset';
import I18nLink from './I18nLink';

const fileLabel = 'components/Nav';

const Nav: React.FunctionComponent<Props> = (props: Props) => {
  const {
    customer, router, t, locale,
  } = props;
  const theme = customer.theme;

  Sentry.addBreadcrumb({ // See https://docs.sentry.io/enriching-error-data/breadcrumbs
    category: fileLabel,
    message: `Rendering top nav bar (${isBrowser() ? 'browser' : 'server'})`,
    level: Sentry.Severity.Debug,
  });

  // Resolve service logo
  const serviceLogo = customer?.theme?.logo;

  return (
    <Amplitude>
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
            <GraphCMSAsset
              id={'nav-logo-brand'}
              asset={serviceLogo}
              linkOverride={{ id: 'nav-open-app-link', url: resolveI18nHomePage(locale)?.i18nHref || '/', target: null }} // Force link to redirect to home
              transformationsOverride={{
                width: 75,
                height: 100,
              }}
            />
          </div>

          <NavStrap navbar>
            <NavItem>
              <I18nLink
                locale={locale}
                href={`/`}
                passHref={true}
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
              <I18nLink
                locale={locale}
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
              </I18nLink>
            </NavItem>

            <NavItem>
              <Col className={'navItemsMenu'}>
                <Row className={'justify-content-center'}>
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
                </Row>
              </Col>
            </NavItem>

            <NavItem>
              <Col className={'navItemsMenu'}>
                <Row className={'justify-content-center'}>
                  <NavLink
                    id={'nav-link-github'}
                    href={`https://github.com/UnlyEd/next-right-now/tree/${process.env.NRN_PRESET}`}
                    target={'_blank'}
                    rel={'noopener'}
                    onClick={() => {
                      logEvent('open-github');
                    }}
                    title={'Github branch preset'}
                  >
                    <FontAwesomeIcon icon={['fab', 'github']} />
                    {t('nav.githubPage.link', 'Github branch')}
                  </NavLink>
                </Row>
              </Col>
            </NavItem>

            <NavItem>
              <Col className={'navItemsMenu'}>
                <Row className={'justify-content-center'}>
                  <NavLink
                    id={'nav-link-admin-site'}
                    href={`https://nrn-admin.now.sh`}
                    target={'_blank'}
                    rel={'noopener'}
                    onClick={(): void => {
                      logEvent('open-admin-site');
                    }}
                    title={'Edit dynamic content using GraphCMS and react-admin!'}
                  >
                    <FontAwesomeIcon icon={['fas', 'user-cog']} />
                    {t('nav.adminSite.link', 'Admin site')}
                  </NavLink>
                </Row>
              </Col>
            </NavItem>
          </NavStrap>
        </Navbar>
      )}
    </Amplitude>
  );
};

type Props = {
  t: Function;
  router: NextRouter;
} & LayoutPropsSSG;

export default compose(
  withTranslation(['common']),
)(Nav);
