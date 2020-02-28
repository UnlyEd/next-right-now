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
          css={css`// TODO Copied from proprietary project, change as you will, should be cleaned!
        background-color: #F5F5F5;
        align-items: center;

        @media (min-width: 992px) {
              margin-left: 80px;
              margin-right: 80px;
            }

        @media (max-width: 991.98px) {
            margin-left: 10px;
            margin-right: 10px;
          li{
            margin: 10px !important;
          }
        }

        @media (max-width: 350px) {
           padding: 0 !important;
        }

        .brand-logos{
          min-width: 175px;
        }

        .brand-logos-separator {
          margin-left: 10px;
          margin-right: 10px;

          ::before {
            content: '';
            position: absolute;
            top: 50%;
            border-bottom: 40px solid lightgrey;
            border-left: 1px solid lightgrey;
            transform: translateY(-50%);
          }
        }

        .navItemsMenu{
          padding:0 10px;

          :hover{
            @media (max-width: 991.98px) {
              .navItemsLogo{
                svg{
                  color: ${getValue(theme, 'primaryColor')};
                }
              }

              a {
                color: ${getValue(theme, 'primaryColor')} !important;
              }
            }
          }

          .navItemsLogo{
            display: none;
          }

          @media (max-width: 991.98px) {
            .navItemsLogo{
              display: flex;

              svg{
                color: rgba(0,0,0,0.30);
                width: 25px;
                height: 25px;
              }
            }
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

        .nav-link,
        .navItemsLogo svg {
          &.active {
            font-weight: bold;
            color: ${getValue(theme, 'primaryColor')} !important;
          }
        }
      `}
        >
          <div className={'brand-logos'}>
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
              >
                <Col className={'navItemsMenu'}>
                  <Row className={'justify-content-center navItemsLogo'}>
                    <i className={classnames('fas fa-comments', { active: isActive(router, 'index') })} />
                  </Row>
                  <Row className={'justify-content-center'}>
                    <NavLink
                      id={'nav-link-home'}
                      active={isActive(router, '') || isActive(router, 'index')}
                    >
                      {t('nav.indexPage.link', 'Accueil')}
                    </NavLink>
                  </Row>
                </Col>
              </Link>
            </NavItem>

            <NavItem>
              <Link
                href={`/examples`}
              >
                <Col className={'navItemsMenu'}>
                  <Row className={'justify-content-center navItemsLogo'}>
                    <i className={classnames('fas fa-comments', { active: isActive(router, 'examples') })} />
                  </Row>
                  <Row className={'justify-content-center'}>
                    <NavLink
                      id={'nav-link-examples'}
                      active={isActive(router, 'examples')}
                    >
                      {t('nav.examplesPage.link', 'Exemples')}
                    </NavLink>
                  </Row>
                </Col>
              </Link>
            </NavItem>

            <NavItem>
              <a
                href={`https://github.com/UnlyEd/next-right-now`}
                target={'_blank'}
                rel={'noopener'}
                onClick={() => {
                  logEvent('open-github');
                }}
              >
                <Col className={'navItemsMenu'}>
                  <Row className={'justify-content-center navItemsLogo'}>
                    <i className={classnames('fas fa-balance-scale')} />
                  </Row>
                  <Row className={'justify-content-center'}>
                    <NavLink
                      id={'nav-link-github'}
                    >
                      <FontAwesomeIcon icon={['fab', 'github']} />
                      {t('nav.githubPage.link', 'Github')}
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
