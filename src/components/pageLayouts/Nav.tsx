/** @jsx jsx */
import { Amplitude } from '@amplitude/react-amplitude';
import { css, jsx } from '@emotion/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NextRouter, useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Col,
  Nav as NavStrap,
  Navbar,
  NavItem,
  NavLink,
  Row,
} from 'reactstrap';
import useI18n, { I18n } from '../../hooks/useI18n';
import customerContext, { CustomerContext } from '../../stores/customerContext';
import { isActive, resolveI18nHomePage } from '../../utils/app/router';
import GraphCMSAsset from '../assets/GraphCMSAsset';
import I18nLink from '../i18n/I18nLink';

type Props = {};

const Nav: React.FunctionComponent<Props> = () => {
  const { t } = useTranslation();
  const router: NextRouter = useRouter();
  const { theme }: CustomerContext = React.useContext(customerContext);
  const { locale }: I18n = useI18n();
  const { primaryColor, logo } = theme;

  return (
    <Amplitude>
      {({ logEvent }): JSX.Element => (
        <Navbar
          id={'nav'}
          color="#F5F5F5"
          light
          css={css`
            background-color: #f5f5f5;
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
              padding: 0 10px;

              @media (max-width: 991.98px) {
                a {
                  font-size: 12px;
                  color: rgba(0, 0, 0, 0.3) !important;
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
          `}
        >
          <div className={'brand-logo'}>
            <GraphCMSAsset
              id={'nav-logo-brand'}
              asset={logo}
              linkOverride={{
                id: 'nav-open-app-link',
                url: resolveI18nHomePage(locale)?.i18nHref || '/',
                target: null,
              }} // Force link to redirect to home
              transformationsOverride={{
                width: 75,
                height: 100,
              }}
            />
          </div>

          <NavStrap navbar>
            <NavItem>
              <I18nLink href={`/`} wrapChildrenAsLink={false}>
                <NavLink id={'nav-link-home'} active={isActive(router, '')}>
                  <FontAwesomeIcon icon={['fas', 'home']} />
                  {t('nav.indexPage.link', 'Accueil')}
                </NavLink>
              </I18nLink>
            </NavItem>

            <NavItem>
              <I18nLink href={`/examples`} wrapChildrenAsLink={false}>
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
              <I18nLink href={`/products`} wrapChildrenAsLink={false}>
                <NavLink
                  id={'nav-link-products'}
                  active={isActive(router, 'products')}
                >
                  <FontAwesomeIcon icon={['fas', 'coffee']} />
                  {t('nav.productsPage.link', 'Produits')}
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
                    title={
                      'Edit dynamic content using GraphCMS and react-admin!'
                    }
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

export default Nav;
