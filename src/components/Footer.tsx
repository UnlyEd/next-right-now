/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import * as Sentry from '@sentry/node';
import { isBrowser } from '@unly/utils';
import startsWith from 'lodash.startswith';
import { NextRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Col, Row } from 'reactstrap';

import EnglishFlag from '../components/svg/EnglishFlag';
import FrenchFlag from '../components/svg/FrenchFlag';
import cookieContext, { CookieContext } from '../stores/cookieContext';
import { LayoutPropsSSG } from '../types/LayoutProps';
import { LANG_FR } from '../utils/i18n';
import { SIZE_XS } from '../utils/logo';
import { getValue, getValueFallback } from '../utils/record';
import { i18nRedirect } from '../utils/router';
import GraphCMSAsset from './GraphCMSAsset';
import I18nLink from './I18nLink';
import Logo from './Logo';
import Tooltip from './Tooltip';

const fileLabel = 'components/Footer';

const Footer: React.FunctionComponent<Props> = (props: Props) => {
  const {
    customer, locale, lang, router,
  } = props;
  const theme = customer.theme;
  const { t } = useTranslation();
  const { userSession }: CookieContext = React.useContext(cookieContext) || {};
  const logoSizesMultipliers = [
    {
      size: SIZE_XS,
      multiplier: 1, // We wanna keep the logos in the footer big and visible even on small devices, we've got enough space
    },
  ];

  Sentry.addBreadcrumb({ // See https://docs.sentry.io/enriching-error-data/breadcrumbs
    category: fileLabel,
    message: `Rendering footer (${isBrowser() ? 'browser' : 'server'})`,
    level: Sentry.Severity.Debug,
  });

  // Resolve values, handle multiple fallback levels
  const copyrightOwner = getValueFallback([
    { record: customer, key: 'label' },
  ]);
  const currentYear = (new Date()).getFullYear();
  return (

    <div
      id="footer"
      className={'footer align-items-center center'}
      css={{
        background: getValue(theme, 'primaryColor'),
        padding: '20px 50px',
        color: 'white',
        a: {
          color: 'white',
        },
        img: {
          maxWidth: '100%',
        },
      }}
    >
      <Row className={'justify-content-end align-items-end'}>
        <Col md={4} xs={12} className={'text-md-left text-center mt-4'}>
          <GraphCMSAsset
            id={'footer-logo-organisation-brand'}
            asset={getValue(customer, 'theme.logo')}
            linkOverride={{ id: 'link-footer-logo-organisation-brand' }}
            transformationsOverride={{
              width: 150,
              height: 200,
            }}
          />
        </Col>
        <Col md={4} xs={12} className={'mt-4'}>
          <p className={'m-0'}>
            {copyrightOwner} - {currentYear}
            <br />
            {t('footer.terms.text', 'Tous droits réservés')}
          </p>
          <I18nLink
            locale={locale}
            href={`/terms`}
            passHref={true}
          >
            <a>
              <div
                css={{
                  marginTop: '20px',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  color: 'white',
                }}
              >
                {t('footer.terms.link', 'Conditions générales d\'utilisation')}
              </div>
            </a>
          </I18nLink>
          <div
            css={css`
              margin-top: 10px;

              code {
                color: white;
              }
            `}
          >
            <i
              title={'This is only informational, your activity on this website is being tracked for analytics purposes and demonstration on how to perform analytics with Next.js and Amplitude (this uses cookieContext store provider)'}
            >
              Device id (analytics):<br />
              <code>{userSession.deviceId}</code>
            </i>
          </div>
        </Col>
        <Col md={4} xs={12} className={'text-md-right text-center mt-3'}>
          <Button
            onClick={(): void => {
              // XXX Implementation is being kept simple for the sake of simplicity
              //  It doesn't match a real-world use case because there are many possible variations and we can't cover them all
              //  e.g: with country-based locales (fr-FR, en-GB) or without (fr, en)
              const newLocale = startsWith(locale, 'fr') ? 'en' : 'fr';
              i18nRedirect(newLocale, router);
            }}
            css={css`
              background-color: transparent;
              border: none;
              margin-bottom: 20px;
              transition: 0.5s ease-in-out;

              :hover{
                background-color: transparent;
                border: none;
                box-shadow: 0px 2px 30px -2px rgba(0,0,0,0.66);
                cursor: pointer;
              }

              .small-text {
                font-size: 12px;
              }
            `}
          >
            {lang === LANG_FR ? (
              <Tooltip
                overlay={<span><EnglishFlag />English</span>}
              >
                <span
                  className={'small-text'}
                >
                  <FrenchFlag />
                  FR
                </span>
              </Tooltip>
            ) : (
              <Tooltip
                overlay={<span><FrenchFlag />Français</span>}
              >
                <span
                  className={'small-text'}
                >
                  <EnglishFlag />
                  EN
                </span>
              </Tooltip>
            )}
          </Button>
          <br />
          <Logo
            id={'footer-logo-unly-brand'}
            logo={{
              url: '/static/images/LOGO_Powered_by_UNLY_monochrome_WHITE.svg',
              link: {
                url: 'https://unly.org/',
                target: '_blank',
              },
            }}
            width={100}
            height={50}
            sizesMultipliers={logoSizesMultipliers}
          />
        </Col>
      </Row>
    </div>
  );
};

type Props = {
  router: NextRouter;
} & LayoutPropsSSG;

export default Footer;
